import { useState, lazy, Suspense } from "react";
import Header from "@/components/Header";
import { blogPosts } from "@/data/blogPosts";
import BlogCard from "@/components/BlogCard";
import NoPosts from "@/components/NoPosts";

const EssayModal = lazy(() => import("@/components/EssayModal"));

const Index = () => {
  const [selectedPost, setSelectedPost] = useState<(typeof blogPosts)[0] | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (post: (typeof blogPosts)[0]) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedPost(null), 300);
  };

  if (!blogPosts || blogPosts.length === 0) {
    return <NoPosts />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Posts Section */}
      <section className="container mx-auto px-6 py-16">
        <div className="max-w-6xl">
          <div className="grid gap-6 md:grid-cols-2">
            {blogPosts.map((post) => (
              <BlogCard
                key={post.id}
                post={post}
                onClick={() => openModal(post)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 mt-16">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl">
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-4 text-xs text-muted-foreground font-mono">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span>Last updated {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                </div>
                <span>•</span>
                <span>By Haider Toha</span>
              </div>
              <p className="text-muted-foreground font-mono text-sm">
                Crafted with curiosity &{' '}
                <a
                  href="https://github.com/mohammedhaidertoha/haider-thoughts"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline"
                >
                  <code dangerouslySetInnerHTML={{ __html: '&lt;code /&gt;' }} />
                </a>
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* Essay Modal */}
      <Suspense fallback={null}>
        <EssayModal 
          post={selectedPost}
          isOpen={isModalOpen}
          onClose={closeModal}
        />
      </Suspense>
    </div>
  );
};

export default Index;
