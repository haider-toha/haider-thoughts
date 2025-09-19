import { motion, AnimatePresence } from "framer-motion";
import { X, Clock, BookOpen, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import React, { useState, useEffect, useRef, UIEvent } from "react";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
  category: string;
  slug: string;
}

interface EssayModalProps {
  post: BlogPost | null;
  isOpen: boolean;
  onClose: () => void;
}

const EssayModal = ({ post, isOpen, onClose }: EssayModalProps) => {
  const [readingProgress, setReadingProgress] = useState(0);
  const [isCopied, setIsCopied] = useState(false);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const elementsRef = useRef<NodeListOf<HTMLElement> | []>([]);
  const scrollTimeout = useRef<number | null>(null);

  // Handle Keyboard Shortcuts and Saved Scroll Position
  useEffect(() => {
    // Restore scroll position when modal opens
    if (isOpen && contentRef.current && post) {
      const savedPosition = localStorage.getItem(`reading-position-${post.slug}`);
      if (savedPosition) {
        contentRef.current.scrollTop = parseInt(savedPosition, 10);
      }
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
      if (contentRef.current) {
        if (event.key === 'ArrowDown') {
          event.preventDefault();
          contentRef.current.scrollBy({ top: 40, behavior: 'smooth' });
        }
        if (event.key === 'ArrowUp') {
          event.preventDefault();
          contentRef.current.scrollBy({ top: -40, behavior: 'smooth' });
        }
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose, post]);

  // Handle Style Reset and Element Querying
  useEffect(() => {
    if (!isOpen) {
      setReadingProgress(0);
      elementsRef.current.forEach(el => {
        el.classList.remove('is-read');
      });
    } else {
      setTimeout(() => {
        if (contentRef.current) {
          const contentContainer = contentRef.current.querySelector('.essay-content > div');
          if (contentContainer) {
            elementsRef.current = contentContainer.querySelectorAll('p, h2, h3, ol, ul') as NodeListOf<HTMLElement>;
          }
        }
      }, 300);
    }
  }, [isOpen]);

  const handleScroll = (e: UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    const scrollTop = target.scrollTop;
    const scrollHeight = target.scrollHeight - target.clientHeight;
    
    // Update progress bar
    const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
    setReadingProgress(progress);

    // Save scroll position (throttled)
    if (scrollTimeout.current) {
      clearTimeout(scrollTimeout.current);
    }
    scrollTimeout.current = window.setTimeout(() => {
      if (post) {
        localStorage.setItem(`reading-position-${post.slug}`, scrollTop.toString());
      }
    }, 250);

    // Update text opacity
    const modalRect = target.getBoundingClientRect();
    const readThreshold = scrollTop + (modalRect.height * 0.3);
    
    elementsRef.current.forEach((el) => {
      const elementTop = el.offsetTop;
      const elementBottom = elementTop + el.offsetHeight;
      
      if (elementBottom < readThreshold) {
        el.classList.add('is-read');
      } else {
        el.classList.remove('is-read');
      }
    });
  };

  const handleShare = () => {
    if (!post) return;
    const url = `${window.location.origin}/post/${post.slug}`;
    navigator.clipboard.writeText(url);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  if (!post) return null;

  // Calculate word count for personal metadata
  const wordCount = post.content.split(/\s+/).length;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40"
          />
          
          {/* Modal Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="essay-modal-content fixed right-0 top-0 h-full w-full md:w-2/3 lg:w-1/2 bg-background border-l border-border z-50 flex flex-col"
          >
            <div className="sticky top-0 bg-background/95 backdrop-blur-sm border-b border-border p-6 flex items-center justify-between z-10">
              <div className="flex items-center gap-3">
                <Badge 
                  variant="secondary" 
                  className="bg-primary/10 text-primary border-primary/20 font-mono text-xs"
                >
                  {post.category}
                </Badge>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="h-8 w-8 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            {/* Reading Progress Bar - Placed below the header but outside the scrollable content */}
            <div className="h-1 bg-muted w-full">
              <div 
                className="h-full bg-primary transition-all duration-150 ease-linear"
                style={{ width: `${readingProgress}%` }}
              />
            </div>

            <div 
              ref={contentRef}
              onScroll={handleScroll}
              className="flex-1 overflow-y-auto"
            >
              <div className="p-6 md:p-8">
                <header className="mb-12 pb-8 border-b border-border/30">
                  <h1 className="text-3xl md:text-4xl font-bold leading-[1.1] mb-6 text-foreground tracking-tight">
                    {post.title}
                  </h1>
                
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground font-mono">
                      <time dateTime={post.date}>{post.date}</time>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {post.readTime}
                      </div>
                      <div className="flex items-center gap-1">
                        <BookOpen className="h-3 w-3" />
                        {wordCount.toLocaleString()} words
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground font-mono mt-2">
                    <button onClick={handleShare} className="flex items-center gap-1 hover:text-primary transition-colors">
                      <Share2 className="h-3 w-3" />
                      Share
                    </button>
                    {isCopied && <span className="text-xs text-primary/80">Copied!</span>}
                  </div>
                </header>

                {/* Post Content */}
                <div className="essay-content">
                  <div 
                    className="text-lg leading-[1.7] font-normal"
                    dangerouslySetInnerHTML={{ 
                      __html: post.content
                        .replace(/\n## /g, '\n<h2 class="text-2xl font-semibold mb-6 mt-12 text-foreground border-b border-border/30 pb-2">')
                        .replace(/\n# /g, '\n<h1 class="text-3xl font-bold mb-8 mt-16 text-foreground">')
                        .replace(/\*\*(.*?)\*\*/g, '<strong class="font-medium text-foreground">$1</strong>')
                        .replace(/\*(.*?)\*/g, '<em class="italic text-muted-foreground">$1</em>')
                        .replace(/`(.*?)`/g, '<code class="bg-muted/60 text-foreground px-2 py-1 rounded text-sm font-mono border border-border/40">$1</code>')
                        .replace(/\n\n/g, '</p><p class="mb-8 leading-[1.7] text-muted-foreground font-normal">')
                        .replace(/^(.)/g, '<p class="mb-8 leading-[1.7] text-muted-foreground font-normal">$1')
                        .replace(/\n(\d+\.)/g, '</p><ol class="list-decimal ml-6 mb-8 space-y-3"><li class="leading-[1.7] text-muted-foreground font-normal pl-2">') 
                        .replace(/\n-/g, '</p><ul class="list-disc ml-6 mb-8 space-y-3"><li class="leading-[1.7] text-muted-foreground font-normal pl-2">')
                        .replace(/$/, '</p>')
                    }}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default React.memo(EssayModal);
