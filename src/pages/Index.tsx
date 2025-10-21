import { useEffect, useRef, useCallback } from "react";
import Header from "@/components/Header";
import { DraggableCard } from "@/components/DraggableCard";
import { BlogSection } from "@/components/BlogSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { WhatIDoSection } from "@/components/sections/WhatIDoSection";
import { JokeSection } from "@/components/sections/JokeSection";
import { HelpSection } from "@/components/sections/HelpSection";
import { CommandPalette } from "@/components/CommandPalette";
import { CardProvider, useCardContext } from "@/contexts/CardContext";

function IndexContent() {
  const { setContainerSize, expandCard, autoArrange, resetPositions, minimizeAll, showAll, state } = useCardContext();
  const containerRef = useRef<HTMLDivElement>(null);

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


  // Command execution handler
  const handleExecuteCommand = useCallback((commandId: string) => {
    switch (commandId) {
      case 'expand-about':
        expandCard('about');
        break;
      case 'expand-experience':
        expandCard('experience');
        break;
      case 'expand-whatIDo':
        expandCard('whatIDo');
        break;
      case 'expand-blog':
        expandCard('blog');
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
        expandCard('help');
        break;
      case 'tell-joke':
        expandCard('joke');
        break;
      default:
        console.log('Unknown command:', commandId);
    }
  }, [expandCard, autoArrange, resetPositions, minimizeAll, showAll]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main 
        ref={containerRef}
        className="flex-grow w-full h-full relative overflow-hidden md:overflow-visible"
      >
        {/* Embedded Command Palette - Main Focus */}
        <div className="flex items-center justify-center min-h-full p-6">
          <CommandPalette
            embedded={true}
            onExecuteCommand={handleExecuteCommand}
          />
        </div>

        {/* Hidden draggable cards - for command execution */}
        <div style={{ position: 'absolute', left: '-9999px', top: '-9999px' }}>
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

          <DraggableCard
            cardId="joke"
            title="./joke.js"
            type="about"
          >
            <JokeSection />
          </DraggableCard>

          <DraggableCard
            cardId="help"
            title="./help.md"
            type="about"
          >
            <HelpSection />
          </DraggableCard>
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
                    {new Date("2025-10-21").toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </div>
                <span>•</span>
                <span>
                  By{" "}
                  <a
                    href="https://www.linkedin.com/in/haidertoha/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground hover:underline hover:text-primary transition-colors"
                  >
                    Haider Toha
                  </a>
                </span>
              </div>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}

const Index = () => {
  return (
    <CardProvider>
      <IndexContent />
    </CardProvider>
  );
};

export default Index;
