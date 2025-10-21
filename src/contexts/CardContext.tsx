import React, { createContext, useContext, useReducer, useEffect, useCallback } from 'react';
import { CardState, saveCardStates, loadCardStates, defaultPositions, autoArrangeCards, findNonOverlappingPosition, getNextZIndex, snapToGrid } from '@/utils/cardPositioning';

interface CardContextState {
  cards: CardState[];
  focusedCard: string | null;
  snapToGridEnabled: boolean;
  containerSize: { width: number; height: number };
}

type CardAction =
  | { type: 'INITIALIZE_CARDS' }
  | { type: 'TOGGLE_CARD'; cardId: string }
  | { type: 'UPDATE_POSITION'; cardId: string; position: { x: number; y: number } }
  | { type: 'EXPAND_CARD'; cardId: string }
  | { type: 'MINIMIZE_CARD'; cardId: string }
  | { type: 'BRING_TO_FRONT'; cardId: string }
  | { type: 'AUTO_ARRANGE' }
  | { type: 'TOGGLE_SNAP_TO_GRID' }
  | { type: 'SET_CONTAINER_SIZE'; size: { width: number; height: number } }
  | { type: 'SET_FOCUSED_CARD'; cardId: string | null };

const initialState: CardContextState = {
  cards: [
    { id: 'about', position: defaultPositions.about, isVisible: true, isMinimized: false, isExpanded: false },
    { id: 'experience', position: defaultPositions.experience, isVisible: true, isMinimized: false, isExpanded: false },
    { id: 'whatIDo', position: defaultPositions.whatIDo, isVisible: true, isMinimized: false, isExpanded: false },
    { id: 'blog', position: defaultPositions.blog, isVisible: true, isMinimized: false, isExpanded: false },
  ],
  focusedCard: null,
  snapToGridEnabled: false,
  containerSize: { width: 1200, height: 800 },
};

function cardReducer(state: CardContextState, action: CardAction): CardContextState {
  switch (action.type) {
    case 'INITIALIZE_CARDS': {
      // Allow re-initializing with default positions
      return { ...state, cards: initialState.cards };
    }

    case 'TOGGLE_CARD': {
      const cards = state.cards.map(card => {
        if (card.id === action.cardId) {
          const newVisibility = !card.isVisible;
          
          // If showing the card, find a non-overlapping position
          if (newVisibility && !card.isVisible) {
            const position = findNonOverlappingPosition(
              defaultPositions[action.cardId] || card.position,
              state.cards.filter(c => c.id !== action.cardId),
              state.containerSize.width,
              state.containerSize.height
            );
            
            return {
              ...card,
              isVisible: newVisibility,
              position: { ...position, zIndex: getNextZIndex(state.cards) }
            };
          }
          
          return { ...card, isVisible: newVisibility };
        }
        return card;
      });
      
      return { ...state, cards };
    }

    case 'UPDATE_POSITION': {
      const cards = state.cards.map(card =>
        card.id === action.cardId
          ? {
              ...card,
              position: {
                ...card.position,
                x: action.position.x,
                y: action.position.y,
              }
            }
          : card
      );
      
      return { ...state, cards };
    }

    case 'EXPAND_CARD': {
      const cards = state.cards.map(card =>
        card.id === action.cardId
          ? { ...card, isExpanded: !card.isExpanded }
          : { ...card, isExpanded: false }
      );
      
      return {
        ...state,
        cards,
        focusedCard: cards.find(c => c.isExpanded)?.id || null
      };
    }

    case 'MINIMIZE_CARD': {
      const cards = state.cards.map(card =>
        card.id === action.cardId
          ? { ...card, isMinimized: !card.isMinimized, isExpanded: false }
          : card
      );
      
      return { ...state, cards };
    }

    case 'BRING_TO_FRONT': {
      const nextZ = getNextZIndex(state.cards);
      const cards = state.cards.map(card =>
        card.id === action.cardId
          ? { ...card, position: { ...card.position, zIndex: nextZ } }
          : card
      );
      
      return { ...state, cards };
    }

    case 'AUTO_ARRANGE': {
      const arrangedCards = autoArrangeCards(state.cards, state.containerSize.width, state.containerSize.height);
      return { ...state, cards: arrangedCards };
    }

    case 'TOGGLE_SNAP_TO_GRID': {
      const newSnapToGrid = !state.snapToGridEnabled;
      let cards = state.cards;
      
      // If enabling snap to grid, snap all cards
      if (newSnapToGrid) {
        cards = state.cards.map(card => ({
          ...card,
          position: snapToGrid(card.position)
        }));
      }
      
      return { ...state, snapToGridEnabled: newSnapToGrid, cards };
    }

    case 'SET_CONTAINER_SIZE': {
      return { ...state, containerSize: action.size };
    }

    case 'SET_FOCUSED_CARD': {
      return { ...state, focusedCard: action.cardId };
    }

    default:
      return state;
  }
}

interface CardContextValue {
  state: CardContextState;
  dispatch: React.Dispatch<CardAction>;
  toggleCard: (cardId: string) => void;
  updatePosition: (cardId: string, position: { x: number; y: number }) => void;
  expandCard: (cardId: string) => void;
  minimizeCard: (cardId: string) => void;
  bringToFront: (cardId: string) => void;
  autoArrange: () => void;
  toggleSnapToGrid: () => void;
  setContainerSize: (size: { width: number; height: number }) => void;
  setFocusedCard: (cardId: string | null) => void;
}

const CardContext = createContext<CardContextValue | undefined>(undefined);

export function CardProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cardReducer, initialState);

  // Load saved state on mount
  useEffect(() => {
    // Always initialize with default positions on load to "hardcode" them
    dispatch({ type: 'INITIALIZE_CARDS' });
  }, []);

  // Save state whenever cards change
  useEffect(() => {
    if (state.cards.length > 0) {
      saveCardStates(state.cards);
    }
  }, [state.cards]);

  // Action creators
  const toggleCard = useCallback((cardId: string) => {
    dispatch({ type: 'TOGGLE_CARD', cardId });
  }, []);

  const updatePosition = useCallback((cardId: string, position: { x: number; y: number }) => {
    const finalPosition = state.snapToGridEnabled ? snapToGrid({ ...position, zIndex: 0 }) : position;
    dispatch({ type: 'UPDATE_POSITION', cardId, position: finalPosition });
  }, [state.snapToGridEnabled]);

  const expandCard = useCallback((cardId: string) => {
    dispatch({ type: 'EXPAND_CARD', cardId });
  }, []);

  const minimizeCard = useCallback((cardId: string) => {
    dispatch({ type: 'MINIMIZE_CARD', cardId });
  }, []);

  const bringToFront = useCallback((cardId: string) => {
    dispatch({ type: 'BRING_TO_FRONT', cardId });
  }, []);

  const autoArrange = useCallback(() => {
    dispatch({ type: 'AUTO_ARRANGE' });
  }, []);

  const toggleSnapToGrid = useCallback(() => {
    dispatch({ type: 'TOGGLE_SNAP_TO_GRID' });
  }, []);

  const setContainerSize = useCallback((size: { width: number; height: number }) => {
    dispatch({ type: 'SET_CONTAINER_SIZE', size });
  }, []);

  const setFocusedCard = useCallback((cardId: string | null) => {
    dispatch({ type: 'SET_FOCUSED_CARD', cardId });
  }, []);

  const value: CardContextValue = {
    state,
    dispatch,
    toggleCard,
    updatePosition,
    expandCard,
    minimizeCard,
    bringToFront,
    autoArrange,
    toggleSnapToGrid,
    setContainerSize,
    setFocusedCard,
  };

  return <CardContext.Provider value={value}>{children}</CardContext.Provider>;
}

export function useCardContext() {
  const context = useContext(CardContext);
  if (context === undefined) {
    throw new Error('useCardContext must be used within a CardProvider');
  }
  return context;
}
