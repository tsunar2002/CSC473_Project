import { TrailsCard } from "@/components/TrailsCard/TrailsCard";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import trailLogo from "../public/assets/TrailLogo.png"


export default function Home() {
  return (
    <>
      <div className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
        <a className="flex lg:flex-1 items-center gap-3">
          <Image
            src= {trailLogo}
            height="60"
            width="60"
            alt=""
          />
          <span className="text-lg font-bold">TrailTales</span>
        </a>

        <div className="lg:flex justify-center">
          <Input 
            id="trailSearch" 
            placeholder="Search For Trails" 
            type="text"
            className="" />
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <a className="text-sm/6 font-semibold text-gray-900">Log in</a>
        </div>
      </div>

      <div className="flex flex-col items-center text-center">
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
    </>
  );
}
