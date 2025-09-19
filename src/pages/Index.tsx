import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import EssayModal from "@/components/EssayModal";
import { blogPosts } from "@/data/blogPosts";

const Index = () => {
  // Since there is only one post, we'll feature it directly.
  const featuredPost = blogPosts[0];
  
  // Modal state
  const [selectedPost, setSelectedPost] = useState<typeof featuredPost | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (post: typeof featuredPost) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedPost(null), 300); // Delay to allow animation
  };

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeModal();
      }
    };

    if (isModalOpen) {
      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }
  }, [isModalOpen]);

  if (!featuredPost) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-6 py-16">
          <h2 className="text-2xl font-bold font-mono">No thoughts yet.</h2>
          <p className="text-muted-foreground mt-4">Check back soon.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Featured Post Section */}
      <motion.section 
        className="container mx-auto px-6 pt-16 pb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-4xl">
          <button 
            onClick={() => openModal(featuredPost)}
            className="group block w-full text-left"
          >
            <article className="border border-border rounded-lg p-8 hover:border-primary/30 transition-colors cursor-pointer">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-xs font-mono text-primary bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
                  {featuredPost.category}
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-semibold leading-tight mb-4 group-hover:text-primary transition-colors">
                {featuredPost.title}
              </h1>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                {featuredPost.excerpt}
              </p>
              <div className="flex items-center gap-4 text-sm text-muted-foreground font-mono">
                <time>{featuredPost.date}</time>
                <span>•</span>
                <span>{featuredPost.readTime}</span>
              </div>
            </article>
          </button>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="border-t border-border py-12 mt-16">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl flex items-center justify-start">
            <p className="text-muted-foreground font-mono text-sm">
              Crafted with curiosity & <span className="text-primary"><code dangerouslySetInnerHTML={{ __html: '&lt;code /&gt;' }} /></span>
            </p>
          </div>
        </div>
      </footer>

      {/* Essay Modal */}
      <EssayModal 
        post={selectedPost}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </div>
  );
};

export default Index;
