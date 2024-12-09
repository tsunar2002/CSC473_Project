import Link from 'next/link';
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';

export default function Navbar() {
  return (
    <nav className="bg-black text-white py-4 shadow-md top-0 left-0 w-full z-50">
      <div className="container mx-auto">
        <ul className="flex justify-center space-x-16 text-lg font-medium">
          <li>
            <Link href="/" className="hover:text-indigo-400 transition duration-200">
              Home
            </Link>
          </li>
          <li>
            <Link href="/feed" className="hover:text-indigo-400 transition duration-200">
              Feed
            </Link>
          </li>
          <li>
            <Link href="/favorites" className="hover:text-indigo-400 transition duration-200">
              Favorites
            </Link>
          </li>
          <li>
            <Link href="/user-profile" className="hover:text-indigo-400 transition duration-200">
              Manage Profile
            </Link>
          </li>
          <SignedOut>
            <button className="absolute right-10 inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
              <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
              <span className="inline-flex h-full w-28 cursor-pointer items-center justify-center rounded-full bg-slate-950 text-sm font-medium text-white backdrop-blur-3xl">
                <Link href="./sign-in">Sign In</Link>
              </span>
            </button>
          </SignedOut>
          <SignedIn>
            <div className="absolute right-10 inline-flex h-12 overflow-hidden">
              <UserButton />
            </div>

          </SignedIn>
        </ul>
      </div>
    </nav>
  );
}