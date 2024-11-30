"use client";
import { useState } from "react";
import CreatePostModal from "@/components/CreatePostModal/CreatePostModal";
import { useAuth, UserProfile, useUser } from "@clerk/nextjs";
import { uploadPost } from "../../../controllers/usersController";
import NavBar from "@/components/NavBar/NavBar";
import { Tabs } from "@/components/ui/tabs";


const ProfilePage = () => {
  // userId
  // TODO: ProfilePage
  const { user } = useUser();
  console.log(user);

  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [caption, setCaption] = useState<string>("");

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

  const tabs = [
    {
      title: "Profile",
      value: "profile",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-l md:text-4xl text-white bg-gradient-to-br from-purple-700 to-violet-900">
          <p>Edit Profile</p>
          <div className="m-10">
            <button
              className="bg-cyan-500 w-40 h-20 rounded-xl"
              onClick={toggleModal}
            >
              Create a New Post
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
        </div>
      ),
    },
    {
      title: "Favorites",
      value: "favorites",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-l md:text-4xl text-white bg-gradient-to-br from-purple-700 to-violet-900">
          <p>My Favorites</p>
        </div>
      ),
    },
    {
      title: "Liked",
      value: "liked",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-l md:text-4xl text-white bg-gradient-to-br from-purple-700 to-violet-900">
          <p>My Liked Posts</p>
        </div>
      ),
    },
  ];

  return (
    <>
      <NavBar />
      <div className="h-[20rem] md:h-[40rem] [perspective:1000px] relative b flex flex-col max-w-5xl mx-auto w-full  items-start justify-start my-40">
        <Tabs tabs={tabs} />
      </div>
      
      <div className="m-10">
        <button
          className="bg-cyan-500 w-40 h-20 rounded-xl"
          onClick={toggleModal}
        >
          Create a New Post
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
    </>
  );
};

export default ProfilePage;
