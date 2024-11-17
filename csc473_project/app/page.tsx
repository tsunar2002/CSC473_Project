"use client";
import { TrailsCard } from "@/components/TrailsCard/TrailsCard";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import trailLogo from "../public/assets/TrailLogo.png";
import { useEffect, useState } from "react";
import fetchTrails from "@/controllers/trailsData";

interface Trail {
  id: string;
  name: string;
  difficulty: string;
  city: string;
  rating: string;
  thumbURL: string;
}

export default function Home() {
  const [city, setCity] = useState("");
  const [trails, setTrails] = useState<Trail[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    async function getTrailsData() {
      const trailsData = await fetchTrails("Albuquerque");
      setTrails(trailsData.trails.slice(0, 4));
    }

    getTrailsData();
  }, []);

  // Function to get the city from input
  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setCity(event.target.value);
  }

  // Function to handle Search
  async function handleSearchButton() {
    if (!city) {
      setError("Please type in a city name!");
      return;
    }

    const data = await fetchTrails(city);
    if (!data) {
      setError(
        "We do not have info about hiking spots in that location in our database!"
      );
      return;
    }
    // For now only getting 4 results beacuse of UI problems.
    setTrails(data.trails.slice(0, 4));
    setError("");
  }

  return (
    <>
      <div className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
        <a className="flex lg:flex-1 items-center gap-3">
          <Image src={trailLogo} height="60" width="60" alt="" />
          <span className="text-lg font-bold">TrailTales</span>
        </a>

        <div className="lg:flex justify-center">
          <Input
            id="trailSearch"
            placeholder="Search For Trails"
            type="text"
            className=""
            onChange={handleInputChange}
          />
          <button
            className="ml-4 px-6 py-2 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all"
            onClick={handleSearchButton}
          >
            SEARCH
          </button>
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <a className="text-sm/6 font-semibold text-gray-900">Log in</a>
        </div>
      </div>

      <div className="flex flex-col items-center text-center">
        <div className="flex gap-10 justify-center">
          {trails.map((trail) => (
            <TrailsCard
              key={trail.id}
              trailName={trail.name}
              difficultyScore={trail.difficulty}
              cityName={trail.city}
              rating={trail.rating}
              imageURL={trail.thumbURL}
            />
          ))}
        </div>
      </div>
    </>
  );
}
