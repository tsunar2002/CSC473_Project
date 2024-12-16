import dotenv from "dotenv";

dotenv.config();

const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;

async function getWeatherDetails(location) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}&units=imperial`
    );

    if (!response.ok) {
      throw new Error("Error fetching weather details!");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Something went wrong!", error.message);
  }
}

export default getWeatherDetails;
