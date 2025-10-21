import { useState } from "react";
import Header from "@/components/Header";
import { DraggableCard } from "@/components/DraggableCard";
import { BlogSection } from "@/components/BlogSection";

const Index = () => {
  const [cards, setCards] = useState({
    about: true,
    experience: true,
    whatIDo: true,
    blog: true,
  });

  const toggleCard = (card: keyof typeof cards) => {
    setCards((prev) => ({ ...prev, [card]: !prev[card] }));
  };

  return (
    <div className="min-h-screen bg-background flex flex-col overflow-hidden">
      <Header toggleCard={toggleCard} />

      <main className="flex-grow w-full h-full relative container mx-auto px-6 py-16">
        {cards.about && (
          <DraggableCard title="About Me" initialPosition={{ x: 100, y: 50 }}>
            <p className="text-muted-foreground">
              I'm Haider, a creator and tinkerer exploring the web. This is my
              little corner of the internet where I share my thoughts, projects,
              and journey.
            </p>
          </DraggableCard>
        )}
        {cards.experience && (
          <DraggableCard
            title="Experience"
            initialPosition={{ x: 500, y: 150 }}
          >
            <p className="text-muted-foreground">
              A timeline of my professional journey, the skills I've picked up,
              and the lessons I've learned along the way.
            </p>
          </DraggableCard>
        )}
        {cards.whatIDo && (
          <DraggableCard title="What I Do" initialPosition={{ x: 200, y: 400 }}>
            <p className="text-muted-foreground">
              From coding and design to writing and photography, here's a
              glimpse into the things I'm passionate about and the tools I use.
            </p>
          </DraggableCard>
        )}
        {cards.blog && (
          <DraggableCard title="Blog" initialPosition={{ x: 600, y: 450 }}>
            <BlogSection />
          </DraggableCard>
        )}
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
};

export default Index;
