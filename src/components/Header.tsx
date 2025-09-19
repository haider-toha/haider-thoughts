import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Header = () => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-6 py-4">
        <nav className="flex items-center justify-between">
          <Link 
            to="/" 
            className="text-xl font-mono font-semibold tracking-tight hover:text-primary transition-smooth"
          >
            <span className="text-primary">/</span>thoughts
          </Link>
          
          <div className="flex items-center gap-6">
            <Link
              to="/"
              className={`text-sm font-medium transition-smooth hover:text-primary ${
                isActive("/") ? "text-primary" : "text-muted-foreground"
              }`}
            >
              Home
            </Link>
            <Link
              to="/blog"
              className={`text-sm font-medium transition-smooth hover:text-primary ${
                isActive("/blog") ? "text-primary" : "text-muted-foreground"
              }`}
            >
              Essays
            </Link>
            <Button 
              variant="outline" 
              size="sm"
              className="border-primary/20 hover:border-primary hover:bg-primary/10 hover:text-primary transition-smooth"
            >
              Contact
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;