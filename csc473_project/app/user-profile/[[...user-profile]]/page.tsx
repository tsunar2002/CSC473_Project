"use client";
import { useState } from "react";
import CreatePostModal from "@/components/CreatePostModal/CreatePostModal";
import { useAuth, UserProfile, useUser } from "@clerk/nextjs";
import { uploadPost } from "../../../controllers/usersController";
import NavBar from "@/components/NavBar/NavBar";

const ProfilePage = () => {
  // userId
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

  return (
    <>
      <NavBar />
      <div>
        <UserProfile />
      </div>
      <div className="m-10">
        <button
          className="bg-cyan-500 w-40 h-10 rounded-xl"
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
