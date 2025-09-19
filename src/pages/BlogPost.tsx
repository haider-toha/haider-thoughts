import { useParams, Link, Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import { blogPosts } from "@/data/blogPosts";
import { ArrowLeft, Clock } from "lucide-react";

const BlogPost = () => {
  const { slug } = useParams();
  const post = blogPosts.find(p => p.slug === slug);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <Button 
            variant="ghost" 
            asChild 
            className="mb-8 hover:bg-primary/10 hover:text-primary transition-smooth"
          >
            <Link to="/blog">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Essays
            </Link>
          </Button>

          {/* Post Header */}
          <article className="animate-fade-in">
            <header className="mb-12">
              <Badge 
                variant="secondary" 
                className="mb-4 bg-primary/10 text-primary border-primary/20 font-mono"
              >
                {post.category}
              </Badge>
              
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                {post.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground font-mono">
                <time dateTime={post.date}>{post.date}</time>
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {post.readTime}
                </div>
              </div>
            </header>

            {/* Post Content */}
            <div className="prose prose-lg prose-neutral dark:prose-invert max-w-none">
              <div 
                className="leading-relaxed"
                dangerouslySetInnerHTML={{ 
                  __html: post.content
                    .replace(/\n## /g, '\n<h2 class="text-2xl font-semibold mb-4 mt-8 text-foreground">')
                    .replace(/\n# /g, '\n<h1 class="text-3xl font-bold mb-6 mt-12 text-foreground">')
                    .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-foreground">$1</strong>')
                    .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
                    .replace(/`(.*?)`/g, '<code class="bg-muted px-1.5 py-0.5 rounded font-mono text-sm">$1</code>')
                    .replace(/\n\n/g, '</p><p class="mb-4 text-muted-foreground leading-relaxed">')
                    .replace(/^(.)/g, '<p class="mb-4 text-muted-foreground leading-relaxed">$1')
                    .replace(/\n(\d+\.)/g, '</p><ol class="list-decimal list-inside mb-4 space-y-2"><li class="text-muted-foreground">') 
                    .replace(/\n-/g, '</p><ul class="list-disc list-inside mb-4 space-y-2"><li class="text-muted-foreground">')
                    .replace(/$/, '</p>')
                }}
              />
            </div>

            {/* Post Footer */}
            <footer className="mt-16 pt-8 border-t border-border/40">
              <div className="flex justify-between items-center">
                <p className="text-sm text-muted-foreground font-mono">
                  Thanks for reading!
                </p>
                <Button 
                  variant="outline" 
                  asChild
                  className="border-primary/20 hover:border-primary hover:bg-primary/10 hover:text-primary transition-smooth"
                >
                  <Link to="/blog">More Essays</Link>
                </Button>
              </div>
            </footer>
          </article>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;