import { supabase } from "../lib/supabase.js";

const trail_data = [
  {
    trail_name: "Mountain Peak Trail",
    location: "Colorado",
    difficulty: "Moderate",
    description: "A moderate trail with scenic views.",
    image_url:
      "https://beautifulwashington.com/images/pinnacle-peak-trail-paradise-area-mt-rainier/pinnacle-peak-trail-10.jpg",
    length_miles: 6.5,
    long_description:
      "Mountain Peak Trail is a beautiful and moderately challenging trail located in the heart of Colorado. The trail offers panoramic views of the surrounding mountains, wildlife sightings, and scenic spots perfect for photography. Expect to encounter some rocky areas and moderate elevation gain. It’s best suited for intermediate hikers. Be sure to bring plenty of water and wear sturdy shoes, as parts of the trail can be slippery during rainy weather.",
  },
  {
    trail_name: "Mountain Peak Trail",
    location: "Colorado",
    difficulty: "Moderate",
    description: "A moderate trail with scenic views.",
    image_url:
      "https://beautifulwashington.com/images/pinnacle-peak-trail-paradise-area-mt-rainier/pinnacle-peak-trail-10.jpg",
    length_miles: 6.5,
    long_description:
      "Mountain Peak Trail is a beautiful and moderately challenging trail located in the heart of Colorado. The trail offers panoramic views of the surrounding mountains, wildlife sightings, and scenic spots perfect for photography. Expect to encounter some rocky areas and moderate elevation gain. It’s best suited for intermediate hikers. Be sure to bring plenty of water and wear sturdy shoes, as parts of the trail can be slippery during rainy weather.",
  },
];

export async function fetchTrailsByLocation(location) {
  try {
    const { data, error } = await supabase
      .from("trails")
      .select("*")
      .eq("location", location);

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

// TODO: Add pagination logic to fetch only some trails from the table.
export async function fetchAllTrails(page = 1, pageSize = 10) {
  try {
    // Calculate the range to fetch
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;

    // Fetch trails using range for pagination
    const { data, error } = await supabase
      .from("trails")
      .select("*")
      .range(from, to); // Limit the number of records returned

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
