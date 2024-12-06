import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-green-700 text-white py-4 shadow-md fixed top-0 left-0 w-full z-50">
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
        </ul>
      </div>
    </nav>
  );
}