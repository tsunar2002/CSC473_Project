"use client";
import { TrailsCard } from "@/components/TrailsCard/TrailsCard";
import { useEffect, useState } from "react";
import { SearchBar } from "@/components/SearchBar/SearchBar";
import { SparklesBackground } from "@/components/SparklesBackground/SparklesBackground";
import { TrailModal } from "@/components/TrailModal/TrailModal";
import Link from "next/link";
import {
  fetchAllTrails,
  fetchTrailsByLocation,
} from "@/controllers/trailsController";
import { useAuth, useUser } from "@clerk/nextjs";

interface Trail {
  id: string;
  trail_name: string;
  length_miles: number;
  difficulty: string;
  location: string;
  description: string;
  image_url: string;
}

export default function Home() {
  // Get userId
  const { userId } = useAuth();

  const [location, setLocation] = useState("");
  const [trails, setTrails] = useState<Trail[]>([]);
  const [allTrails, setAllTrails] = useState<Trail[]>([]);
  const [landingPageTrails, setLandingPageTrails] = useState<Trail[]>([]);

  useEffect(() => {
    async function getAllTrails() {
      const allTrails = await fetchAllTrails();
      if (allTrails && Array.isArray(allTrails)) {
        setAllTrails(allTrails);
      }
    }
    getAllTrails();
  }, []);

  useEffect(() => {
    if (allTrails.length > 0) {
      setLandingPageTrails(allTrails);
    }
  }, [allTrails]);

  // Function to get the state from input
  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setLocation(event.target.value.toLowerCase());
  }

  // Function to handle Search
  async function handleSearchButton() {
    if (!location) {
      alert("Please type in a city name!");
      return;
    }

    const filteredTrailsByLocation = await fetchTrailsByLocation(location);
    if (filteredTrailsByLocation && Array.isArray(filteredTrailsByLocation)) {
      setTrails(filteredTrailsByLocation);
    }
  }

  return (
    <>
      <SparklesBackground />
      <div>
        <SearchBar onSubmit={handleSearchButton} onChange={handleInputChange} />
      </div>
      <div className="flex flex-col items-center text-center">
        <h2 className="sm:mb-20 text-lg text-left sm:text-3xl dark:text-white text-black">
          Check out some trails below!!
        </h2>
        <div className="flex flex-wrap gap-10 justify-center">
          {trails.length > 0
            ? trails.map((trail) => (
                <TrailsCard
                  key={trail.id}
                  id={trail.id}
                  trail_name={trail.trail_name}
                  length={trail.length_miles}
                  difficulty={trail.difficulty}
                  location={trail.location}
                  description={trail.description}
                  image_url={trail.image_url}
                />
              ))
            : landingPageTrails.map((trail) => (
                <TrailsCard
                  key={trail.id}
                  id={trail.id}
                  trail_name={trail.trail_name}
                  length={trail.length_miles}
                  difficulty={trail.difficulty}
                  location={trail.location}
                  description={trail.description}
                  image_url={trail.image_url}
                />
              ))}
        </div>
      </div>
      {/* <TrailModal /> */}
      <div className="flex justify-center m-5">
        <button className="w-56 h-20 bg-slate-400 rounded">
          <Link href="./user-profile">Profile Page</Link>
        </button>
      </div>
    </>
  );
}
