import { Link } from "react-router-dom";
import { ModeToggle } from "./ModeToggle";
import React from "react";

const Header = () => {
  return (
    <header className="w-full border-b border-border sticky top-0 bg-background/80 backdrop-blur-lg z-50">
      <div className="container mx-auto px-6 py-4">
        <nav className="flex items-center justify-between">
          <Link
            to="/"
            className="text-xl font-mono font-semibold tracking-tight hover:text-primary transition-colors"
          >
            haider<span className="text-primary">.</span>cli
          </Link>
          
          <ModeToggle />
        </nav>
      </div>
    </header>
  );
};

export default React.memo(Header);