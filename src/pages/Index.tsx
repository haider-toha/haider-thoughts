import { useEffect, useRef, useState, useCallback } from "react";
import Header from "@/components/Header";
import { DraggableCard } from "@/components/DraggableCard";
import { BlogSection } from "@/components/BlogSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { WhatIDoSection } from "@/components/sections/WhatIDoSection";
import { CommandPalette } from "@/components/CommandPalette";
import { Terminal } from "@/components/Terminal";
import { FileExplorer } from "@/components/FileExplorer";
import { CardProvider, useCardContext } from "@/contexts/CardContext";
import { FileSystemProvider } from "@/contexts/FileSystemContext";

function IndexContent() {
  const { setContainerSize, expandCard, autoArrange, resetPositions, minimizeAll, showAll, state } = useCardContext();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [activeCard, setActiveCard] = useState<string | null>(null);

  useEffect(() => {
    const updateContainerSize = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        setContainerSize({ width, height });
      }
    };

    updateContainerSize();
    window.addEventListener('resize', updateContainerSize);
    return () => window.removeEventListener('resize', updateContainerSize);
  }, [setContainerSize]);

  // Keyboard shortcut for command palette
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen(true);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  // File open handler for terminal and file explorer
  const handleFileOpen = useCallback((cardId: string) => {
    setActiveCard(cardId);
    expandCard(cardId);
  }, [expandCard]);

  // Command execution handler
  const handleExecuteCommand = useCallback((commandId: string) => {
    switch (commandId) {
      case 'expand-about':
        handleFileOpen('about');
        break;
      case 'expand-experience':
        handleFileOpen('experience');
        break;
      case 'expand-whatIDo':
        handleFileOpen('whatIDo');
        break;
      case 'expand-blog':
        handleFileOpen('blog');
        break;
      case 'auto-arrange':
        autoArrange();
        break;
      case 'reset-positions':
        resetPositions();
        break;
      case 'minimize-all':
        minimizeAll();
        break;
      case 'show-all':
        showAll();
        break;
      case 'show-help':
        // Show help by opening command palette with help query
        setIsCommandPaletteOpen(true);
        break;
      default:
        console.log('Unknown command:', commandId);
    }
  }, [handleFileOpen, autoArrange, resetPositions, minimizeAll, showAll]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main 
        ref={containerRef}
        className="flex-grow w-full h-full flex overflow-hidden"
      >
        {/* Terminal Interface - 70% */}
        <div className="flex-1 w-[70%] h-full">
          <Terminal onFileOpen={handleFileOpen} />
        </div>

        {/* File Explorer Sidebar - 30% */}
        <div className="w-[30%] h-full">
          <FileExplorer onFileOpen={handleFileOpen} />
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-12">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl">
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-4 text-xs text-muted-foreground font-mono">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span>
                    Last updated{" "}
                    {new Date().toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </div>
                <span>•</span>
                <span>By Haider Toha</span>
              </div>
              <p className="text-muted-foreground font-mono text-sm">
                Crafted with curiosity &{" "}
                <a
                  href="https://github.com/mohammedhaidertoha/haider-thoughts"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline"
                >
                  <code dangerouslySetInnerHTML={{ __html: "&lt;code /&gt;" }} />
                </a>
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* Hidden DraggableCard components for modal overlays */}
      <div className="hidden">
        <DraggableCard
          cardId="about"
          title="./me"
          type="about"
        >
          <AboutSection />
        </DraggableCard>

        <DraggableCard
          cardId="experience"
          title="./experience"
          type="experience"
        >
          <ExperienceSection />
        </DraggableCard>

        <DraggableCard
          cardId="whatIDo"
          title="./projects"
          type="whatIDo"
        >
          <WhatIDoSection />
        </DraggableCard>

        <DraggableCard
          cardId="blog"
          title="./blog"
          type="blog"
        >
          <BlogSection />
        </DraggableCard>
      </div>

      {/* Command Palette */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onExecuteCommand={handleExecuteCommand}
      />
    </div>
  );
}

const Index = () => {
  return (
    <CardProvider>
      <FileSystemProvider>
        <IndexContent />
      </FileSystemProvider>
    </CardProvider>
  );
};

export default Index;
