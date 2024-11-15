import { TrailsCard } from "@/components/TrailsCard/TrailsCard";

export default function Home() {
  return (
    <div className="flex flex-col items-center text-center">
      <h1 className="text-4xl font-bold mt-10 mb-4">
        TrailTales
      </h1>
      <div className="flex gap-4 justify-center">
        <TrailsCard />
        <TrailsCard />
        <TrailsCard />
        <TrailsCard />
      </div>
      <div className="flex gap-4 justify-center">
        <TrailsCard />
        <TrailsCard />
        <TrailsCard />
        <TrailsCard />
      </div>
    </div>
  );
}
