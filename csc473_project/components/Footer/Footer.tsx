import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-200 p-6 mt-6">
      <div className="container mx-auto text-center">
        <p>
          &copy; {new Date().getFullYear()} TrailTails. All rights reserved.
        </p>
        <div className="mt-4 space-x-4">
          <Link href="/" className="hover:text-white">
            Home
          </Link>
          <Link href="/feed" className="hover:text-white">
            Feed
          </Link>
          <Link href="/about" className="hover:text-white">
            About
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
