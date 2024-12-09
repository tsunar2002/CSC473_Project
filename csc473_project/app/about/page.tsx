import Link from "next/link";
import React from "react";
import Image from "next/image";
import mounteverest from "../../public/assets/mounteverest.jpg";
import Navbar from "@/components/NavBar/NavBar";

const AboutPage = () => {
  return (
    <>
      <Navbar />
      <div className="relative min-h-screen bg-gray-50 text-gray-900 flex items-center justify-center py-12 px-6">
        {/* Mount Everest Image as Background */}
        <div className="absolute inset-0 z-0">
          <Image
            src={mounteverest}
            alt="mountain-background"
            fill={true}
            quality={100}
          />
        </div>

        {/* About Section */}
        <div className="relative z-10 max-w-4xl mx-auto bg-white shadow-2xl shadow-gray-400 rounded-xl p-8">
          <header className="text-center py-4">
            <h1 className="text-4xl font-semibold text-gray-800">
              About TrailTales
            </h1>
          </header>
          <main className="mt-6 text-gray-700">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Welcome to TrailTales!
            </h2>
            <p className="leading-relaxed mb-6">
              TrailTales is a platform designed for hiking enthusiasts to
              discover trails, share their experiences, and connect with a
              community of nature lovers. Whether you're an experienced hiker or
              just getting started, our app helps you explore new paths and
              document your adventures.
            </p>

            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Key Features
            </h2>
            <ul className="list-disc list-inside space-y-3">
              <li>
                <strong className="text-gray-900">Explore Trails:</strong> Find
                hiking spots based on difficulty and scenic appeal.
              </li>
              <li>
                <strong className="text-gray-900">Share Stories:</strong> Post
                your hiking experiences and photos for others to enjoy.
              </li>
              <li>
                <strong className="text-gray-900">Connect with Hikers:</strong>{" "}
                See what others are saying about trails and learn from their
                tips.
              </li>
            </ul>

            <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4">
              Why We Built This
            </h2>
            <p className="leading-relaxed mb-6">
              TrailTales was created as a project to combine our love for hiking
              with technology. It’s designed to help hikers share their passion
              and make outdoor adventures more accessible and enjoyable.
            </p>

            <p className="text-center">
              <Link
                href="/"
                className="inline-block bg-gray-800 text-white py-2 px-4 rounded-lg font-medium shadow-lg hover:bg-black transition-all transform hover:scale-105 duration-300 ease-in-out"
              >
                Start Exploring Trails →
              </Link>
            </p>
          </main>
        </div>
      </div>
    </>
  );
};

export default AboutPage;
