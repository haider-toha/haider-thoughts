import { Badge } from "@/components/ui/badge";
import { BlogPost } from "@/data/blogPosts";

interface BlogCardProps {
  post: BlogPost;
  onClick?: () => void;
}

const BlogCard = ({ post, onClick }: BlogCardProps) => {
  return (
    <button onClick={onClick} className="group block h-full w-full text-left">
      <article className="border border-border rounded-lg p-8 hover:border-primary/30 transition-colors h-full flex flex-col">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-4">
            <Badge
              variant="secondary"
              className="bg-primary/10 text-primary border-primary/20 font-mono text-xs"
            >
              {post.category}
            </Badge>
          </div>

          <h3 className="text-2xl font-semibold leading-tight mb-4 group-hover:text-primary transition-colors">
            {post.title}
          </h3>

          <p className="text-muted-foreground leading-relaxed line-clamp-6">
            {post.excerpt}
          </p>
        </div>

        <div className="flex items-center gap-4 text-sm text-muted-foreground font-mono mt-8">
          <time dateTime={post.date}>{post.date}</time>
          <span>•</span>
          <span>{post.readTime}</span>
        </div>
      </article>
    </button>
  );
};

export default BlogCard;