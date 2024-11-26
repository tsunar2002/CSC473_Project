import React, { useEffect, useState } from "react";
import { fetchTrailById } from "@/controllers/trailsController";
import PostCard from "@/components/PostCard/PostCard";

const TrailDetailPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const trail_id = (await params).id;
  const trailInfo = await fetchTrailById(trail_id);

  return (
    <div>
      TrailDetailPage
      <h1>TODO: Use "trailInfo" to build this page!!</h1>
      <h1>{trailInfo}</h1>
      <h1>Also make a weather card appear below the trail details</h1>
    </div>
  );
};

export default TrailDetailPage;
