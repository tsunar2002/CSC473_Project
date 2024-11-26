"use client";
import { TrailsCard } from "@/components/TrailsCard/TrailsCard";
import Image from "next/image";
import trailLogo from "../public/assets/TrailLogo.png";
import { useEffect, useState } from "react";
import Link from "next/link";
import { SearchBar } from "@/components/SearchBar/SearchBar";
import { SparklesBackground } from "@/components/SparklesBackground/SparklesBackground";
import { TrailModal } from "@/components/TrailModal/TrailModal";
import { fetchAllTrails } from "@/controllers/trailsController";

interface Trail {
  _id: string;
  trailName: string;
  length: string;
  difficulty: string;
  location: string;
  description: string;
  imageURL: string;
}

export default function Home() {
  const [location, setLocation] = useState("");
  const [trails, setTrails] = useState<Trail[]>([]);
  const [allTrails, setAllTrails] = useState<Trail[]>([]);
  const [landingPageTrails, setLandingPageTrails] = useState<Trail[]>([]);

  useEffect(() => {
    async function getAllTrails() {
      const response = await fetch("/api/trails");
      const allTrailsData = await response.json();
      setAllTrails(allTrailsData);
    }
    getAllTrails();
  }, []);

  useEffect(() => {
    if (allTrails.length > 0) {
      setLandingPageTrails(allTrails);
    }
  }, [allTrails]);

  // Function to get the city from input
  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setLocation(event.target.value);
  }

  // Function to handle Search
  async function handleSearchButton() {
    if (!location) {
      alert("Please type in a city name!");
      return;
    }

    const filteredTrails = allTrails.filter((trail) =>
      trail.location.includes(location.toLowerCase())
    );
    setTrails(filteredTrails);
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
                  key={trail._id}
                  trailName={trail.trailName}
                  length={trail.length}
                  difficulty={trail.difficulty}
                  location={trail.location}
                  description={trail.description}
                  imageURL={trail.imageURL}
                />
              ))
            : landingPageTrails.map((trail) => (
                <TrailsCard
                  key={trail._id}
                  trailName={trail.trailName}
                  length={trail.length}
                  difficulty={trail.difficulty}
                  location={trail.location}
                  description={trail.description}
                  imageURL={trail.imageURL}
                />
              ))}
        </div>
      </div>
      <TrailModal />
    </>
  );
}
