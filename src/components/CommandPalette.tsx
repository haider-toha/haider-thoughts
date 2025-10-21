import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Terminal, User, Briefcase, Code, FileText, Layout, RotateCcw, Eye, EyeOff, HelpCircle } from 'lucide-react';

interface Command {
  id: string;
  label: string;
  description: string;
  icon: React.ComponentType<any>;
  keywords: string[];
  action: () => void;
}

interface CommandPaletteProps {
  isOpen?: boolean;
  onClose?: () => void;
  onExecuteCommand: (commandId: string) => void;
  embedded?: boolean;
}

export function CommandPalette({ isOpen = true, onClose, onExecuteCommand, embedded = false }: CommandPaletteProps) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Available commands
  const commands: Command[] = [
    {
      id: 'run-me',
      label: 'haider run me',
      description: 'Open About section',
      icon: User,
      keywords: ['haider', 'run', 'me', 'about', 'profile'],
      action: () => onExecuteCommand('expand-about')
    },
    {
      id: 'run-experience',
      label: 'haider run experience',
      description: 'Open Experience section',
      icon: Briefcase,
      keywords: ['haider', 'run', 'experience', 'work', 'career'],
      action: () => onExecuteCommand('expand-experience')
    },
    {
      id: 'run-projects',
      label: 'haider run projects',
      description: 'Open Projects section',
      icon: Code,
      keywords: ['haider', 'run', 'projects', 'whatido', 'work'],
      action: () => onExecuteCommand('expand-whatIDo')
    },
    {
      id: 'run-blog',
      label: 'haider run blog',
      description: 'Open Blog section',
      icon: FileText,
      keywords: ['haider', 'run', 'blog', 'posts', 'writing'],
      action: () => onExecuteCommand('expand-blog')
    },
    {
      id: 'help',
      label: 'haider --help',
      description: 'Show available commands',
      icon: HelpCircle,
      keywords: ['haider', 'help', 'commands', 'list'],
      action: () => onExecuteCommand('show-help')
    },
    {
      id: 'joke',
      label: 'haider run joke',
      description: 'Get a random dad joke',
      icon: Terminal,
      keywords: ['haider', 'tell', 'joke', 'funny', 'humor', 'dad'],
      action: () => onExecuteCommand('tell-joke')
    }
  ];

  // Filter commands based on query
  const filteredCommands = commands.filter(command => {
    if (!query) return true;
    
    const searchTerms = query.toLowerCase().split(' ');
    return searchTerms.every(term => 
      command.keywords.some(keyword => keyword.includes(term)) ||
      command.label.toLowerCase().includes(term) ||
      command.description.toLowerCase().includes(term)
    );
  });

  // Reset selected index when filtered commands change
  useEffect(() => {
    setSelectedIndex(0);
  }, [filteredCommands.length, query]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
      setQuery('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setSelectedIndex(prev => (prev + 1) % filteredCommands.length);
          break;
        case 'ArrowUp':
          e.preventDefault();
          setSelectedIndex(prev => prev === 0 ? filteredCommands.length - 1 : prev - 1);
          break;
        case 'Enter':
          e.preventDefault();
          if (filteredCommands[selectedIndex]) {
            filteredCommands[selectedIndex].action();
            if (!embedded && onClose) {
              onClose();
            }
          }
          break;
        case 'Escape':
          if (!embedded && onClose) {
            onClose();
          }
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, selectedIndex, filteredCommands, onClose, embedded]);

  if (!embedded && !isOpen) return null;

  const cardContent = (
    <Card className="bg-card border shadow-2xl w-full max-w-2xl">
            {/* Header with search input */}
            <div className="flex items-center gap-3 p-4 border-b">
              <Search size={20} className="text-muted-foreground" />
              <Input
                ref={inputRef}
                placeholder="Type a command... (try 'haider run me')"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="border-none bg-transparent text-lg placeholder:text-muted-foreground focus-visible:ring-0"
              />
              <Badge variant="secondary" className="text-xs">
                <Terminal size={12} className="mr-1" />
                ESC
              </Badge>
            </div>

            {/* Command results */}
            <div className="max-h-96 overflow-y-auto">
              {filteredCommands.length === 0 ? (
                <div className="p-8 text-center text-muted-foreground">
                  <Terminal size={32} className="mx-auto mb-2 opacity-50" />
                  <p>No commands found</p>
                  <p className="text-sm">Try typing "haider run me" or "haider --help"</p>
                </div>
              ) : (
                <div className="p-2">
                  {filteredCommands.map((command, index) => {
                    const IconComponent = command.icon;
                    return (
                      <motion.button
                        key={command.id}
                        className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-colors ${
                          index === selectedIndex
                            ? 'bg-accent text-accent-foreground'
                            : 'hover:bg-accent/50'
                        }`}
                        onClick={() => {
                          command.action();
                          if (!embedded && onClose) {
                            onClose();
                          }
                        }}
                        onMouseEnter={() => setSelectedIndex(index)}
                      >
                        <IconComponent size={18} className="text-muted-foreground" />
                        <div className="flex-1 min-w-0">
                          <div className="font-mono text-sm font-medium">
                            {command.label}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {command.description}
                          </div>
                        </div>
                        {index === selectedIndex && (
                          <Badge variant="secondary" className="text-xs">
                            ↵
                          </Badge>
                        )}
                      </motion.button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between p-3 border-t bg-muted/20 text-xs text-muted-foreground">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1">
                  <Badge variant="outline" className="text-xs">↑↓</Badge>
                  Navigate
                </span>
                <span className="flex items-center gap-1">
                  <Badge variant="outline" className="text-xs">↵</Badge>
                  Execute
                </span>
              </div>
            </div>
          </Card>
  );

  if (embedded) {
    return cardContent;
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center pt-20"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: -20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: -20 }}
          className="w-full max-w-2xl mx-4"
          onClick={e => e.stopPropagation()}
        >
          {cardContent}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
