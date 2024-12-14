"use client";
import { TrailsCard } from "@/components/TrailsCard/TrailsCard";
import { useEffect, useState } from "react";
import { SearchBar } from "@/components/SearchBar/SearchBar";
import { SparklesBackground } from "@/components/SparklesBackground/SparklesBackground";
import {
  fetchAllTrails,
  fetchTrailsByLocation,
} from "@/controllers/trailsController";
import { useUser } from "@clerk/nextjs";
import NavBar from "@/components/NavBar/NavBar";
import { addUser, fetchAllUsers } from "@/controllers/usersController";
import Footer from "@/components/Footer/Footer";

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
  const { user } = useUser();
  const userId = user?.id;

  const [location, setLocation] = useState("");
  const [trails, setTrails] = useState<Trail[]>([]);
  const [landingPageTrails, setLandingPageTrails] = useState<Trail[]>([]);

  // Add user to the database if logged in
  useEffect(() => {
    async function handleAddUser() {
      try {
        if (userId) {
          await addUser(userId);
        }
      } catch (error) {
        console.error("Error adding user:", error);
      }
    }
    handleAddUser();
  }, [userId]);

  // Fetch all trails and populate landing page
  useEffect(() => {
    async function getAllTrails() {
      try {
        const allTrails = await fetchAllTrails();
        if (Array.isArray(allTrails)) {
          setLandingPageTrails(allTrails.slice(0, 8));
        }
      } catch (error) {
        console.error("Error fetching trails:", error);
      }
    }
    getAllTrails();
  }, []);

  // Handle location input
  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setLocation(event.target.value.toLowerCase());
  }

  // Handle search button click
  async function handleSearchButton() {
    if (!location) {
      alert("Please type in a city name!");
      return;
    }

    try {
      const filteredTrails = await fetchTrailsByLocation(location);
      if (Array.isArray(filteredTrails) && filteredTrails.length > 0) {
        setTrails(filteredTrails);
      } else {
        alert("We currently do on know about that trail yet!!");
      }
    } catch (error) {
      console.error("Error fetching trails by location:", error);
    }
  }

  // Determine trails to display
  const displayedTrails = trails.length > 0 ? trails : landingPageTrails;

  return (
    <>
      <NavBar />
      <SparklesBackground />
      <div>
        <SearchBar onSubmit={handleSearchButton} onChange={handleInputChange} />
      </div>
      <div className="flex flex-col items-center">
        <h2 className="sm:mb-20 text-lg sm:text-3xl dark:text-white text-black">
          Check out some trails below!!
        </h2>
        <div className="flex flex-wrap gap-10 justify-center">
          {displayedTrails.map((trail) => (
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
      <div className="mt-40">
        <Footer />
      </div>
    </>
  );
}
