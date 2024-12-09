"use client";
import PostCard from "@/components/PostCard/PostCard";
import React, { useEffect, useState } from "react";
import { fetchAllPosts } from "../../controllers/postController";
import Navbar from "@/components/NavBar/NavBar";

interface Post {
  user_name: string;
  id: string;
  image_url: string;
  caption: string;
  likes: number;
}

const FeedPage = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  useEffect(() => {
    async function getPosts() {
      const posts = await fetchAllPosts();
      if (posts && Array.isArray(posts)) {
        setPosts(posts);
      }
    }
    getPosts();
  }, []);

  return (
    <div>
      <Navbar />
      {posts.map((post) => (
        <PostCard
          key={post.id}
          post_id={post.id}
          user_name={post.user_name}
          image_url={post.image_url}
          caption={post.caption}
          total_likes={post.likes}
        />
      ))}
    </div>
  );
};

export default FeedPage;
