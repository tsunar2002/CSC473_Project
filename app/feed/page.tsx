"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
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

  useEffect(() => {
    async function getPosts() {
      try {
        const posts = await fetchAllPosts();
        if (posts && Array.isArray(posts)) {
          setPosts(posts);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    }

    getPosts();
  }, []);

  return (
    <div className="container mx-auto p-6 space-y-8">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Feed</h1>
        <Link
          href="/"
          className="px-6 py-2 bg-gray-500 text-white font-semibold rounded-lg shadow-md hover:bg-gray-600 transition duration-300"
        >
          Home
        </Link>
      </div>

      {/* Posts Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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

      {/* Fallback for No Posts */}
      {posts.length === 0 && (
        <p className="text-center text-gray-600 mt-6">No posts to display.</p>
      )}
    </div>
  );
};

export default FeedPage;
