import { useEffect, useRef } from "react";
import Header from "@/components/Header";
import { DraggableCard } from "@/components/DraggableCard";
import { BlogSection } from "@/components/BlogSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { WhatIDoSection } from "@/components/sections/WhatIDoSection";
import { CardProvider, useCardContext } from "@/contexts/CardContext";

function IndexContent() {
  const { setContainerSize } = useCardContext();
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

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main 
        ref={containerRef}
        className="flex-grow w-full h-full relative overflow-hidden md:overflow-visible"
      >
        {/* Desktop: Absolute positioned draggable cards */}
        <div className="hidden md:block w-full h-full">
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

        {/* Mobile: Stack cards vertically */}
        <div className="md:hidden flex flex-col gap-6 p-6 overflow-y-auto">
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
