export interface CardPosition {
  x: number;
  y: number;
  zIndex: number;
}

export interface CardState {
  id: string;
  position: CardPosition;
  isVisible: boolean;
  isMinimized: boolean;
  isExpanded: boolean;
}

const CARD_WIDTH = 320; // w-80 = 320px
const CARD_HEIGHT = 128; // h-32 = 128px
const GRID_SIZE = 50;
const PADDING = 20;

// Auto-arrange cards to avoid overlaps
export function autoArrangeCards(cards: CardState[], containerWidth: number, containerHeight: number): CardState[] {
  const arrangedCards = [...cards];
  const visibleCards = arrangedCards.filter(card => card.isVisible && !card.isMinimized);
  
  // Calculate grid positions
  const cols = Math.floor((containerWidth - PADDING * 2) / (CARD_WIDTH + PADDING));
  const rows = Math.ceil(visibleCards.length / cols);
  
  visibleCards.forEach((card, index) => {
    const col = index % cols;
    const row = Math.floor(index / cols);
    
    card.position.x = PADDING + col * (CARD_WIDTH + PADDING);
    card.position.y = PADDING + row * (CARD_HEIGHT + PADDING);
    card.position.zIndex = 1;
  });
  
  return arrangedCards;
}

// Snap position to grid
export function snapToGrid(position: CardPosition): CardPosition {
  return {
    ...position,
    x: Math.round(position.x / GRID_SIZE) * GRID_SIZE,
    y: Math.round(position.y / GRID_SIZE) * GRID_SIZE,
  };
}

// Check if two cards overlap
export function checkOverlap(pos1: CardPosition, pos2: CardPosition): boolean {
  return !(
    pos1.x + CARD_WIDTH < pos2.x ||
    pos2.x + CARD_WIDTH < pos1.x ||
    pos1.y + CARD_HEIGHT < pos2.y ||
    pos2.y + CARD_HEIGHT < pos1.y
  );
}

// Find non-overlapping position
export function findNonOverlappingPosition(
  desiredPosition: CardPosition,
  existingCards: CardState[],
  containerWidth: number,
  containerHeight: number
): CardPosition {
  const occupied = existingCards
    .filter(card => card.isVisible && !card.isMinimized)
    .map(card => card.position);

  let testPosition = { ...desiredPosition };
  let attempts = 0;
  const maxAttempts = 100;

  while (attempts < maxAttempts) {
    const hasOverlap = occupied.some(pos => checkOverlap(testPosition, pos));
    
    if (!hasOverlap) {
      // Ensure position is within bounds
      testPosition.x = Math.max(0, Math.min(testPosition.x, containerWidth - CARD_WIDTH));
      testPosition.y = Math.max(0, Math.min(testPosition.y, containerHeight - CARD_HEIGHT));
      return testPosition;
    }

    // Try different positions in a spiral pattern
    const angle = (attempts * 137.5) % 360; // Golden angle for spiral
    const distance = Math.floor(attempts / 8) * 50 + 50;
    
    testPosition.x = desiredPosition.x + Math.cos(angle * Math.PI / 180) * distance;
    testPosition.y = desiredPosition.y + Math.sin(angle * Math.PI / 180) * distance;
    
    attempts++;
  }

  return testPosition;
}

// Get next available z-index
export function getNextZIndex(cards: CardState[]): number {
  return Math.max(...cards.map(card => card.position.zIndex), 0) + 1;
}

// Default positions for different card types
// Cards are w-80 h-32 (320px x 128px), so spacing them 400px apart to avoid overlap
export const defaultPositions: Record<string, CardPosition> = {
  about: { x: 20, y: 50, zIndex: 1 },         // Top-left
  experience: { x: 360, y: 50, zIndex: 2 },   // Top-middle
  whatIDo: { x: 700, y: 50, zIndex: 3 },      // Top-right
  blog: { x: 20, y: 220, zIndex: 4 },        // Below 'about'
};

// Persistence functions
export function saveCardStates(cards: CardState[]): void {
  try {
    localStorage.setItem('cardStates', JSON.stringify(cards));
  } catch (error) {
    console.warn('Failed to save card states:', error);
  }
}

export function loadCardStates(): CardState[] | null {
  try {
    const saved = localStorage.getItem('cardStates');
    return saved ? JSON.parse(saved) : null;
  } catch (error) {
    console.warn('Failed to load card states:', error);
    return null;
  }
}
