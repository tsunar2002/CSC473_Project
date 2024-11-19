"use client";

import { PlaceholdersAndVanishInput } from "../ui/placeholders-and-vanish-input";

interface SearchBarProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export function SearchBar({ onSubmit, onChange }: SearchBarProps) {
  const placeholders = [
    "Find your next adventure...",
    "Looking for a new hiking spot?",
    "Search for the best hiking trails...",
    "Touch grass...",
    "Grass is green",
  ];

  return (
    <div className="h-[20rem] mt-5 flex flex-col justify-center  items-center px-4">
      <h2 className="mb-5 sm:mb-20 text-xl text-center sm:text-5xl dark:text-white text-black">
        Where will be your next adventure?
      </h2>
      <PlaceholdersAndVanishInput
        placeholders={placeholders}
        onChange={onChange}
        onSubmit={onSubmit}
      />
    </div>
  );
}
