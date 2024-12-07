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
  difficulty = "Not enough info",
  location = "Location",
  description = "",
  image_url = "https://images.unsplash.com/photo-1507041957456-9c397ce39c97?q=80&w=3456&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
}: TrailsCardProps) {
  return (
    <CardContainer className="inter-var">
      <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[20rem] h-auto rounded-xl p-6 border  ">
        <CardItem translateZ="50" className="w-full mt-4">
          <Image
            src={image_url}
            height= "1000"
            width= "1000"
            className="h-50 w-full object-cover rounded-xl group-hover/card:shadow-xl"
            alt="thumbnail"
          />
        </CardItem>
        <CardItem
          translateZ="50"
          className="text-xl font-bold text-neutral-600 dark:text-white"
        >
          {trail_name}
        </CardItem>
      </CardBody>
    </CardContainer>
  );
}
