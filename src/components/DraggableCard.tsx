
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { ReactNode } from "react";

interface DraggableCardProps {
  children: ReactNode;
  title: string;
  initialPosition?: { x: number; y: number };
}

export function DraggableCard({
  children,
  title,
  initialPosition,
}: DraggableCardProps) {
  return (
    <motion.div
      drag
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={0.1}
      className="absolute"
      style={{
        top: initialPosition?.y,
        left: initialPosition?.x,
      }}
      whileDrag={{ zIndex: 100 }}
    >
      <Card className="w-96 shadow-lg">
        <div className="p-4 bg-card/50 backdrop-blur-sm rounded-t-lg">
          <h2 className="text-lg font-bold cursor-grab select-none">{title}</h2>
        </div>
        <div className="p-4 pt-0">{children}</div>
      </Card>
    </motion.div>
  );
}
