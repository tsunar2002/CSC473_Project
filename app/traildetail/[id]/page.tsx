"use client";

import React, { useEffect, useState } from "react";
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
    <div className="container mx-auto p-6">
      <div className="bg-white shadow-lg rounded-md p-4 mb-6">
        <h1 className="text-4xl font-bold mb-2">{trail_name}</h1>
        <p className="text-gray-700 text-lg mb-4">
          <strong>Location:</strong> {location}
        </p>
        <div className="flex space-x-4 text-gray-700">
          <p>
            <strong>Difficulty:</strong> {difficulty}
          </p>
          <p>
            <strong>Length:</strong> {length_miles} miles
          </p>
        </div>
      </div>

      {image_url && (
        <div className="mb-6">
          <img src={image_url} alt={trail_name} className="w-full rounded-md shadow-lg" />
        </div>
      )}

      <div className="bg-gray-50 p-4 rounded-md shadow-md mb-6">
        <h2 className="text-2xl font-semibold mb-2">Description</h2>
        <p className="text-gray-800">{description}</p>
      </div>

      {long_description && (
        <div className="bg-gray-100 p-4 rounded-md shadow-md mb-6">
          <h2 className="text-2xl font-semibold mb-2">Details</h2>
          <p className="text-gray-800">{long_description}</p>
        </div>
      )}

      <WeatherCard location={location} />
    </div>
  );
};

export default TrailDetailPage;
