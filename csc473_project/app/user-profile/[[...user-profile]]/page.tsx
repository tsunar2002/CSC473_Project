"use client";
import { useState, useEffect } from "react";
import CreatePostModal from "@/components/CreatePostModal/CreatePostModal";
import { useAuth, UserProfile, useUser } from "@clerk/nextjs";
import { uploadPost } from "../../../controllers/usersController";
import NavBar from "@/components/NavBar/NavBar";
import { fetchAllPosts } from "@/controllers/postController";
import { fetchTrailsByUserId } from "../../../controllers/usersController";
import { fetchTrailsByIds } from "@/controllers/trailsController";
import { ProfileTrailsCard } from "@/components/ProfileTrailsCard/ProfileTrailsCard";
import ProfilePostCard from "@/components/ProfilePostCard/ProfilePostCard";
import Link from "next/link";

interface Trail {
  id: string;
  trail_name: string;
  length_miles: number;
  difficulty: string;
  location: string;
  description: string;
  image_url: string;
}

interface Post {
  user_name: string;
  id: string;
  image_url: string;
  caption: string;
  likes: number;
}

const ProfilePage = () => {
  // userId
  const { user } = useUser();

  const [files, setFiles] = useState<File[]>([]);
  const [username, setUsername] = useState(user?.username || "");
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [caption, setCaption] = useState<string>("");
  const [favTrails, setFavTrails] = useState<Trail[]>([]);
  const [likedPosts, setLikedPosts] = useState<Post[]>([]);


  const userId = user?.id;

  useEffect(() => {
    async function getFavTrails() {
      if (userId) {
        const favTrailIds = await fetchTrailsByUserId(userId);
        const filteredByFavs = await fetchTrailsByIds(favTrailIds?.favorites.slice(0, 4))
        if (filteredByFavs && Array.isArray(filteredByFavs)) {
          setFavTrails(filteredByFavs);
        }
      }

    }
    getFavTrails();
  }, [userId]);


  function toggleModal() {
    setIsModalOpen(!isModalOpen);
  }

  function handleFileChange(uploadedFiles: File[]) {
    setFiles(uploadedFiles); // Update the selected files
  }

  function handleCaptionChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    setCaption(event.target.value);
  }

  async function handlePost() {
    if (!files.length || !caption.length) {
      toggleModal();
      setMessage(
        "Please upload at least one file and type in a caption for it!"
      );
      return;
    }

    setUploading(true);
    setMessage("");

    try {
      const userId = user?.id;
      const user_name = user?.username ? user.username : user?.fullName;

      const results = await uploadPost(files, caption, userId, user_name);

      if (results) {
        setIsModalOpen(false);
        setFiles([]);
        setCaption("");
        setMessage(results.message);
      }
    } catch (error) {
      console.error("Error uploading post:", error);
      setMessage("An error occurred. Please try again.");
    } finally {
      setUploading(false);
    }
  }

  return (
    <>
      <NavBar />
      <div className="flex h-screen">
        <div className="w-1/2 overflow-hidden border-r-2 p-3 flex flex-col justify-center items-center space-y-8">
          <div>
            <UserProfile />
          </div>
          <button className="p-[3px] relative">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
            <div className="px-8 py-2  bg-black rounded-[6px]  relative group transition duration-200 text-white hover:bg-transparent" onClick={toggleModal}>
              Create New Post
            </div>
          </button>
          {isModalOpen && (
            <CreatePostModal
              isUploading={uploading}
              onCancel={toggleModal}
              onPost={handlePost}
              onFileChange={handleFileChange}
              onCaptionChange={handleCaptionChange}
            />
          )}
          {message && <p>{message}</p>}
        </div>
        <div className="w-1/2 flex flex-col items-center p-8 space-y-8 mt-10">
          <div className="w-full bg-gray-200 p-4 rounded-lg">
            <div className="flex justify-between items-center">
              <p className="font-semibold">My Posts</p>
              <Link href="/feed" passHref>
                <button className="className=inline-block bg-gray-800 text-white py-2 px-4 rounded-lg font-medium shadow-lg hover:bg-black transition-all transform hover:scale-105 duration-300 ease-in-out">
                    See More
                </button>
              </Link>
            </div>
            <div className="flex flex-wrap gap-10 justify-center">
              {likedPosts.map((post) => (
                <ProfilePostCard
                  key={post.id}
                  post_id={post.id}
                  user_name={post.user_name}
                  image_url={post.image_url}
                  caption={post.caption}
                  total_likes={post.likes}
                />
              ))}
            </div>
          </div>
          <div className="w-full bg-gray-200 p-4 rounded-lg">
            <div className="flex justify-between items-center">
              <p className="font-semibold">My Favorites</p>
              <Link href="/favorites" passHref>
                <button className="className=inline-block bg-gray-800 text-white py-2 px-4 rounded-lg font-medium shadow-lg hover:bg-black transition-all transform hover:scale-105 duration-300 ease-in-out">
                  See More
                </button>
              </Link>
            </div>
            <div className="flex flex-wrap gap-10 justify-center">
              {favTrails.length > 0
                ? favTrails.map((trail) => (
                  <ProfileTrailsCard
                    key={trail.id}
                    id={trail.id}
                    trail_name={trail.trail_name}
                    length={trail.length_miles}
                    difficulty={trail.difficulty}
                    location={trail.location}
                    description={trail.description}
                    image_url={trail.image_url}
                  />
                ))
                :
                <>
                  <p>Currently no favorites yet, why not explore some trails?</p>
                </>}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
