"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { fetchTrailById } from "@/controllers/trailsController";
import WeatherCard from "@/components/weathercard/WeatherCard";

interface TrailInfo {
  trail_name: string;
  location: string;
  difficulty: string;
  length_miles: number;
  description: string;
  image_url: string;
  long_description: string;
}

const TrailDetailPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const [trailId, setTrailId] = useState<string | null>(null);
  const [trailInfo, setTrailInfo] = useState<TrailInfo | null>(null);

  useEffect(() => {
    const resolveParams = async () => {
      const resolvedParams = await params;
      setTrailId(resolvedParams.id);
    };

    resolveParams();
  }, [params]);

  useEffect(() => {
    if (trailId) {
      const fetchTrail = async () => {
        try {
          const data = await fetchTrailById(trailId);
          setTrailInfo(data);
        } catch (error) {
          console.error("Error fetching trail details:", error);
        }
      };

      fetchTrail();
    }
  }, [trailId]);

  if (!trailInfo) {
    return (
      <div className="container mx-auto p-6 text-center">
        <h1 className="text-2xl font-bold">Trail not found</h1>
        <p className="text-gray-700">Please check the trail ID and try again.</p>
      </div>
    );
  }

  const { trail_name, location, difficulty, length_miles, description, image_url, long_description } = trailInfo;

  return (
    <div className="container mx-auto p-6 space-y-8">
      {/* Hero Section */}
      <div className="relative h-96">
        {image_url ? (
          <img
            src={image_url}
            alt={`Image of ${trail_name}`}
            className="w-full h-full object-cover rounded-lg shadow-md"
          />
        ) : (
          <div className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-600 rounded-lg">
            No Image Available
          </div>
        )}
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-center p-4">
          <h1 className="text-4xl font-bold text-white">{trail_name}</h1>
          <p className="text-lg text-gray-300 mt-2">{location}</p>
        </div>
      </div>

      {/* Trail Stats */}
      <div className="flex flex-wrap gap-4 justify-center text-center">
        <div className="bg-white shadow-md rounded-lg p-4 w-40">
          <p className="text-lg font-semibold text-gray-800">Difficulty</p>
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
          <p className="text-lg font-semibold text-gray-800">Location</p>
          <span className="block mt-2 px-3 py-1 bg-gray-100 text-gray-800 rounded-full font-semibold">
            {location}
          </span>
        </div>
      </div>

      {/* Description Section */}
      <div className="bg-gray-50 shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Description</h2>
        <p className="text-gray-700 leading-relaxed">{description}</p>
      </div>

      {long_description && (
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Trail Details</h2>
          <p className="text-gray-700 leading-relaxed">{long_description}</p>
        </div>
      )}

      {/* Weather Card */}
      <WeatherCard location={location} />

      {/* Navigation Buttons */}
      <div className="flex justify-center gap-4 mt-6">
        <Link
          href="/feed"
          className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
        >
          Feed
        </Link>
        <Link
          href="/"
          className="px-6 py-2 bg-gray-500 text-white font-semibold rounded-lg shadow-md hover:bg-gray-600 transition duration-300"
        >
          Home
        </Link>
      </div>
    </div>
  );
};

export default TrailDetailPage;
