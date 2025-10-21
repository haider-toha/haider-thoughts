import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useFileSystem } from '@/contexts/FileSystemContext';
import { useCardContext } from '@/contexts/CardContext';

interface TerminalProps {
  onFileOpen: (cardId: string) => void;
}

export function Terminal({ onFileOpen }: TerminalProps) {
  const { 
    state, 
    navigateTo, 
    addToHistory, 
    setInput, 
    clearTerminal, 
    getCurrentDirectory, 
    getNodeChildren, 
    findNodeByPath 
  } = useFileSystem();
  
  const { expandCard } = useCardContext();
  const [input, setLocalInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  // Auto-focus terminal input
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  // Auto-scroll to bottom when history updates
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [state.terminalHistory]);

  // Command execution logic
  const executeCommand = useCallback((command: string) => {
    const trimmedCommand = command.trim();
    const [cmd, ...args] = trimmedCommand.split(' ');
    
    // Add command to history
    addToHistory(`haider@terminal:${state.currentPath}$ ${command}`);

    switch (cmd.toLowerCase()) {
      case 'ls': {
        const currentDir = getCurrentDirectory();
        if (!currentDir || !currentDir.children) {
          addToHistory('No items found');
          return;
        }

        const items = currentDir.children.map(child => {
          const icon = child.type === 'directory' ? '📁' : '📄';
          const color = child.type === 'directory' ? 'text-blue-400' : 'text-green-400';
          return `<span class="${color}">${icon} ${child.name}</span>`;
        }).join('  ');

        addToHistory(items || 'Empty directory');
        break;
      }

      case 'cd': {
        const targetPath = args[0];
        if (!targetPath) {
          addToHistory('cd: missing directory argument');
          return;
        }

        let newPath: string;
        if (targetPath === '..') {
          // Go up one directory
          const pathParts = state.currentPath.split('/').filter(p => p);
          if (pathParts.length > 2) { // Don't go above /home/haider
            pathParts.pop();
            newPath = '/' + pathParts.join('/');
          } else {
            newPath = '/home/haider';
          }
        } else if (targetPath === '~' || targetPath === '/') {
          newPath = '/home/haider';
        } else if (targetPath.startsWith('/')) {
          newPath = targetPath;
        } else {
          // Relative path
          newPath = `${state.currentPath}/${targetPath}`.replace(/\/+/g, '/');
        }

        // Check if directory exists
        const targetNode = findNodeByPath(newPath);
        if (!targetNode) {
          addToHistory(`cd: ${targetPath}: No such file or directory`);
          return;
        }

        if (targetNode.type !== 'directory') {
          addToHistory(`cd: ${targetPath}: Not a directory`);
          return;
        }

        navigateTo(newPath);
        addToHistory(`Changed directory to ${newPath}`);
        break;
      }

      case 'cat': {
        const fileName = args[0];
        if (!fileName) {
          addToHistory('cat: missing file argument');
          return;
        }

        let filePath: string;
        if (fileName.startsWith('/')) {
          filePath = fileName;
        } else {
          filePath = `${state.currentPath}/${fileName}`.replace(/\/+/g, '/');
        }

        const fileNode = findNodeByPath(filePath);
        if (!fileNode) {
          addToHistory(`cat: ${fileName}: No such file or directory`);
          return;
        }

        if (fileNode.type === 'directory') {
          addToHistory(`cat: ${fileName}: Is a directory`);
          return;
        }

        // Display file content and open associated card
        addToHistory(`--- ${fileNode.name} ---`);
        addToHistory(fileNode.content || 'Empty file');
        addToHistory('');

        // Open associated card if it exists
        if (fileNode.cardId) {
          onFileOpen(fileNode.cardId);
        }
        break;
      }

      case 'pwd': {
        addToHistory(state.currentPath);
        break;
      }

      case 'tree': {
        const renderTree = (node: any, prefix = '', isLast = true) => {
          const connector = isLast ? '└── ' : '├── ';
          const icon = node.type === 'directory' ? '📁' : '📄';
          let result = `${prefix}${connector}${icon} ${node.name}\n`;
          
          if (node.children) {
            const children = node.children;
            children.forEach((child: any, index: number) => {
              const isLastChild = index === children.length - 1;
              const newPrefix = prefix + (isLast ? '    ' : '│   ');
              result += renderTree(child, newPrefix, isLastChild);
            });
          }
          
          return result;
        };

        const currentDir = getCurrentDirectory();
        if (currentDir) {
          const treeOutput = renderTree(currentDir).trim();
          addToHistory(treeOutput);
        }
        break;
      }

      case 'open': {
        const fileName = args[0];
        if (!fileName) {
          addToHistory('open: missing file argument');
          return;
        }

        let filePath: string;
        if (fileName.startsWith('/')) {
          filePath = fileName;
        } else {
          filePath = `${state.currentPath}/${fileName}`.replace(/\/+/g, '/');
        }

        const fileNode = findNodeByPath(filePath);
        if (!fileNode) {
          addToHistory(`open: ${fileName}: No such file or directory`);
          return;
        }

        if (fileNode.type === 'directory') {
          addToHistory(`open: ${fileName}: Is a directory, use 'cd' instead`);
          return;
        }

        addToHistory(`Opening ${fileNode.name}...`);
        
        // Open associated card
        if (fileNode.cardId) {
          expandCard(fileNode.cardId);
          onFileOpen(fileNode.cardId);
        }
        break;
      }

      case 'clear':
        clearTerminal();
        break;

      case 'help':
        addToHistory('Available commands:');
        addToHistory('  ls              - List files and directories');
        addToHistory('  cd <dir>        - Change directory');
        addToHistory('  cat <file>      - Display file contents');
        addToHistory('  open <file>     - Open file in card view');
        addToHistory('  pwd             - Print working directory');
        addToHistory('  tree            - Show directory tree');
        addToHistory('  clear           - Clear terminal');
        addToHistory('  help            - Show this help message');
        addToHistory('');
        break;

      case '':
        // Empty command, just add prompt
        break;

      default:
        addToHistory(`bash: ${cmd}: command not found`);
        addToHistory('Type "help" for available commands');
        break;
    }

    addToHistory(''); // Add empty line after output
  }, [
    state.currentPath, 
    addToHistory, 
    getCurrentDirectory, 
    getNodeChildren, 
    findNodeByPath, 
    navigateTo, 
    onFileOpen,
    expandCard
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    executeCommand(input);
    setLocalInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      // TODO: Implement tab completion
    }
  };

  // Get current directory name for prompt
  const getCurrentDirName = () => {
    const parts = state.currentPath.split('/').filter(p => p);
    return parts[parts.length - 1] || 'haider';
  };

  return (
    <div className="h-full bg-gray-900 text-green-400 font-mono text-sm flex flex-col">
      {/* Terminal Header */}
      <div className="bg-gray-800 px-4 py-2 border-b border-gray-700">
        <div className="flex items-center gap-2">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <span className="text-gray-300 ml-4">haider@terminal: {getCurrentDirName()}</span>
        </div>
      </div>

      {/* Terminal Output */}
      <div 
        ref={terminalRef}
        className="flex-1 p-4 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800"
      >
        {state.terminalHistory.map((line, index) => (
          <div 
            key={index} 
            className="mb-1"
            dangerouslySetInnerHTML={{ __html: line || '&nbsp;' }}
          />
        ))}
        
        {/* Current Prompt */}
        <form onSubmit={handleSubmit} className="flex items-center mt-2">
          <span className="text-blue-400 mr-2">
            haider@terminal:<span className="text-yellow-400">{state.currentPath}</span>$
          </span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setLocalInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent outline-none text-green-400 caret-green-400"
            autoComplete="off"
            autoFocus
          />
        </form>
      </div>
    </div>
  );
}
