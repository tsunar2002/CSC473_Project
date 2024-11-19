import { getAllUsers } from "../../../models/users";

export async function GET(req) {
  try {
    const users = await getAllUsers();

    // Check if users array is not empty
    if (users && users.length > 0) {
      return new Response(JSON.stringify(users), {
        status: 200,
      });
    } else {
      return new Response(JSON.stringify({ error: "No users found" }), {
        status: 404,
      });
    }
  } catch (error) {
    console.error("Error fetching users:", error); // Log the error for debugging
    return new Response(JSON.stringify({ error: "Failed to retrieve users" }), {
      status: 500,
    });
  }
}
