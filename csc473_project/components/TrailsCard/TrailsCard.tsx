"use client";

import Image from "next/image";
import React from "react";
import { CardBody, CardContainer, CardItem } from "../ui/3d-card";
import Link from "next/link";
import leavesImage from "../../public/assets/leaves.jpg";

export function TrailsCard() {
  return (
    <CardContainer className="inter-var">
      <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[20rem] h-auto rounded-xl p-6 border  ">
        <CardItem translateZ="100" className="w-full mt-4">
          <Image
            src={leavesImage}
            height="1000"
            width="1000"
            className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
            alt="thumbnail"
          />
        </CardItem>
        <CardItem
          translateZ="50"
          className="text-xl font-bold text-neutral-600 dark:text-white"
        >
          Trail Name
        </CardItem>
        <CardItem
          as="p"
          translateZ="60"
          className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
        >
          Difficulty: Medium
        </CardItem>
        <CardItem
          as="p"
          translateZ="60"
          className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
        >
          Distance: 1.9 mi.
        </CardItem>
        <CardItem
          as="p"
          translateZ="60"
          className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
        >
          Time Estimated: 1 hr. 15 min.
        </CardItem>

        <div className="flex justify-between items-center mt-10">
          <CardItem
            translateZ={20}
            as="button"
            className="px-8 py-3 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
          >
            Explore
          </CardItem>
        </div>

      </CardBody>
    </CardContainer>
  );
}
