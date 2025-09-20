import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { BlogPost } from "@/data/blogPosts";

interface BlogCardProps {
  post: BlogPost;
}

const BlogCard = ({ post }: BlogCardProps) => {
  return (
    <Link to={`/post/${post.slug}`} className="group block h-full">
      <article className="border border-border rounded-lg p-6 hover:border-primary/30 transition-colors h-full flex flex-col">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-4">
            <Badge
              variant="secondary"
              className="bg-primary/10 text-primary border-primary/20 font-mono text-xs"
            >
              {post.category}
            </Badge>
          </div>

          <h3 className="text-xl font-semibold leading-tight mb-3 group-hover:text-primary transition-colors">
            {post.title}
          </h3>

          <p className="text-muted-foreground leading-relaxed line-clamp-3">
            {post.excerpt}
          </p>
        </div>

        <div className="flex items-center gap-4 text-sm text-muted-foreground font-mono mt-6">
          <time dateTime={post.date}>{post.date}</time>
          <span>•</span>
          <span>{post.readTime}</span>
        </div>
      </article>
    </Link>
  );
};

export default BlogCard;