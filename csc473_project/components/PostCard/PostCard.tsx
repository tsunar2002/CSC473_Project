"use client";
import Image from "next/image";
import profilePic from "../../public/assets/TrailLogo.png";
import React, { useState } from "react";
import { likePost, removeLike } from "@/controllers/postController";
import { assert } from "console";

interface PostCardProps {
  post_id: string;
  user_name: string;
  image_url: string;
  caption: string;
  total_likes: number;
}

const PostCard = ({
  post_id,
  user_name,
  image_url,
  caption,
  total_likes,
}: PostCardProps) => {
  const [likes, setLikes] = useState(total_likes);
  const [isLiked, setIsLiked] = useState(false); // Track if the heart is clicked

  const handleLike = async () => {
    // Toggle the like state
    const newIsLiked = !isLiked;
    setIsLiked(newIsLiked);

    // Update the likes count
    setLikes((prevLikes) => prevLikes + (newIsLiked ? 1 : -1)); // Increase or decrease based on the new state

    try {
      if (newIsLiked) {
        await likePost(post_id); // increase like count in database
      } else {
        await removeLike(post_id); // decrease like count in database
      }
    } catch (error) {
      console.error("Error handling like:", error);
    }
  };

  return (
    <div className="max-w-3xl bg-white shadow-2xl rounded-lg overflow-hidden my-8 mx-auto">
      <div className="flex items-center p-6">
        <Image
          src={profilePic}
          alt="Profile"
          className="w-16 h-16 rounded-full mr-4"
        />
        <div>
          <h2 className="font-bold text-2xl text-gray-800">{user_name}</h2>
        </div>
      </div>

      <div className="p-4 text-gray-700">
        <p className="text-lg">{caption}</p>
      </div>

      <div className="relative w-full h-[500px]">
        <Image
          src={image_url}
          alt="Post"
          className="object-cover w-full h-full"
          width={800}
          height={500}
        />
      </div>

      <div className="flex items-center justify-between m-2 p-4 mt-2">
        <button
          onClick={handleLike}
          className={`text-xl font-semibold ${
            isLiked ? "text-red-500" : "text-gray-500"
          } transition-colors duration-300`}
        >
          {/* SVG Heart Icon: */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            viewBox="0 0 24 24"
            fill={isLiked ? "red" : "none"} // Red when liked, else unfilled
            stroke={isLiked ? "red" : "currentColor"} // Red stroke when liked, else default color
            strokeWidth="2"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </button>
        <span className="text-gray-500 text-lg">{likes} Likes</span>
      </div>
    </div>
  );
};

export default PostCard;
