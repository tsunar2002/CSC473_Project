import clientPromise from "../lib/db.js";

// const { clientPromise } = require("../lib/db");

const trailData = {
  trailName: "Mountain Peak Trail",
  location: "Colorado",
  difficulty: "Moderate",
  description: "A moderate trail with scenic views.",
  imageURL:
    "https://beautifulwashington.com/images/pinnacle-peak-trail-paradise-area-mt-rainier/pinnacle-peak-trail-10.jpg",
  lengthMiles: 6.5,
  longDescription:
    "Mountain Peak Trail is a beautiful and moderately challenging trail located in the heart of Colorado. The trail offers panoramic views of the surrounding mountains, wildlife sightings, and scenic spots perfect for photography. Expect to encounter some rocky areas and moderate elevation gain. It’s best suited for intermediate hikers. Be sure to bring plenty of water and wear sturdy shoes, as parts of the trail can be slippery during rainy weather.",
};

async function getTrailsCollection() {
  const client = await clientPromise;
  const db = client.db("TrailTales");
  return db.collection("trails");
}

export async function addTrail(trailData) {
  const trailsCollection = await getTrailsCollection();
  const result = await trailsCollection.insertOne(trailData);
  return result;
}

export async function fetchAllTrails() {
  const trailsCollection = await getTrailsCollection();
  const allTrails = await trailsCollection.find().toArray();
  return allTrails;
}

export async function fetchTrailsByLocation(location) {
  const trailsCollection = await getTrailsCollection();
  const trails = await trailsCollection.find({ location }).toArray();
  return trails;
}
