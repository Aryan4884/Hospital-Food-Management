import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaBarsStaggered, FaXmark, FaStethoscope } from "react-icons/fa6";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Toggle menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navItems = [
    { link: "Home", path: "/" },
    { link: "About", path: "/about" },
    { link: "Contact Us", path: "/" },
    { link: "Testimonials", path: "/review" },
    {
      link: "Login",
      dropdown: [
        { link: "Food Manager Login", path: "/login/food-manager" },
        { link: "Inner Pantry Login", path: "/login/inner-pantry" },
      ],
    },
  ];

  return (
    <header className="w-full bg-transparent fixed top-0 left-0 right-0 transition-all ease-in duration-300">
      <nav
        className={`py-4 lg:px-24 px-4 ${
          isSticky ? "sticky top-0 left-0 right-0 bg-blue-300" : ""
        }`}
      >
        <div className="flex justify-between items-center">
          {/* Logo Section */}
          <Link to="/" className="text-2xl font-bold flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100">
              <FaStethoscope className="text-blue-700 text-xl" />
            </div>
            <span className="text-blue-700">
              Hospital<span className="text-green-700">Management</span>
            </span>
          </Link>

          {/* Desktop Menu */}
          <ul className="md:flex space-x-12 hidden">
            {navItems.map(({ link, path, dropdown }) =>
              dropdown ? (
                <li key={link} className="relative">
                  <button
                    onClick={toggleDropdown}
                    className="block text-base text-black uppercase cursor-pointer hover:text-blue-700"
                  >
                    {link}
                  </button>
                  {/* Dropdown Menu */}
                  {dropdownOpen && (
                    <ul className="absolute left-0 bg-white shadow-md mt-2 space-y-2">
                      {dropdown.map(({ link, path }) => (
                        <li key={path}>
                          <Link
                            to={path}
                            className="block px-4 py-2 text-black hover:bg-blue-100"
                          >
                            {link}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ) : (
                <li key={path}>
                  <Link
                    to={path}
                    className="block text-base text-black uppercase cursor-pointer hover:text-blue-700"
                  >
                    {link}
                  </Link>
                </li>
              )
            )}
          </ul>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-black focus:outline-none"
            >
              {isMenuOpen ? (
                <FaXmark className="h-5 w-5 text-black" />
              ) : (
                <FaBarsStaggered className="h-5 w-5 text-black" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`space-y-4 px-4 mt-16 py-7 bg-blue-700 ${
          isMenuOpen ? "block fixed top-0 right-0 left-0" : "hidden"
        }`}
      >
        {navItems.map(({ link, path, dropdown }) =>
          dropdown ? (
            <div key={link} className="relative">
              <button
                onClick={toggleDropdown}
                className="block text-base text-white uppercase cursor-pointer hover:text-blue-300"
              >
                {link}
              </button>
              {/* Dropdown Menu */}
              {dropdownOpen && (
                <ul className="mt-2 space-y-2">
                  {dropdown.map(({ link, path }) => (
                    <li key={path}>
                      <Link
                        to={path}
                        className="block px-4 py-2 text-white hover:bg-blue-300"
                        onClick={() => setIsMenuOpen(false)} // Close menu when an item is clicked
                      >
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ) : (
            <Link
              key={path}
              to={path}
              className="block text-base text-white uppercase cursor-pointer hover:text-blue-300"
              onClick={() => setIsMenuOpen(false)} // Close menu when an item is clicked
            >
              {link}
            </Link>
          )
        )}
      </div>
    </header>
  );
};

export default Navbar;
