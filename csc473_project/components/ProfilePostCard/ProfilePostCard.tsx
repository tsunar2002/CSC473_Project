"use client";
import Image from "next/image";
import profilePic from "../../public/assets/TrailLogo.png";
import React, { useState } from "react";
import { likePost, removeLike } from "@/controllers/postController";

interface PostCardProps {
  post_id: string;
  user_name: string;
  image_url: string;
  caption: string;
  total_likes: number;
}

const ProfilePostCard = ({
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
    <div className="bg-white shadow-2xl rounded-lg overflow-hidden my-8"
    style={{ width: "250px"}}>
      <div className="flex items-center p-6">
        <Image
          src={profilePic}
          alt="Profile"
          className="w-8 h-8 rounded-full mr-4"
        />
        <div>
          <h2 className="text-2xl text-gray-800">{user_name}</h2>
        </div>
      </div>

      <div className="p-4 text-gray-700">
        <p className="text-lg">{caption}</p>
      </div>

      <div className="relative w-[250px] h-[250px]">
        <Image
          src={image_url}
          alt="Post"
          className="object-cover"
          width={400}
          height={400}
        />
      </div>
      <span className="text-gray-500 text-lg">{likes} Likes</span>
    </div>
  );
};

export default ProfilePostCard;
