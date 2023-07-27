import React,{ useState } from 'react';
import Link from 'next/link'
const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prevIsOpen) => !prevIsOpen);
  };

  return (
    <nav className="bg-light-1  dark:bg-midnight py-4 ">
      <div className="container mx-auto flex justify-between items-center px-4">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold dark:text-white">
          MuseBox
        </Link>

        {/* Navbar Items (hidden on mobile) */}
        <div className="hidden md:flex space-x-10">
          <Link href="/" className="hover:text-gray-200 dark:text-white">
            Home
          </Link>
          <Link href="/about" className=" hover:text-gray-200 dark:text-white">
            About
          </Link>
          {/* <Link href="/about" className=" hover:text-gray-200 dark:text-white">
            Services
          </Link>
          <Link href="/about" className=" hover:text-gray-200 dark:text-white">
            Contact
          </Link> */}
        </div>

        {/* Mobile Menu (Hidden on larger screens) */}
        <div className="md:hidden">
          <button
            className=" focus:outline-none"
            onClick={toggleMobileMenu}
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
        </div>

        {/* Mobile Menu Content */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-16 right-4 bg-gray-800 py-4 px-2 rounded">
            <Link
              href="/"
              className="block  hover:text-gray-200 py-2"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="block  hover:text-gray-200 py-2"
            >
              About
            </Link>
            <Link
              href="/about"
              className="block  hover:text-gray-200 py-2"
            >
              Services
            </Link>
            <Link
              href="/about"
              className="block  hover:text-gray-200 py-2"
            >
              Contact
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
