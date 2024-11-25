import { SignUp } from "@clerk/nextjs";
import leavesImage from "../../../public/assets/leaves.jpg";
import Image from "next/image";
import Link from "next/link";

export default function Page() {
  return (
    <div className="flex h-screen">
      {/* Left Image Side */}
      <div className="w-1/2 overflow-hidden">
        <Image
          src={leavesImage}
          alt="Shopping bag"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right Form Side */}
      <div className="w-1/2 flex flex-col justify-center items-center p-8">
        <SignUp />
      </div>
    </div>
  );
}
