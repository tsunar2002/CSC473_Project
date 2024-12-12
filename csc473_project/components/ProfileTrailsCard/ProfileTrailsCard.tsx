"use client";

import Image from "next/image";
import React from "react";
import { CardBody, CardContainer, CardItem } from "../ui/3d-card";
import Link from "next/link";

interface TrailsCardProps {
  id?: string;
  trail_name?: string;
  length: number | string;
  difficulty?: string;
  location?: string;
  description?: string;
  image_url?: string;
}

export function ProfileTrailsCard({
  id,
  trail_name = "TrailName",
  length = "N/A",
  difficulty,
  location,
  description,
  image_url,
}: TrailsCardProps) {
  return (
    <CardContainer className="inter-var w-full">
      <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-full h-auto rounded-xl p-6 border flex flex-row justify-between items-center">
        <CardItem
          className="text-xl font-bold dark:text-white text-left"
        >
          {trail_name}
        </CardItem>
        <div className="flex justify-between">
          <CardItem
            as="button"
            className="className=inline-block bg-gray-800 text-white py-2 px-4 rounded-lg font-medium shadow-lg hover:bg-black transition-all transform hover:scale-105 duration-300 ease-in-out"
          >
            <Link href={`traildetail/${id}`}>View</Link>
          </CardItem>
        </div>
      </CardBody>
    </CardContainer>
  );
}

