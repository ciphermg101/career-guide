import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const navLinks = [
  { name: 'Home', to: '/' },
  { name: 'Careers', to: '/careers' },
  { name: 'Resources', to: '/resources' },
  { name: 'About', to: '/about' },
  { name: 'Contact', to: '/contact' },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="sticky top-0 z-50 glass-effect border-b shadow-sm">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
        <Link to="/" className="flex items-center gap-2 font-bold text-lg sm:text-xl lg:text-2xl tracking-tight">
          <span className="text-accent">TechCareer</span>
          <span className="text-gray-600">Guide</span>
        </Link>
        <div className="hidden md:flex gap-2 sm:gap-4">
          {navLinks.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className={`transition-colors px-3 sm:px-4 py-1.5 sm:py-2 rounded-md font-medium hover:bg-accent/10 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 text-sm sm:text-base ${
                location.pathname === link.to 
                  ? 'bg-accent/10 text-accent' 
                  : 'text-gray-700 hover:text-accent'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>
        <button
          className="md:hidden p-2 rounded focus:outline-none focus:ring-2 focus:ring-accent text-gray-700 hover:text-accent transition-colors"
          onClick={() => setMenuOpen(v => !v)}
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>
      {menuOpen && (
        <div className="md:hidden px-4 sm:px-6 lg:px-8 pb-4 animate-in fade-in slide-in-from-top-2 bg-white/95 backdrop-blur-sm border-b border-gray-200">
          <div className="flex flex-col gap-2">
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className={`transition-colors px-3 py-2 rounded-md font-medium hover:bg-accent/10 hover:text-accent text-sm sm:text-base ${
                  location.pathname === link.to 
                    ? 'bg-accent/10 text-accent' 
                    : 'text-gray-700 hover:text-accent'
                }`}
                onClick={() => setMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
} 