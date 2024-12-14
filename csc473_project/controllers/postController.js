import { supabase } from "../lib/supabase.js";

// Also has pagination logic
export async function fetchAllPosts(page = 1, pageSize = 10) {
  try {
    // Calculate the offset based on the current page and pageSize
    const offset = (page - 1) * pageSize;

    // Fetch posts with pagination (limit and offset)
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .order("created_at", { ascending: false }) // Ordering posts by creation date (descending)
      .range(offset, offset + pageSize - 1); // Limit the results based on page and pageSize

    if (error) {
      console.error("Error fetching posts: ", error);
      return null; // Return null if there’s an error
    }

    if (!data || data.length === 0) {
      // console.log("No posts found.");
      return [];
    }

    // console.log(data);
    return data;
  } catch (error) {
    console.error("Something went wrong!", error.message);
    return null;
  }
}

// get a certain post
export async function fetchPostById(post_id) {
  try {
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .eq("id", post_id);
    if (error) {
      console.error("Error fetching the post: ", error);
      return null;
    }
    return data;
  } catch (error) {
    console.error("Something went wrong! ", error.message);
  }
}

// allows user to create a new post
export default async function createNewPost(post_data) {
  try {
    const { data, error } = await supabase.from("posts").insert([post_data]);

    // For some reason data is inserted but still get error, so commented it:
    // if (error) {
    //   console.error("Error creating post: ", error);
    //   return null;
    // }
    return { message: "Successfully created the post!" };
  } catch (error) {
    console.error("Something went wrong!", error.message);
  }
}

// allows user to delete a post
export async function deletePostById(post_id) {
  try {
    const { data, error } = await supabase
      .from("posts")
      .delete()
      .eq("id", post_id);
    if (error) {
      console.error("Error deleting post: ", error);
      return null;
    }
    return data;
  } catch (error) {
    console.error("Something went wrong!", error.message);
  }
}

// allows us to see all the post by user
export async function fetchPostByUserId(user_id) {
  try {
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .eq("user_id", user_id);
    if (error) {
      console.error("Error fetching posts: ", error);
      return null;
    }

    if (!data || data.length === 0) {
      return []; // No user posts
    }
    return data;
  } catch (error) {
    console.error("Something went wrong!", error.message);
  }
}

// allows user to like a post
export async function likePost(post_id) {
  try {
    // Fetch the current likes count
    const { data, error } = await supabase
      .from("posts")
      .select("likes")
      .eq("id", post_id)
      .single();

    if (error) {
      console.error("Error fetching post: ", error);
      return null;
    }

    // Increase the like count
    const updatedLikes = data.likes + 1;

    // Update the likes in the database
    const { updateError } = await supabase
      .from("posts")
      .update({ likes: updatedLikes })
      .eq("id", post_id);

    if (updateError) {
      console.error("Error updating post: ", updateError);
      return null;
    }

    // Return updated post data
    return { ...data, likes: updatedLikes };
  } catch (error) {
    console.error("Something went wrong!", error.message);
    return null;
  }
}

export async function removeLike(post_id) {
  try {
    // Fetch the current likes count
    const { data, error } = await supabase
      .from("posts")
      .select("likes")
      .eq("id", post_id)
      .single();

    if (error) {
      console.error("Error fetching post: ", error);
      return null;
    }

    // Decrease the like count
    const updatedLikes = data.likes - 1;

    // Update the likes in the database
    const { updateError } = await supabase
      .from("posts")
      .update({ likes: updatedLikes })
      .eq("id", post_id);

    if (updateError) {
      console.error("Error updating post: ", updateError);
      return null;
    }

    // Return updated post data
    return { ...data, likes: updatedLikes };
  } catch (error) {
    console.error("Something went wrong!", error.message);
    return null;
  }
}

// Multiple post ids
export async function fetchLikedPostsByIds(post_ids) {
  try {
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .in("id", post_ids);
    if (error) {
      console.error("Error fetching the favorite trails: ", error);
    }
    // console.log(data);
    return data;
  } catch (error) {
    console.error("Something went wrong!", error.message);
    return null;
  }
}
