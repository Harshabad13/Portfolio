import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";

const Header = React.memo(() => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isDark, toggleTheme } = useTheme();

  // Navigation items with anchors
  const navItems = useMemo(
    () => [
      { name: "About", href: "#about" },
      { name: "Skills", href: "#skills" },
      { name: "Projects", href: "#projects" },
      { name: "Experience", href: "#experience" },
      { name: "Certifications", href: "#certifications" },
      { name: "Contact", href: "#contact" },
    ],
    []
  );

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrolled(window.scrollY > 50);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth scroll to section
  const scrollToSection = useCallback((href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setIsMenuOpen(false);
  }, []);

  // Scroll to top for logo click
  const scrollToHome = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const headerStyles = useMemo(() => {
    return scrolled
      ? isDark
        ? "bg-black/80 backdrop-blur-md shadow-lg border-b border-white/10"
        : "bg-white/80 backdrop-blur-md shadow-lg border-b border-gray-200"
      : "bg-transparent";
  }, [scrolled, isDark]);

  return (
    <header
      className={`border-b border-gray-800 fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${headerStyles}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo*/}
          <button
            onClick={scrollToHome}
            className="relative text-3xl font-bold cursor-pointer overflow-hidden rounded-lg px-4  transition-transform duration-300 hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-400/50"
          >
            <span
              className={`relative inline-block bg-clip-text text-transparent  bg-gradient-to-r ${
                isDark
                  ? "from-sky-500 via-blue-500 to-cyan-400"
                  : "from-blue-700 via-blue-600 to-cyan-600"
              }`}
            >
             Harshabad Singh
            </span>
            <span className="absolute inset-0 bg-gradient-to-r from-transparent to-transparent group-hover:from-white/10 group-hover:to-white/10 transition-opacity duration-300 pointer-events-none" />
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8 items-center">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className={`${
                  isDark
                    ? "text-gray-300 hover:text-white"
                    : "text-gray-600 hover:text-gray-900"
                } transition-colors duration-200 font-medium relative group cursor-pointer`}
              >
                {item.name}
                <span
                  className={`absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r ${
                    isDark
                      ? "from-sky-400 via-blue-500 to-cyan-300"
                      : "from-blue-700 via-blue-600 to-cyan-600"
                  } transition-all duration-200 group-hover:w-3/4`}
                ></span>
              </button>
            ))}

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
                isDark
                  ? "bg-white/10 hover:bg-white/20 text-white focus-visible:ring-white/40 focus-visible:ring-offset-black"
                  : "bg-gray-100 hover:bg-gray-200 text-gray-900 focus-visible:ring-gray-300 focus-visible:ring-offset-white"
              }`}
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </nav>

          {/* Mobile Menu & Theme Toggle */}
          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
                isDark
                  ? "bg-white/10 hover:bg-white/20 text-white focus-visible:ring-white/40 focus-visible:ring-offset-black"
                  : "bg-gray-100 hover:bg-gray-200 text-gray-900 focus-visible:ring-gray-300 focus-visible:ring-offset-white"
              }`}
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button
              className={isDark ? "text-white" : "text-gray-900"}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <nav
            className={`md:hidden pb-4 ${
              isDark ? "bg-black/90" : "bg-white/90"
            } backdrop-blur-md rounded-lg mt-2`}
          >
            <div className="flex flex-col space-y-2 p-4">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className={`${
                    isDark
                      ? "text-gray-300 hover:text-white"
                      : "text-gray-600 hover:text-gray-900"
                  } transition-colors duration-200 font-medium py-2 text-left cursor-pointer`}
                >
                  {item.name}
                </button>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
});

Header.displayName = "Header";

export default Header;
