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
      {/* Desktop */}
      <NavBar />
      <div className="hidden lg:flex h-screen bg-[url('https://plus.unsplash.com/premium_photo-1676218968741-8179dd7e533f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bW91dGFpbnxlbnwwfHwwfHx8MA%3D%3D')] bg-cover bg-center">
        <div className="w-1/2 overflow-hidden  p-3 flex flex-col justify-center items-center space-y-8">
          <div>
            <UserProfile />
          </div>
        </div>
        <div className="w-1/2 flex flex-col justify-center items-center p-8 space-y-8 ">
          <div className="w-full bg-gradient-to-br from-white to-gray-100 p-6 rounded-lg shadow-lg space-y-8 relative">
            <div className="flex justify-between items-center border-b pb-4">
              <p className="font-bold text-2xl text-gray-800">🌟 Share Your Story Here</p>
            </div>

            <div className="flex flex-col items-center space-y-4">
              <p className="text-lg text-center">
                Share and relive your best memories with the community.
              </p>
              <p className="text-lg text-center">
                Inspire others to hit the trails today!
              </p>
              <button className="relative group p-[3px]">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg group-hover:opacity-80 transition-opacity duration-200" />
                <div
                  className="px-10 py-4 bg-black rounded-[10px] relative text-white text-xl font-bold shadow-md group-hover:scale-105 transform transition-all duration-300"
                  onClick={toggleModal}
                >
                  Create Your Post ✍️
                </div>
              </button>
            </div>
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
          <div className="w-full bg-white p-4 rounded-lg shadow-lg space-y-5">
            <div className="flex justify-between items-center">
              <p className="font-bold text-xl">My Favorites</p>
              <Link href="/favorites" passHref>
                <button className="className=inline-block bg-gray-800 text-white py-2 px-4 rounded-lg font-medium shadow-lg hover:bg-black transition-all transform hover:scale-105 duration-300 ease-in-out">
                  See More
                </button>
              </Link>
            </div>
            <div className="flex flex-col gap-6 w-full">
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
                  <p>Currently no favorites yet.</p>
                </>}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile */}
      <div className="lg:hidden flex flex-col h-auto bg-[url('https://plus.unsplash.com/premium_photo-1676218968741-8179dd7e533f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bW91dGFpbnxlbnwwfHwwfHx8MA%3D%3D')] bg-cover bg-center space-y-8 p-4">
        <div className="p-3 flex flex-col justify-center items-center space-y-8 rounded-lg shadow-lg">
          <UserProfile />
        </div>

        <div className="w-full bg-gradient-to-br from-white to-gray-100 p-6 rounded-lg shadow-lg space-y-8 relative">
          <div className="flex justify-between items-center border-b pb-4">
            <p className="font-bold text-2xl text-gray-800">🌟 Share Your Story Here</p>
          </div>
          <div className="flex flex-col items-center space-y-4">
            <p className="text-lg text-center">
              Share and relive your best memories with the community.
            </p>
            <p className="text-lg text-center">
              Inspire others to hit the trails today!
            </p>
            <button className="relative group p-[3px]">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg group-hover:opacity-80 transition-opacity duration-200" />
              <div
                className="px-10 py-4 bg-black rounded-[10px] relative text-white text-xl font-bold shadow-md group-hover:scale-105 transform transition-all duration-300"
                onClick={toggleModal}
              >
                Create Your Post ✍️
              </div>
            </button>
          </div>
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

        <div className="w-full bg-white p-4 rounded-lg shadow-lg space-y-5">
          <div className="flex justify-between items-center">
            <p className="font-bold text-xl">My Favorites</p>
            <Link href="/favorites" passHref>
              <button className="bg-gray-800 text-white py-2 px-4 rounded-lg font-medium shadow-lg hover:bg-black transition-all transform hover:scale-105 duration-300 ease-in-out">
                See More
              </button>
            </Link>
          </div>
          <div className="flex flex-col gap-6 w-full">
            {favTrails.length > 0 ? (
              favTrails.map((trail) => (
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
            ) : (
              <p>Currently no favorites yet.</p>
            )}
          </div>
        </div>
      </div>

    </>
  );
};

export default ProfilePage;
