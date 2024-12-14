"use client";
import React, { useEffect, useState, useRef, useCallback } from "react";
import Navbar from "@/components/NavBar/NavBar";
import PostCard from "@/components/PostCard/PostCard";
import { fetchAllPosts } from "../../controllers/postController";

interface Post {
  user_name: string;
  id: string;
  image_url: string;
  caption: string;
  likes: number;
}

const FeedPage = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const observer = useRef<IntersectionObserver | null>(null);
  const fetchPosts = async () => {
    if (isLoading || !hasMore) return; // Avoid duplicate fetches

    setIsLoading(true);
    const newPosts = await fetchAllPosts(page, 10); // Fetch 10 posts per page
    if (newPosts && newPosts.length > 0) {
      setPosts((prev) => [...prev, ...newPosts]);
      setPage((prevPage) => prevPage + 1);
    } else {
      setHasMore(false); // Stop fetching if no more posts
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const lastPostRef = useCallback(
    (node: HTMLDivElement) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          fetchPosts();
        }
      });

      if (node) observer.current.observe(node);
    },
    [isLoading, hasMore]
  );

  return (
    <>
      <Navbar />
      <div>
        {posts.map((post, index) => {
          const randomMultiplier = Math.floor(Math.random() * 1000); // Random number between 0 and 999
          const postKey = `${page}-${
            post.id
          }-${Date.now()}-${randomMultiplier}`;
          if (index === posts.length - 1) {
            // Attach the observer to the last post
            return (
              <div key={postKey} ref={lastPostRef}>
                <PostCard
                  post_id={post.id}
                  user_name={post.user_name}
                  image_url={post.image_url}
                  caption={post.caption}
                  total_likes={post.likes}
                />
              </div>
            );
          }
          return (
            <div key={postKey}>
              <PostCard
                post_id={post.id}
                user_name={post.user_name}
                image_url={post.image_url}
                caption={post.caption}
                total_likes={post.likes}
              />
            </div>
          );
        })}
      </div>
      {isLoading && <p>Loading...</p>}
      {!hasMore && <p>No more posts to load.</p>}
    </>
  );
};

export default FeedPage;
