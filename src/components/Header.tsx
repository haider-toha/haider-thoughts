import { Link } from "react-router-dom";
import { ModeToggle } from "./ModeToggle";
import React from "react";
import { Button } from "./ui/button";

interface HeaderProps {
  toggleCard: (card: "about" | "experience" | "whatIDo" | "blog") => void;
}

const Header = ({ toggleCard }: HeaderProps) => {
  return (
    <header className="w-full border-b border-border sticky top-0 bg-background/80 backdrop-blur-lg z-50">
      <div className="container mx-auto px-6 py-4">
        <nav className="flex items-center justify-between">
          <Link
            to="/"
            className="text-xl font-mono font-semibold tracking-tight hover:text-primary transition-colors"
          >
            haider<span className="text-primary">.</span>/home
          </Link>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => toggleCard("about")}>
              About
            </Button>
            <Button variant="ghost" size="sm" onClick={() => toggleCard("experience")}>
              Experience
            </Button>
            <Button variant="ghost" size="sm" onClick={() => toggleCard("whatIDo")}>
              What I Do
            </Button>
            <Button variant="ghost" size="sm" onClick={() => toggleCard("blog")}>
              Blog
            </Button>
            <ModeToggle />
          </div>
        </nav>
      </div>
    </header>
  );
};

export default React.memo(Header);