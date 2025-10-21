
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { ReactNode, useRef, useEffect, useState } from "react";
import { Button } from "./ui/button";
import { X, User, Briefcase, Code, FileText } from "lucide-react";
import { useCardContext } from "@/contexts/CardContext";

interface DraggableCardProps {
  children: ReactNode;
  cardId: string;
  title: string;
  type: 'about' | 'experience' | 'whatIDo' | 'blog';
}

const cardIcons = {
  about: User,
  experience: Briefcase,
  whatIDo: Code,
  blog: FileText,
};

const cardThemes = {
  about: "border-border",
  experience: "border-border", 
  whatIDo: "border-border",
  blog: "border-border",
};

export function DraggableCard({
  children,
  cardId,
  title,
  type,
}: DraggableCardProps) {
  const { state, expandCard, minimizeCard, bringToFront, updatePosition } = useCardContext();
  const cardRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  
  const card = state.cards.find(c => c.id === cardId);
  if (!card || !card.isVisible) return null;

  const IconComponent = cardIcons[type];
  const themeClass = cardThemes[type];
  const isExpanded = card.isExpanded;
  const isMinimized = card.isMinimized;
  const isDimmed = state.focusedCard && state.focusedCard !== cardId;

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isExpanded) {
        expandCard(cardId);
      }
    };

    if (isExpanded) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isExpanded, cardId, expandCard]);

  const handleExpand = (e: React.MouseEvent) => {
    e.stopPropagation();
    expandCard(cardId);
  };

  const handleMinimize = (e: React.MouseEvent) => {
    e.stopPropagation();
    minimizeCard(cardId);
  };

  const handleDragStart = () => {
    setIsDragging(true);
    bringToFront(cardId);
  };

  const handleDragEnd = (event: any, info: any) => {
    const newX = card.position.x + info.offset.x;
    const newY = card.position.y + info.offset.y;
    updatePosition(cardId, { x: newX, y: newY });
    
    // Reset drag state after a small delay to prevent click from triggering
    setTimeout(() => {
      setIsDragging(false);
    }, 50);
  };

  const handleClick = (e: React.MouseEvent) => {
    // Only open if it wasn't a drag
    if (!isDragging) {
      handleExpand(e);
    }
  };

  // Expanded modal view
  if (isExpanded) {
    return (
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 z-40 flex items-center justify-center p-4"
          onClick={() => expandCard(cardId)}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="w-full max-w-4xl max-h-[90vh] z-50"
            onClick={(e) => e.stopPropagation()}
          >
            <Card className={`h-full shadow-2xl ${themeClass} bg-card`}>
              <div className="p-4 bg-card/50 backdrop-blur-sm rounded-t-lg flex justify-between items-center border-b">
                <div className="flex items-center gap-3">
                  <IconComponent size={20} className="text-foreground" />
                  <h2 className="text-lg font-bold font-mono">{title}</h2>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => expandCard(cardId)}
                  className="rounded-full h-8 w-8"
                >
                  <X size={16} />
                </Button>
              </div>
              <div className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
                {children}
              </div>
            </Card>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    );
  }

  // Minimized view
  if (isMinimized) {
    return (
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="fixed bottom-4 z-30"
        style={{ left: `${20 + (Object.keys(cardIcons).indexOf(type) * 60)}px` }}
      >
        <Button
          variant="outline"
          size="icon"
          onClick={() => minimizeCard(cardId)}
          className="h-12 w-12 rounded-full shadow-lg"
        >
          <IconComponent size={20} />
        </Button>
      </motion.div>
    );
  }

  // Normal draggable view
  return (
    <motion.div
      ref={cardRef}
      drag={window.innerWidth > 768} // Only draggable on desktop
      dragMomentum={false}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      className={`${window.innerWidth > 768 ? 'absolute cursor-grab' : 'relative mb-6'} ${isDimmed ? 'opacity-30' : 'opacity-100'}`}
      style={window.innerWidth > 768 ? {
        x: card.position.x,
        y: card.position.y,
        zIndex: card.position.zIndex,
      } : {}}
      whileDrag={{ 
        scale: 1.05,
        zIndex: 100,
        cursor: "grabbing"
      }}
      whileHover={{ 
        scale: window.innerWidth > 768 ? 1.02 : 1,
        y: window.innerWidth > 768 ? card.position.y - 5 : card.position.y 
      }}
      animate={window.innerWidth > 768 ? {
        y: [card.position.y, card.position.y - 2, card.position.y],
        transition: {
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }
      } : {}}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      onClick={handleClick}
    >
      <Card className={`${window.innerWidth > 768 ? 'w-80 h-32' : 'w-full max-w-md mx-auto h-24'} shadow-lg hover:shadow-xl transition-all duration-300 ${themeClass} bg-card`}>
        <div className="h-full flex items-center justify-center p-6">
          <div className="flex items-center gap-4">
            <IconComponent size={window.innerWidth > 768 ? 32 : 28} className="text-foreground" />
            <h2 className={`${window.innerWidth > 768 ? 'text-2xl' : 'text-xl'} font-bold select-none font-mono`}>{title}</h2>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
