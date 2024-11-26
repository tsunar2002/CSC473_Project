"use client";
import { useState } from "react";
import { supabase } from "../../../lib/supabase";
import CreatePostModal from "@/components/CreatePostModal/CreatePostModal";

const ProfilePage = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleFileChange = (uploadedFiles: File[]) => {
    setFiles(uploadedFiles); // Update the selected files
    console.log(files);
  };

  const uploadFile = async () => {
    try {
      setUploading(true);
      if (files.length === 0) {
        setMessage("No file selected.");
        return;
      }

      const file = files[0];
      const fileName = `${Date.now()}-${file.name}`;

      // Upload the file to Supabase bucket
      const { data, error } = await supabase.storage
        .from("user-images")
        .upload(fileName, file);

      if (error) throw error;

      setMessage(`File uploaded successfully: ${fileName}`);
      setIsModalOpen(!isModalOpen);
    } catch (error: any) {
      console.error("Error uploading file:", error.message);
      setMessage(`Error: ${error.message}`);
    } finally {
      setUploading(false);
    }
  };

  return (
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
          onPost={uploadFile}
          onFileChange={handleFileChange}
        />
      )}
      {message && <p>{message}</p>}
    </div>
  );
};

export default ProfilePage;
