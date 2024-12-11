import React from "react";
import { fetchTrailById } from "@/controllers/trailsController";
import WeatherCard from "@/components/WeatherCard/WeatherCard";
import Image from "next/image";
import getWeatherDetails from "@/controllers/weather";
import BookmarkButton from "@/components/BookmarkButton/BookmarkButton";
import { SignedOut, useUser } from "@clerk/nextjs";
import { Link } from "lucide-react";
import Navbar from "@/components/NavBar/NavBar";
import Footer from "@/components/Footer/Footer";

const TrailDetailPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const trail_id = (await params).id;
  const trailInfo = await fetchTrailById(trail_id);
  const {
    trail_name,
    location,
    difficulty,
    length_miles,
    description,
    image_url,
    long_description,
  } = trailInfo;

  const weatherInfo = await getWeatherDetails(trailInfo.location);

  // Extracting relevant fields
  const weatherCardProps = {
    location: weatherInfo.name,
    temperature: weatherInfo.main.temp,
    feelsLike: weatherInfo.main.feels_like,
    humidity: weatherInfo.main.humidity,
    weatherDescription: weatherInfo.weather[0].description,
    windSpeed: weatherInfo.wind.speed,
    icon: weatherInfo.weather[0].icon,
  };

  if (!trailInfo) {
    return (
      <div className="container mx-auto p-6 text-center">
        <h1 className="text-2xl font-bold">Trail not found!</h1>
        <p className="text-gray-700">
          There was a problem getting the trail information 🙁!
        </p>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="flex flex-col min-h-screen">
        <main className="flex-grow container mx-auto p-6 space-y-8">
          {/* Hero Section */}
          <div className="relative h-96">
            {image_url ? (
              <div className="relative w-full h-full">
                <Image
                  src={image_url}
                  alt={`Image of ${trail_name}`}
                  fill={true}
                  quality={100}
                />
              </div>
            ) : (
              <div className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-600 rounded-lg">
                No Image Available
              </div>
            )}
            <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-center p-4">
              <h1 className="text-4xl font-bold text-white">{trail_name}</h1>
              <p className="text-lg text-gray-300 mt-2">{location}</p>
            </div>

            {/* Bookmark Button */}
            <div className="absolute bottom-5 right-8">
              <BookmarkButton trail_id={trail_id} />
            </div>
          </div>

          {/* Main Content Section */}
          <div className="flex flex-col md:flex-row gap-6">
            {/* Left Section: Trail Details and Description */}
            <div className="flex-1 space-y-6">
              {/* Trail Stats */}
              <div className="flex flex-wrap gap-4">
                <div className="bg-white shadow-md rounded-lg p-4 w-40">
                  <p className="text-lg font-semibold text-gray-800">
                    Difficulty
                  </p>
                  <span className="block mt-2 px-3 py-1 bg-green-100 text-green-800 rounded-full font-semibold">
                    {difficulty}
                  </span>
                </div>
                <div className="bg-white shadow-md rounded-lg p-4 w-40">
                  <p className="text-lg font-semibold text-gray-800">Length</p>
                  <span className="block mt-2 px-3 py-1 bg-blue-100 text-blue-800 rounded-full font-semibold">
                    {length_miles} miles
                  </span>
                </div>
                <div className="bg-white shadow-md rounded-lg p-4 w-40">
                  <p className="text-lg font-semibold text-gray-800">
                    Location
                  </p>
                  <span className="block mt-2 px-3 py-1 bg-gray-100 text-gray-800 rounded-full font-semibold">
                    {location}
                  </span>
                </div>
              </div>

              {/* Description Section */}
              <div className="bg-gray-50 shadow-md rounded-lg p-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                  Description
                </h2>
                <p className="text-gray-700 leading-relaxed">{description}</p>
              </div>

              {long_description && (
                <div className="bg-white shadow-md rounded-lg p-6">
                  <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                    Trail Details
                  </h2>
                  <p className="text-gray-700 leading-relaxed">
                    {long_description}
                  </p>
                </div>
              )}
            </div>

            {/* Right Section: Weather Card */}
            <div className="w-full md:w-1/3 flex flex-col">
              <div className="bg-white shadow-md rounded-lg p-6 flex-1 h-full">
                <div className="h-full">
                  <WeatherCard {...weatherCardProps} />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      <Footer />
    </>
  );
};

export default TrailDetailPage;
