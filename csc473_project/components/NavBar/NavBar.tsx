"use client";
import Link from "next/link";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { useState } from "react";
import { motion } from "framer-motion";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-black text-white py-4 shadow-md top-0 left-0 w-full z-50">
      <div className="relative mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div>
            <Link href="/" className="text-2xl font-bold hover:text-indigo-400">
              TrailTales
            </Link>
          </div>

          {/* Hamburger Menu Button */}
          <div className="lg:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <svg
                width="24px"
                height="24px"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M1.5 3C1.22386 3 1 3.22386 1 3.5C1 3.77614 1.22386 4 1.5 4H13.5C13.7761 4 14 3.77614 14 3.5C14 3.22386 13.7761 3 13.5 3H1.5ZM1 7.5C1 7.22386 1.22386 7 1.5 7H13.5C13.7761 7 14 7.22386 14 7.5C14 7.77614 13.7761 8 13.5 8H1.5C1.22386 8 1 7.77614 1 7.5ZM1 11.5C1 11.2239 1.22386 11 1.5 11H13.5C13.7761 11 14 11.2239 14 11.5C14 11.7761 13.7761 12 13.5 12H1.5C1.22386 12 1 11.77614 1 11.5Z"
                  fill="#ffffff"
                />
              </svg>
            </button>
          </div>

          {/* Desktop Menu */}
          <ul className="hidden lg:flex justify-center space-x-8 text-lg font-medium items-center">
            <li>
              <Link
                href="/"
                className="hover:text-indigo-400 transition duration-200"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/feed"
                className="hover:text-indigo-400 transition duration-200"
              >
                Feed
              </Link>
            </li>
            <li>
              <Link
                href="/favorites"
                className="hover:text-indigo-400 transition duration-200"
              >
                Favorites
              </Link>
            </li>
            <li>
              <Link
                href="/user-profile"
                className="hover:text-indigo-400 transition duration-200"
              >
                Profile
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="hover:text-indigo-400 transition duration-200"
              >
                About
              </Link>
            </li>
          </ul>

          {/* Authentication Buttons */}
          <div className="hidden lg:flex items-center">
            <SignedOut>
              <button className="absolute top-1/2 right-10 transform -translate-y-1/2 inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
                <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                <span className="inline-flex h-full w-28 cursor-pointer items-center justify-center rounded-full bg-slate-950 text-sm font-medium text-white backdrop-blur-3xl hover:bg-indigo-500 transition duration-300 ease-in-out">
                  <Link href="./sign-in" className="text-base">
                    Sign In
                  </Link>
                </span>
              </button>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </div>

        {/* Mobile Dropdown Menu with Animation */}
        {menuOpen && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            className="overflow-hidden"
          >
            <ul className="lg:hidden mt-4 space-y-4 text-lg font-medium text-right ml-auto">
              <li>
                <Link
                  href="/"
                  className="block hover:text-indigo-400 transition duration-200"
                  onClick={() => setMenuOpen(false)}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/feed"
                  className="block hover:text-indigo-400 transition duration-200"
                  onClick={() => setMenuOpen(false)}
                >
                  Feed
                </Link>
              </li>
              <li>
                <Link
                  href="/favorites"
                  className="block hover:text-indigo-400 transition duration-200"
                  onClick={() => setMenuOpen(false)}
                >
                  Favorites
                </Link>
              </li>
              <li>
                <Link
                  href="/user-profile"
                  className="block hover:text-indigo-400 transition duration-200"
                  onClick={() => setMenuOpen(false)}
                >
                  Profile
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="block hover:text-indigo-400 transition duration-200"
                  onClick={() => setMenuOpen(false)}
                >
                  About
                </Link>
              </li>
              <li>
                <SignedOut>
                  <Link
                    className="text-center h-10 px-4 rounded-full bg-indigo-500
                  text-white hover:bg-indigo-600 transition duration-300 flex
                  items-center justify-center"
                    href="/sign-in"
                    onClick={() => setMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                </SignedOut>

                <SignedIn>
                  <div className="flex justify-end">
                    <UserButton />
                  </div>
                </SignedIn>
              </li>
            </ul>
          </motion.div>
        )}
      </div>
    </nav>
  );
}
