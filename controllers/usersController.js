import { supabase } from "../lib/supabase.js";
import createNewPost from "./postController.js";

export async function uploadPost(files, caption, userId, user_name) {
  try {
    const file = files && files.length > 0 ? files[0] : null;
    if (!file || !caption) {
      console.error("No files provided!");
      return null;
    }

    // Upload image to the Supabase storage bucket
    const fileName = `${Date.now()}-${file.name}`;
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("user-images")
      .upload(fileName, file);

    if (uploadError) {
      console.error("Error uploading the post: ", uploadError.message);
      return null;
    }

    // Get the public URL for the uploaded image
    const { data: publicUrlData, error: urlError } = await supabase.storage
      .from("user-images")
      .getPublicUrl(fileName);

    if (urlError) {
      console.error("Error fetching public URL: ", urlError.message);
      return null;
    }

    const publicUrl = publicUrlData.publicUrl;

    // Save post data to the database
    const postData = {
      image_url: publicUrl,
      caption: caption,
      user_id: userId,
      user_name: user_name,
    };

    const result = await createNewPost(postData);
    if (!result) {
      console.error("Error creating post in the database!");
      return null;
    }

    return result;
  } catch (error) {
    console.error("Something went wrong:", error.message);
    return null;
  }
}
