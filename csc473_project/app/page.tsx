"use client";
import { TrailsCard } from "@/components/TrailsCard/TrailsCard";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import trailLogo from "../public/assets/TrailLogo.png";
import { useEffect, useState } from "react";
import fetchTrails from "@/controllers/trailsData";
import Link from "next/link";

interface Trail {
  trailID: string;
  trailName: string;
  length: string;
  difficulty: string;
  location: string;
  description: string;
  image_url: string;
}

export default function Home() {
  const [location, setLocation] = useState("");
  const [trails, setTrails] = useState<Trail[]>([]);
  const [error, setError] = useState("");
  const [allTrails, setAllTrails] = useState<Trail[]>([]);
  const [landingPageTrails, setLandingPageTrails] = useState<Trail[]>([]);

  useEffect(() => {
    async function getAllTrails() {
      const response = await fetch("/api/trails");
      const allTrailsData = await response.json();
      console.log(allTrailsData[0]);
      setAllTrails(allTrailsData);
    }

    getAllTrails();
  }, []);

  useEffect(() => {
    if (allTrails.length > 0) {
      setLandingPageTrails(allTrails.slice(0, 4));
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
          <button className="ml-4 px-6 py-2 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all">
            <Link href="auth/login">Log In</Link>
          </button>
        </div>
      </div>

      <div className="flex flex-col items-center text-center">
        <div className="flex flex-wrap gap-10 justify-center">
          {trails.length > 0
            ? trails.map((trail) => (
                <TrailsCard
                  key={trail.trailID}
                  trailName={trail.trailName}
                  length={trail.length}
                  difficulty={trail.difficulty}
                  location={trail.location}
                  description={trail.description}
                  imageURL={trail.image_url}
                />
              ))
            : landingPageTrails.map((trail) => (
                <TrailsCard
                  key={trail.trailID}
                  trailName={trail.trailName}
                  length={trail.length}
                  difficulty={trail.difficulty}
                  location={trail.location}
                  description={trail.description}
                  imageURL={trail.image_url}
                />
              ))}
        </div>
      </div>
    </>
  );
}
