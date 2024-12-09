"use client";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import React, { useState } from "react";
import Link from "next/link";

const BookmarkButton = () => {
  const [isBookmarked, setIsBookmarked] = useState(false);

  const handleClick = () => {
    setIsBookmarked(!isBookmarked);
  };

  return (
    <>
      <SignedOut>
        <div className="cursor-pointer inline-block">
          <Link href="/sign-in">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 16 16"
              className="transition-all duration-200 transform hover:scale-110"
            >
              <path
                d="M2 2v13.5a.5.5 0 0 0 .74.439L8 13.069l5.26 2.87A.5.5 0 0 0 14 15.5V2a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2"
                fill="transparent" // Body color
                stroke="white" // Border color
                strokeWidth="1" // Border thickness
              />
            </svg>
          </Link>
        </div>
      </SignedOut>
      <SignedIn>
        <div className="cursor-pointer inline-block" onClick={handleClick}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 16 16"
            className="transition-all duration-200 transform hover:scale-110"
          >
            <path
              d="M2 2v13.5a.5.5 0 0 0 .74.439L8 13.069l5.26 2.87A.5.5 0 0 0 14 15.5V2a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2"
              fill={isBookmarked ? "white" : "transparent"} // Body color
              stroke="white" // Border color
              strokeWidth="1" // Border thickness
            />
          </svg>
        </div>
      </SignedIn>
    </>
  );
};

export default BookmarkButton;
