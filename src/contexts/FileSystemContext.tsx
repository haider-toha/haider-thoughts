import React, { createContext, useContext, useReducer, useCallback } from 'react';

export interface FileNode {
  name: string;
  type: 'file' | 'directory';
  path: string;
  content?: string;
  children?: FileNode[];
  cardId?: string; // Link to card for content display
}

interface FileSystemState {
  currentPath: string;
  selectedFile: string | null;
  openFiles: string[];
  fileTree: FileNode;
  terminalHistory: string[];
  currentInput: string;
}

type FileSystemAction =
  | { type: 'NAVIGATE_TO'; path: string }
  | { type: 'SELECT_FILE'; path: string }
  | { type: 'OPEN_FILE'; path: string }
  | { type: 'CLOSE_FILE'; path: string }
  | { type: 'ADD_TO_HISTORY'; command: string }
  | { type: 'SET_INPUT'; input: string }
  | { type: 'CLEAR_TERMINAL' };

// Define the file system structure
const createFileTree = (): FileNode => ({
  name: 'haider',
  type: 'directory',
  path: '/home/haider',
  children: [
    {
      name: 'about',
      type: 'directory',
      path: '/home/haider/about',
      children: [
        {
          name: 'README.md',
          type: 'file',
          path: '/home/haider/about/README.md',
          cardId: 'about',
          content: 'Personal information and bio'
        },
        {
          name: 'bio.txt',
          type: 'file',
          path: '/home/haider/about/bio.txt',
          cardId: 'about',
          content: 'Detailed biography'
        }
      ]
    },
    {
      name: 'experience',
      type: 'directory',
      path: '/home/haider/experience',
      children: [
        {
          name: 'jobs.json',
          type: 'file',
          path: '/home/haider/experience/jobs.json',
          cardId: 'experience',
          content: 'Work experience and career history'
        },
        {
          name: 'skills.md',
          type: 'file',
          path: '/home/haider/experience/skills.md',
          cardId: 'experience',
          content: 'Technical skills and expertise'
        }
      ]
    },
    {
      name: 'projects',
      type: 'directory',
      path: '/home/haider/projects',
      children: [
        {
          name: 'portfolio',
          type: 'directory',
          path: '/home/haider/projects/portfolio',
          children: [
            {
              name: 'index.html',
              type: 'file',
              path: '/home/haider/projects/portfolio/index.html',
              cardId: 'whatIDo',
              content: 'Portfolio website and projects showcase'
            }
          ]
        },
        {
          name: 'README.md',
          type: 'file',
          path: '/home/haider/projects/README.md',
          cardId: 'whatIDo',
          content: 'Overview of all projects and work'
        }
      ]
    },
    {
      name: 'blog',
      type: 'directory',
      path: '/home/haider/blog',
      children: [
        {
          name: 'posts',
          type: 'directory',
          path: '/home/haider/blog/posts',
          children: [
            {
              name: 'latest.md',
              type: 'file',
              path: '/home/haider/blog/posts/latest.md',
              cardId: 'blog',
              content: 'Latest blog posts and articles'
            }
          ]
        },
        {
          name: 'archive',
          type: 'directory',
          path: '/home/haider/blog/archive',
          children: []
        }
      ]
    }
  ]
});

const initialState: FileSystemState = {
  currentPath: '/home/haider',
  selectedFile: null,
  openFiles: [],
  fileTree: createFileTree(),
  terminalHistory: [
    'Welcome to Haider\'s Terminal Interface',
    'Type "help" for available commands, or "ls" to see files',
    ''
  ],
  currentInput: ''
};

function fileSystemReducer(state: FileSystemState, action: FileSystemAction): FileSystemState {
  switch (action.type) {
    case 'NAVIGATE_TO':
      return { ...state, currentPath: action.path };
    
    case 'SELECT_FILE':
      return { ...state, selectedFile: action.path };
    
    case 'OPEN_FILE':
      return { 
        ...state, 
        openFiles: [...state.openFiles.filter(f => f !== action.path), action.path],
        selectedFile: action.path
      };
    
    case 'CLOSE_FILE':
      return { 
        ...state, 
        openFiles: state.openFiles.filter(f => f !== action.path),
        selectedFile: state.selectedFile === action.path ? null : state.selectedFile
      };
    
    case 'ADD_TO_HISTORY':
      return { 
        ...state, 
        terminalHistory: [...state.terminalHistory, action.command]
      };
    
    case 'SET_INPUT':
      return { ...state, currentInput: action.input };
    
    case 'CLEAR_TERMINAL':
      return { 
        ...state, 
        terminalHistory: ['Terminal cleared', '']
      };
    
    default:
      return state;
  }
}

interface FileSystemContextValue {
  state: FileSystemState;
  navigateTo: (path: string) => void;
  selectFile: (path: string) => void;
  openFile: (path: string) => void;
  closeFile: (path: string) => void;
  addToHistory: (command: string) => void;
  setInput: (input: string) => void;
  clearTerminal: () => void;
  findNodeByPath: (path: string) => FileNode | null;
  getCurrentDirectory: () => FileNode | null;
  getNodeChildren: (path: string) => FileNode[];
}

const FileSystemContext = createContext<FileSystemContextValue | undefined>(undefined);

export function FileSystemProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(fileSystemReducer, initialState);

  const navigateTo = useCallback((path: string) => {
    dispatch({ type: 'NAVIGATE_TO', path });
  }, []);

  const selectFile = useCallback((path: string) => {
    dispatch({ type: 'SELECT_FILE', path });
  }, []);

  const openFile = useCallback((path: string) => {
    dispatch({ type: 'OPEN_FILE', path });
  }, []);

  const closeFile = useCallback((path: string) => {
    dispatch({ type: 'CLOSE_FILE', path });
  }, []);

  const addToHistory = useCallback((command: string) => {
    dispatch({ type: 'ADD_TO_HISTORY', command });
  }, []);

  const setInput = useCallback((input: string) => {
    dispatch({ type: 'SET_INPUT', input });
  }, []);

  const clearTerminal = useCallback(() => {
    dispatch({ type: 'CLEAR_TERMINAL' });
  }, []);

  // Helper function to find a node by path
  const findNodeByPath = useCallback((path: string): FileNode | null => {
    const findNode = (node: FileNode, targetPath: string): FileNode | null => {
      if (node.path === targetPath) return node;
      if (node.children) {
        for (const child of node.children) {
          const found = findNode(child, targetPath);
          if (found) return found;
        }
      }
      return null;
    };
    return findNode(state.fileTree, path);
  }, [state.fileTree]);

  // Get current directory node
  const getCurrentDirectory = useCallback((): FileNode | null => {
    return findNodeByPath(state.currentPath);
  }, [findNodeByPath, state.currentPath]);

  // Get children of a directory
  const getNodeChildren = useCallback((path: string): FileNode[] => {
    const node = findNodeByPath(path);
    return node?.children || [];
  }, [findNodeByPath]);

  const value: FileSystemContextValue = {
    state,
    navigateTo,
    selectFile,
    openFile,
    closeFile,
    addToHistory,
    setInput,
    clearTerminal,
    findNodeByPath,
    getCurrentDirectory,
    getNodeChildren
  };

  return (
    <FileSystemContext.Provider value={value}>
      {children}
    </FileSystemContext.Provider>
  );
}

export function useFileSystem() {
  const context = useContext(FileSystemContext);
  if (context === undefined) {
    throw new Error('useFileSystem must be used within a FileSystemProvider');
  }
  return context;
}
