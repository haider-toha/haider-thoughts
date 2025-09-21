import { useParams, Link, Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import { blogPosts } from "@/data/blogPosts";
import { ArrowLeft, Clock } from "lucide-react";
import katex from "katex";

const BlogPost = () => {
  const { slug } = useParams();
  const post = blogPosts.find(p => p.slug === slug);

  if (!post) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-6 py-16">
        <div className="max-w-3xl mx-auto">
          {/* Back Button */}
          <Button 
            variant="ghost" 
            asChild 
            className="mb-12 -ml-4"
          >
            <Link to="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to all thoughts
            </Link>
          </Button>

          {/* Post Header */}
          <article>
            <header className="mb-16">
              <Badge 
                variant="secondary" 
                className="mb-6 bg-primary/10 text-primary border-primary/20 font-mono"
              >
                {post.category}
              </Badge>
              
              <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
                {post.title}
              </h1>
              
              <div className="flex items-center gap-4 text-sm text-muted-foreground font-mono">
                <time dateTime={post.date}>{post.date}</time>
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {post.readTime}
                </div>
              </div>
            </header>

            {/* Post Content */}
            <div className="prose prose-lg max-w-none">
              <div 
                className="leading-relaxed text-lg"
                dangerouslySetInnerHTML={{ 
                  __html: post.content
                    .replace(/\$([^$]+)\$/g, (match, math) => {
                      try {
                        return katex.renderToString(math.trim(), {
                          throwOnError: false,
                        });
                      } catch (e) {
                        console.error(e);
                        return match;
                      }
                    })
                    .replace(/\n## /g, '\n<h2 class="text-3xl font-bold mb-6 mt-12">')
                    .replace(/\n# /g, '\n<h1 class="text-4xl font-bold mb-8 mt-16">')
                    .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold">$1</strong>')
                    .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
                    .replace(/`(.*?)`/g, '<code class="bg-muted px-2 py-1 rounded text-base font-mono">$1</code>')
                    .replace(/\n\n/g, '</p><p class="mb-6 leading-relaxed">')
                    .replace(/^(.)/g, '<p class="mb-6 leading-relaxed">$1')
                    .replace(/\n(\d+\.)/g, '</p><ol class="list-decimal list-inside mb-6 space-y-2"><li class="leading-relaxed">') 
                    .replace(/\n-/g, '</p><ul class="list-disc list-inside mb-6 space-y-2"><li class="leading-relaxed">')
                    .replace(/$/, '</p>')
                }}
              />
            </div>

            {/* Post Footer */}
            <footer className="mt-20 pt-12 border-t border-border">
              <div className="flex justify-between items-center">
                <p className="text-sm text-muted-foreground font-mono">
                  Thanks for reading!
                </p>
                <Button 
                  variant="outline" 
                  asChild
                  className="border-primary/20 hover:border-primary hover:bg-primary/10 hover:text-primary font-mono"
                >
                  <Link to="/">More thoughts</Link>
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