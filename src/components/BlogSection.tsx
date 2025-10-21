
import { blogPosts } from "@/data/blogPosts";
import BlogCard from "@/components/BlogCard";
import { useState, lazy, Suspense } from "react";

const EssayModal = lazy(() => import("@/components/EssayModal"));

export function BlogSection() {
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

  return (
    <>
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {blogPosts.map((post) => (
          <BlogCard
            key={post.id}
            post={post}
            onClick={() => openModal(post)}
          />
        ))}
      </div>
      <Suspense fallback={null}>
        <EssayModal
          post={selectedPost}
          isOpen={isModalOpen}
          onClose={closeModal}
        />
      </Suspense>
    </>
  );
}
