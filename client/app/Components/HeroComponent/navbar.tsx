'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { AiOutlineMenu, AiOutlineClose, AiFillSmile } from 'react-icons/ai'; // Import smile icon

const NavbarComponent: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <header className="bg-gray-900 text-white fixed w-full shadow-lg z-50">
        <div className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">
          {/* Brand Logo with Smile Icon */}
          <h1 className="text-2xl font-bold flex items-center space-x-2">
            <AiFillSmile size={24} className="text-yellow-400" /> {/* Smiley icon */}
            <Link href="/" className="hover:text-yellow-400">
              Asyrof
            </Link>
          </h1>

          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <ul className="flex space-x-6">
              <li>
                <a href="#hero-stack" className="hover:text-yellow-400">
                  Home
                </a>
              </li>
              <li>
                <a href="#projects" className="hover:text-yellow-400">
                  Projects
                </a>
              </li>
              <li>
                <a href="#article" className="hover:text-yellow-400">
                  Articles
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-yellow-400">
                  Contact
                </a>
              </li>
            </ul>{' '}
            {/* Closing the <ul> */}
          </nav>

          {/* Mobile Navigation Button */}
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden focus:outline-none">
            {isMenuOpen ? (
              <AiOutlineClose size={28} className="text-yellow-400" />
            ) : (
              <AiOutlineMenu size={28} className="text-yellow-400" />
            )}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <nav className="bg-gray-800 text-white md:hidden">
            <ul className="flex flex-col space-y-4 px-6 py-4">
              <li>
                <a href="#hero-stack" onClick={() => setIsMenuOpen(false)}>
                  Home
                </a>
              </li>
              <li>
                <a href="#projects" onClick={() => setIsMenuOpen(false)}>
                  Projects
                </a>
              </li>
              <li>
                <a href="#article" onClick={() => setIsMenuOpen(false)}>
                  Articles
                </a>
              </li>
              <li>
                <a href="#contact" onClick={() => setIsMenuOpen(false)}>
                  Contact
                </a>
              </li>
            </ul>
          </nav>
        )}
      </header>

      {/* Add a spacer for fixed navbar */}
      <div className="h-16 md:h-20"></div>

      {/* Rest of the page */}
    </>
  );
};

export default NavbarComponent;
