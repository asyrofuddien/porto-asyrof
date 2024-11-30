import { SetStateAction, useState } from 'react';
import { AiFillSmile, AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import Link from 'next/link';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('home'); // Default active link is 'home'

  // Function to handle setting active link
  const handleLinkClick = (link: SetStateAction<string>) => {
    setActiveLink(link);
    setIsMenuOpen(false); // Close menu when a link is clicked on mobile
  };

  return (
    <>
      <header className="bg-gray-900 text-white fixed w-full shadow-lg z-50">
        <div className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">
          {/* Brand Logo with Smile Icon */}
          <h1 className="text-2xl font-bold flex items-center space-x-2">
            <AiFillSmile size={24} className="text-yellow-400" /> {/* Smiley icon */}
            <Link
              href="/"
              className={`hover:text-yellow-400 ${activeLink === 'home' ? 'text-yellow-400 border-b-2 border-yellow-400' : ''}`}
              onClick={() => handleLinkClick('home')} // Set active link to 'home' when clicked
            >
              Asyrof
            </Link>
          </h1>

          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <ul className="flex space-x-6">
              <li>
                <a
                  href="#hero-stack"
                  onClick={() => handleLinkClick('home')}
                  className={`hover:text-yellow-400 ${activeLink === 'home' ? 'text-yellow-400 border-b-2 border-yellow-400' : ''}`}
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#projects"
                  onClick={() => handleLinkClick('projects')}
                  className={`hover:text-yellow-400 ${activeLink === 'projects' ? 'text-yellow-400 border-b-2 border-yellow-400' : ''}`}
                >
                  Projects
                </a>
              </li>
              <li>
                <a
                  href="#article"
                  onClick={() => handleLinkClick('article')}
                  className={`hover:text-yellow-400 ${activeLink === 'article' ? 'text-yellow-400 border-b-2 border-yellow-400' : ''}`}
                >
                  Articles
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  onClick={() => handleLinkClick('contact')}
                  className={`hover:text-yellow-400 ${activeLink === 'contact' ? 'text-yellow-400 border-b-2 border-yellow-400' : ''}`}
                >
                  Contact
                </a>
              </li>
            </ul>
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
                <a
                  href="#hero-stack"
                  onClick={() => handleLinkClick('home')}
                  className={`hover:text-yellow-400 ${activeLink === 'home' ? 'text-yellow-400 border-b-2 border-yellow-400' : ''}`}
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#projects"
                  onClick={() => handleLinkClick('projects')}
                  className={`hover:text-yellow-400 ${activeLink === 'projects' ? 'text-yellow-400 border-b-2 border-yellow-400' : ''}`}
                >
                  Projects
                </a>
              </li>
              <li>
                <a
                  href="#article"
                  onClick={() => handleLinkClick('article')}
                  className={`hover:text-yellow-400 ${activeLink === 'article' ? 'text-yellow-400 border-b-2 border-yellow-400' : ''}`}
                >
                  Articles
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  onClick={() => handleLinkClick('contact')}
                  className={`hover:text-yellow-400 ${activeLink === 'contact' ? 'text-yellow-400 border-b-2 border-yellow-400' : ''}`}
                >
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
}
