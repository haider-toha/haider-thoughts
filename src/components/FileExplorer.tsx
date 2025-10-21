import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Folder, FolderOpen, File } from 'lucide-react';
import { useFileSystem, FileNode } from '@/contexts/FileSystemContext';
import { useCardContext } from '@/contexts/CardContext';

interface FileTreeNodeProps {
  node: FileNode;
  level: number;
  onFileClick: (node: FileNode) => void;
  onDirectoryClick: (node: FileNode) => void;
  currentPath: string;
  selectedPath: string | null;
}

function FileTreeNode({ 
  node, 
  level, 
  onFileClick, 
  onDirectoryClick, 
  currentPath, 
  selectedPath 
}: FileTreeNodeProps) {
  const [isExpanded, setIsExpanded] = useState(level === 0 || node.path === '/home/haider');

  const handleClick = () => {
    if (node.type === 'directory') {
      setIsExpanded(!isExpanded);
      onDirectoryClick(node);
    } else {
      onFileClick(node);
    }
  };

  const isCurrentDirectory = currentPath === node.path;
  const isSelected = selectedPath === node.path;

  return (
    <div className="select-none">
      <div
        className={`flex items-center gap-1 py-1 px-2 cursor-pointer hover:bg-gray-700/50 rounded ${
          isCurrentDirectory ? 'bg-blue-600/30 border-l-2 border-blue-400' : ''
        } ${isSelected ? 'bg-gray-600/50' : ''}`}
        style={{ paddingLeft: `${level * 16 + 8}px` }}
        onClick={handleClick}
      >
        {node.type === 'directory' && (
          <div className="flex items-center">
            {isExpanded ? (
              <ChevronDown size={12} className="text-gray-400" />
            ) : (
              <ChevronRight size={12} className="text-gray-400" />
            )}
            {isExpanded ? (
              <FolderOpen size={14} className="text-blue-400 ml-1" />
            ) : (
              <Folder size={14} className="text-blue-400 ml-1" />
            )}
          </div>
        )}
        
        {node.type === 'file' && (
          <File size={14} className="text-gray-300 ml-4" />
        )}
        
        <span 
          className={`text-sm ml-2 ${
            node.type === 'directory' ? 'text-blue-300' : 'text-gray-200'
          } ${isCurrentDirectory ? 'font-semibold' : ''}`}
        >
          {node.name}
        </span>
        
        {node.cardId && (
          <div className="w-2 h-2 bg-green-400 rounded-full ml-auto opacity-60"></div>
        )}
      </div>
      
      {node.type === 'directory' && isExpanded && node.children && (
        <div>
          {node.children.map((child) => (
            <FileTreeNode
              key={child.path}
              node={child}
              level={level + 1}
              onFileClick={onFileClick}
              onDirectoryClick={onDirectoryClick}
              currentPath={currentPath}
              selectedPath={selectedPath}
            />
          ))}
        </div>
      )}
    </div>
  );
}

interface FileExplorerProps {
  onFileOpen: (cardId: string) => void;
}

export function FileExplorer({ onFileOpen }: FileExplorerProps) {
  const { state, navigateTo, selectFile } = useFileSystem();
  const { expandCard } = useCardContext();
  const [selectedPath, setSelectedPath] = useState<string | null>(null);

  const handleFileClick = (node: FileNode) => {
    setSelectedPath(node.path);
    selectFile(node.path);
    
    if (node.cardId) {
      expandCard(node.cardId);
      onFileOpen(node.cardId);
    }
  };

  const handleDirectoryClick = (node: FileNode) => {
    navigateTo(node.path);
    setSelectedPath(node.path);
  };

  return (
    <div className="h-full bg-gray-800 border-l border-gray-700 flex flex-col">
      {/* Explorer Header */}
      <div className="bg-gray-750 px-4 py-3 border-b border-gray-700">
        <h2 className="text-gray-200 font-mono text-sm font-semibold">
          📁 File Explorer
        </h2>
        <p className="text-gray-400 text-xs mt-1">
          Click folders to navigate
        </p>
      </div>

      {/* File Tree */}
      <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800 p-2">
        <FileTreeNode
          node={state.fileTree}
          level={0}
          onFileClick={handleFileClick}
          onDirectoryClick={handleDirectoryClick}
          currentPath={state.currentPath}
          selectedPath={selectedPath}
        />
      </div>

      {/* Explorer Footer */}
      <div className="bg-gray-750 px-4 py-2 border-t border-gray-700">
        <div className="text-xs text-gray-400 font-mono">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            <span>Linked to cards</span>
          </div>
          <div className="truncate">
            Current: {state.currentPath}
          </div>
        </div>
      </div>
    </div>
  );
}
