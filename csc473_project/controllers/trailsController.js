import { supabase } from "../lib/supabase.js";

export async function fetchTrailsByLocation(location) {
  try {
    const { data, error } = await supabase
      .from("trails")
      .select("*")
      .or(`location.ilike.%${location}%,trail_name.ilike.%${location}%`);

    if (error) {
      console.error("Error fetching trails: ", error);
    }
    return data;
  } catch (error) {
    console.error("Something went wrong!", error.message);
    return null;
  }
}

export async function fetchTrailById(trail_id) {
  try {
    const { data, error } = await supabase
      .from("trails")
      .select("*")
      .eq("id", trail_id)
      .single();
    if (error) {
      console.error("Error fetching the trail: ", error);
    }
    return data;
  } catch (error) {
    console.error("Something went wrong!", error.message);
    return null;
  }
}

// Multiple Trail IDs
export async function fetchTrailsByIds(trail_ids) {
  try {
    const { data, error } = await supabase
      .from("trails")
      .select("*")
      .in("id", trail_ids);
    if (error) {
      console.error("Error fetching the favorite trails: ", error);
    }

    return data;
  } catch (error) {
    console.error("Something went wrong!", error.message);
    return null;
  }
}

export async function addTrails(trail_data) {
  try {
    const { data, error } = await supabase.from("trails").insert(trail_data);
    if (error) {
      console.error("Failed to insert trail data!", error);
    }
    return data;
  } catch (error) {
    console.error("Something went wrong!", error.message);
    return null;
  }
}

export async function fetchAllTrails(page = 1, pageSize = 10) {
  try {
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;

    // Fetch trails using range for pagination
    const { data, error } = await supabase
      .from("trails")
      .select("*")
      .range(from, to);

    if (error) {
      console.error("Error fetching trails: ", error);
      return null;
    }

    return data;
  } catch (error) {
    console.error("Something went wrong!", error.message);
    return null;
  }
}
