import { SignUp } from "@clerk/nextjs";
import authImage from "../../../public/assets/authbg1.jpg";
import Image from "next/image";

export default function Page() {
  return (
    <div>
      {/* Desktop Layout */}
      <div className="hidden lg:flex h-screen">
        {/* Left Image Side */}
        <div className="w-1/2 overflow-hidden">
          <Image
            src={authImage}
            alt="Shopping bag"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Form Side */}
        <div className="w-1/2 flex flex-col justify-center items-center p-8">
          <SignUp />
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden relative min-h-screen bg-gray-50 text-gray-900 flex items-center justify-center py-12 px-6">
        {/* Mount Everest Image as Background */}
        <div className="absolute inset-0 z-0">
          <Image
            src={authImage}
            alt="mountain-background"
            fill={true}
            quality={100}
          />
        </div>
        <SignUp />
      </div>
    </div>
  );
}
