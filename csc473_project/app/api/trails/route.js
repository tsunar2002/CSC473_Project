import { getAllTrails } from "../../../models/trails";

export async function GET(req) {
  try {
    // Fetch all trails using your helper function
    const trails = await getAllTrails(); // Fetch the data

    if (trails.length > 0) {
      return new Response(JSON.stringify(trails), {
        status: 200,
      });
    } else {
      return new Response(JSON.stringify({ error: "No trails found" }), {
        status: 404,
      });
    }
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Failed to retrieve trails" }),
      { status: 500 }
    );
  }
}
