import { motion } from "framer-motion";
import { BlogPost } from "@/data/blogPosts";

interface FeaturedPostProps {
  post: BlogPost;
  onClick: () => void;
}

const FeaturedPost = ({ post, onClick }: FeaturedPostProps) => {
  return (
    <motion.section 
      className="container mx-auto px-6 pt-16 pb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="max-w-4xl">
        <button 
          onClick={onClick}
          className="group block w-full text-left"
        >
          <article className="border border-border rounded-lg p-8 hover:border-primary/30 transition-colors cursor-pointer">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs font-mono text-primary bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
                {post.category}
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-semibold leading-tight mb-4 group-hover:text-primary transition-colors">
              {post.title}
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              {post.excerpt}
            </p>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-4 text-sm text-muted-foreground font-mono">
                <time>{post.date}</time>
                <span>•</span>
                <span>{post.readTime}</span>
                <span>•</span>
                <span>{post.content.split(/\s+/).length.toLocaleString()} words</span>
              </div>
              <div className="text-xs text-muted-foreground/70 font-mono">
                Click to read in focus mode →
              </div>
            </div>
          </article>
        </button>
      </div>
    </motion.section>
  );
};

export default FeaturedPost;
