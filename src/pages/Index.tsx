import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import BlogCard from "@/components/BlogCard";
import { blogPosts } from "@/data/blogPosts";

const Index = () => {
  const recentPosts = blogPosts.slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block mb-6">
            <div className="w-16 h-16 mx-auto mb-6 rounded-2xl gradient-primary border border-primary/20 flex items-center justify-center animate-float">
              <span className="text-2xl font-mono font-bold text-primary">{"{ }"}</span>
            </div>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Random Essays on
            <span className="block text-primary font-mono tracking-tighter">
              Philosophy & Tech
            </span>
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Thoughts on technology, philosophy, and everything in between. 
            <span className="text-primary font-mono"> // unfiltered musings</span>
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              asChild 
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground glow-primary transition-smooth"
            >
              <Link to="/blog">Read Essays</Link>
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-primary/20 hover:border-primary hover:bg-primary/10 hover:text-primary transition-smooth"
            >
              About Me
            </Button>
          </div>
        </div>
      </section>

      {/* Recent Posts */}
      <section className="container mx-auto px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-bold">
              Recent <span className="text-primary font-mono">Essays</span>
            </h2>
            <Button variant="outline" asChild className="border-primary/20 hover:border-primary hover:bg-primary/10 hover:text-primary transition-smooth">
              <Link to="/blog">View All</Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentPosts.map((post, index) => (
              <div key={post.id} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <BlogCard post={post} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 py-12">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto text-center">
            <p className="text-muted-foreground font-mono text-sm">
              Built with curiosity & <span className="text-primary">{"<Code />"}</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
