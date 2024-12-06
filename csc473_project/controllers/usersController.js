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

export async function fetchTrailsByUserId(user_id) {
  try {
    const { data, error } = await supabase
      .from("users")
      .select("favorites")
      .eq("id", user_id)
      .single();
    if (error) {
      console.error("Error fetching the trail: ", error);
    }

    console.log(data);
    return data;
  } catch (error) {
    console.error("Something went wrong!", error.message);
    return null;
  }
}

// Test Function
export async function fetchAllUsers() {
  try {
    // Fetch trails using range for pagination
    const { data, error } = await supabase
      .from("users")
      .select("*")

    if (error) {
      console.error("Error fetching users: ", error);
      return null;
    }

    console.log(data)
    return data;
  } catch (error) {
    console.error("Something went wrong!", error.message);
    return null;
  }
}

export async function checkUser(user_id) {
  try {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", user_id);

    console.log(user_id);
    console.log(data);

    if (error) {
      console.error("Error fetching existingUser: ", error);
      return null;
    }

    if (data) {
      return null;
    }

    console.log("Copies: ", data);
    return data;
  } catch (error) {
    console.error("Something went wrong!", error.message);
    return null;
  }

}

export async function addUser(user_id) {
  try {
    // Convert clerk user_id to uuid
    // If the new uuid already exists in database,  

    // Fetch trails using range for pagination

    if (checkUser(user_id))
    {
      console.log("User already exists!");
      return null;
    }

    const { data, error } = await supabase
      .from("users")
      .insert({id: user_id, favorites: ["f0151a14-821d-432f-aac9-69417f128e15"], liked_posts: []});

    if (error) {
      console.error("Error fetching users: ", error);
      return null;
    }

    return data;
  } catch (error) {
    console.error("Something went wrong!", error.message);
    return null;
  }
} 

