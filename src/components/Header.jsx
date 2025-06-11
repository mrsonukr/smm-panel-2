import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: "Sign in", path: "/" },
    { label: "Services", path: "/services" },
    { label: "API", path: "/apis" },
    { label: "Sign up", path: "/signup" },
  ];

  const currentPath = window.location.pathname;

  return (
    <header className="bg-sky-400 text-white">
      <div className="max-w-7xl mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <div className="text-2xl font-bold">
          <img src="/logo.png " className="w-14" alt="" />
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex space-x-2 items-center">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center px-4 py-2 rounded-xl transition-colors ${
                currentPath === item.path
                  ? "bg-sky-500"
                  : "hover:bg-sky-500"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden focus:outline-none"
          aria-label="Toggle Menu"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="px-4 pb-4 pt-2 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`block px-4 py-2 rounded-xl transition-colors ${
                currentPath === item.path
                  ? "bg-sky-500"
                  : "hover:bg-sky-300"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;
