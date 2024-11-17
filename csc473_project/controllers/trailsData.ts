"use server";

export default async function fetchTrails(city: string) {
  if (!city) {
    throw new Error("Invalid parameter");
  }
  try {
    const URL = `https://prescriptiontrails.org/api/filter/?by=city&city=${city}&offset=0&count=6`;
    const response = await fetch(URL);
    if (!response.ok) {
      throw new Error("error fetching trails data");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("error: ", error);
  }
}
