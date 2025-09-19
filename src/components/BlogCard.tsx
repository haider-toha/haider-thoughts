import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  slug: string;
}

interface BlogCardProps {
  post: BlogPost;
}

const BlogCard = ({ post }: BlogCardProps) => {
  return (
    <Card className="group gradient-card border-border/50 hover:border-primary/30 transition-smooth shadow-elegant hover:shadow-xl hover:shadow-primary/5">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <Badge 
              variant="secondary" 
              className="mb-3 bg-primary/10 text-primary border-primary/20 font-mono text-xs"
            >
              {post.category}
            </Badge>
            <Link to={`/post/${post.slug}`}>
              <h3 className="text-lg font-semibold leading-tight group-hover:text-primary transition-smooth">
                {post.title}
              </h3>
            </Link>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-3">
          {post.excerpt}
        </p>
        
        <div className="flex items-center justify-between text-xs text-muted-foreground font-mono">
          <time dateTime={post.date}>{post.date}</time>
          <span>{post.readTime}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default BlogCard;