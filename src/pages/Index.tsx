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
      
      {/* Hero Section - Asymmetrical Design */}
      <section className="container mx-auto px-6 py-12 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-primary/20 bg-primary/5">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                <span className="text-sm font-mono text-primary">Currently writing</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
                Essays on the
                <br />
                <span className="text-primary font-mono block mt-2">
                  intersection of
                </span>
                <br />
                philosophy & code
              </h1>
              
              <div className="max-w-md space-y-4">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Random thoughts, deep dives, and half-formed ideas about technology, 
                  life, and the spaces between them.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button 
                    asChild 
                    size="lg"
                    className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl hover:shadow-primary/20 transition-all duration-300"
                  >
                    <Link to="/blog">Start Reading</Link>
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="lg"
                    className="text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-smooth"
                  >
                    Subscribe to Updates
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Visual Element */}
          <div className="lg:col-span-5 relative">
            <div className="gradient-hero rounded-3xl p-8 lg:p-12 border border-primary/10">
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                    <span className="text-lg font-mono font-bold text-primary">∞</span>
                  </div>
                  <div>
                    <h3 className="font-mono text-sm text-primary">Latest Essay</h3>
                    <p className="text-xs text-muted-foreground">Published 2 days ago</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h4 className="text-xl font-semibold leading-tight">
                    {recentPosts[0]?.title || "The Paradox of Choice in Modern Tech"}
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {recentPosts[0]?.excerpt.slice(0, 120) + "..." || "Why having infinite options..."}
                  </p>
                  <Link 
                    to={`/post/${recentPosts[0]?.slug || 'paradox-of-choice-in-tech'}`}
                    className="inline-flex items-center text-sm font-mono text-primary hover:underline"
                  >
                    Read full essay →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-6 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center space-y-2">
              <div className="text-3xl font-bold font-mono text-primary">{blogPosts.length}</div>
              <div className="text-sm text-muted-foreground">Essays Published</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-3xl font-bold font-mono text-primary">∞</div>
              <div className="text-sm text-muted-foreground">Thoughts in Progress</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-3xl font-bold font-mono text-primary">2023</div>
              <div className="text-sm text-muted-foreground">Year Started</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Essays - Editorial Layout */}
      <section className="container mx-auto px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Main Featured Post */}
            <div className="lg:col-span-8">
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono text-primary bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
                    FEATURED
                  </span>
                  <span className="text-xs text-muted-foreground font-mono">
                    {recentPosts[0]?.category}
                  </span>
                </div>
                <h2 className="text-2xl md:text-4xl font-bold leading-tight">
                  {recentPosts[0]?.title}
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
                  {recentPosts[0]?.excerpt}
                </p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground font-mono">
                  <time>{recentPosts[0]?.date}</time>
                  <span>{recentPosts[0]?.readTime}</span>
                </div>
              </div>
              
              <Link to={`/post/${recentPosts[0]?.slug}`}>
                <div className="aspect-[16/10] rounded-2xl gradient-card border border-border/50 hover:border-primary/30 transition-smooth p-8 flex items-end">
                  <div className="space-y-2">
                    <div className="text-primary font-mono text-sm">Continue reading</div>
                    <div className="w-12 h-px bg-primary"></div>
                  </div>
                </div>
              </Link>
            </div>

            {/* Side Posts */}
            <div className="lg:col-span-4 space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Recent Essays</h3>
                <Button variant="ghost" size="sm" asChild className="text-xs font-mono">
                  <Link to="/blog">View All</Link>
                </Button>
              </div>
              
              <div className="space-y-6">
                {recentPosts.slice(1).map((post, index) => (
                  <Link key={post.id} to={`/post/${post.slug}`} className="group block">
                    <article className="space-y-3 p-4 rounded-xl hover:bg-muted/30 transition-smooth">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono text-primary bg-primary/10 px-2 py-1 rounded border border-primary/20">
                          {post.category}
                        </span>
                        <span className="text-xs text-muted-foreground font-mono">
                          {post.readTime}
                        </span>
                      </div>
                      <h4 className="font-semibold leading-tight group-hover:text-primary transition-smooth">
                        {post.title}
                      </h4>
                      <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                        {post.excerpt}
                      </p>
                      <time className="text-xs text-muted-foreground font-mono">
                        {post.date}
                      </time>
                    </article>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <div className="space-y-6 p-8 rounded-2xl gradient-card border border-primary/10">
            <h3 className="text-2xl font-bold">Stay Updated</h3>
            <p className="text-muted-foreground">
              Get notified when I publish new essays. No spam, just thoughtful content.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="your@email.com"
                className="flex-1 px-4 py-2 rounded-lg bg-background border border-border focus:border-primary focus:outline-none transition-smooth font-mono text-sm"
              />
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 py-12">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between">
            <p className="text-muted-foreground font-mono text-sm mb-4 md:mb-0">
              Built with curiosity & <span className="text-primary">{"<Code />"}</span>
            </p>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <Link to="/blog" className="hover:text-primary transition-smooth">Essays</Link>
              <span>•</span>
              <button className="hover:text-primary transition-smooth">About</button>
              <span>•</span>
              <button className="hover:text-primary transition-smooth">Contact</button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
