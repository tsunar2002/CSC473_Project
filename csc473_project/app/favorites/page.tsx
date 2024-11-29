"use client"
import React from "react";
import { useEffect, useState } from "react";
import NavBar from "@/components/NavBar/NavBar"
import { TrailsCard } from "@/components/TrailsCard/TrailsCard";
import { fetchTrailsByUserId } from "@/controllers/usersController";
import { useAuth, UserProfile, useUser } from "@clerk/nextjs";

interface Trail {
  id: string;
  trail_name: string;
  length_miles: number;
  difficulty: string;
  location: string;
  description: string;
  image_url: string;
}

const FavoritesPage = () => {
  const { user } = useUser();
  const [favTrails, setFavTrails] = useState<Trail[]>([]);

  const userId = user?.id;
  

  useEffect(() => {
    async function getFavTrails() {
      const favTrails = await fetchTrailsByUserId(userId);
      if (favTrails && Array.isArray(favTrails))
        setFavTrails(favTrails);
    }
    getFavTrails();
  }, []);


  return (
    <>
      <NavBar />
      <div className="flex flex-col items-center text-left">
        <h2 className="sm:mb-20 text-lg text-left sm:text-3xl dark:text-white text-black">
          Here are your favorites!
        </h2>
        <div className="flex flex-wrap gap-10 justify-center">
          {favTrails.map((trail) => (
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
    </>
  );
};

export default FavoritesPage;
