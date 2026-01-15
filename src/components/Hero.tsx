import React, { useEffect, useState, useMemo, useCallback } from "react";
import {
  Download,
  ChevronDown,
  Mail,
  Github,
  Linkedin,
  CodeSquareIcon,
} from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";

const Hero = React.memo(() => {
  const { isDark } = useTheme();
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [showArrow, setShowArrow] = useState(true);

  const titles = useMemo(
    () => [
      "Machine Learning Enthusiast",
      "Software Developer",
      "Problem Solver",
      "Researcher",
    ],
    []
  );

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const aboutSection = document.querySelector("#about");
          if (aboutSection) {
            const aboutTop = (aboutSection as HTMLElement).offsetTop;
            setShowArrow(window.scrollY < aboutTop - 200);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Typing and deleting effect
  useEffect(() => {
    const currentTitle = titles[currentTitleIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (isTyping) {
      if (displayText.length < currentTitle.length) {
        timeout = setTimeout(() => {
          setDisplayText(currentTitle.slice(0, displayText.length + 1));
        }, 100);
      } else {
        timeout = setTimeout(() => setIsTyping(false), 1500);
      }
    } else {
      if (displayText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1));
        }, 40);
      } else {
        setCurrentTitleIndex((prev) => (prev + 1) % titles.length);
        setIsTyping(true);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayText, isTyping, currentTitleIndex, titles]);

  const scrollToProjects = useCallback(() => {
    document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const scrollToAbout = useCallback(() => {
    document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" });
  }, []);

  // Social media links
  const socialLinks = useMemo(
    () => [
      {
        name: "Email",
        icon: Mail,
        href: "mailto:harshabadsingh123@gmail.com",
        color: isDark ? "hover:text-red-400" : "hover:text-red-600",
      },
      {
        name: "GitHub",
        icon: Github,
        href: "https://github.com/Harshabad13",
        color: isDark
          ? " hover:text-purple-400"
          : " hover:text-purple-800",
      },
      {
        name: "LinkedIn",
        icon: Linkedin,
        href: "https://www.linkedin.com/in/harshabad-singh-31016428a/",
        color: isDark ? "hover:text-blue-400" : "hover:text-blue-600",
      },

    ],
    [isDark]
  );

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center pt-16 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 items-center">
          {/* Text content */}
          <div className="space-y-8 text-center">
            <div className="space-y-6">
              <div className="space-y-2">
                <p
                  className={`text-lg font-medium tracking-wide transition-all duration-700 ${
                    isLoaded
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-8"
                  } ${isDark ? "text-blue-400" : "text-blue-600"}`}
                  style={{ transitionDelay: "100ms" }}
                >
                  Hello, I'm
                </p>
                <h1
                  className={`text-6xl lg:text-8xl font-bold leading-tight transition-all duration-700 ${
                    isLoaded
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-12"
                  } ${isDark ? "text-white" : "text-gray-900"}`}
                  style={{ transitionDelay: "200ms" }}
                >
                  Harshabad Singh
                </h1>
                <div
                  className={`text-2xl lg:text-3xl font-light transition-all duration-700 h-12 flex items-center justify-center ${
                    isLoaded
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-8"
                  }`}
                  style={{ transitionDelay: "300ms" }}
                >
                  <span
                    className={`mr-2 ${
                      isDark ? "text-white" : "text-gray-900"
                    }`}
                  >
                    
                  </span>
                  <span
                    className={`font-semibold inline-block bg-clip-text text-transparent bg-gradient-to-r ${
                      isDark
                        ? "from-blue-400 to-cyan-300"
                        : "from-blue-600 to-cyan-500"
                    }`}
                  >
                    {displayText}
                  </span>
                  <span className="inline-block ml-1 animate-pulse">|</span>
                </div>
              </div>

              <p
                className={`text-xl leading-relaxed max-w-2xl transition-all duration-700 ${
                  isLoaded
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                } ${isDark ? "text-gray-400" : "text-gray-600"}`}
                style={{ transitionDelay: "400ms" }}
              >
                Currently learning Machine Learning, Deep Learning & AI, Working on ML projects and experiments
              </p>
            </div>

            {/* CTA buttons */}
            <div
              className={`flex flex-col space-y-6 transition-all duration-700 ${
                isLoaded
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: "500ms" }}
            >
              <div className="flex flex-wrap gap-4 justify-center pt-8">
                <a
                  href="https://docs.google.com/document/d/1af188-30S0DVFVtm4Scx4GNlQepzp7zY/edit"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`px-8 py-4 rounded-full transition-all duration-300 flex items-center space-x-2 shadow-lg hover:shadow-xl transform hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 group ${
                    isDark
                      ? "bg-white text-black hover:bg-gray-100 focus-visible:ring-white/70 focus-visible:ring-offset-black"
                      : "bg-gray-900 text-white hover:bg-gray-800 focus-visible:ring-gray-700 focus-visible:ring-offset-white"
                  }`}
                >
                  <Download
                    size={20}
                    className="group-hover:rotate-12 transition-transform duration-300"
                  />
                  <span className="font-medium">Download CV</span>
                </a>
                <button
                  onClick={scrollToProjects}
                  className={`relative overflow-hidden px-8 py-4 rounded-full transition-all duration-300 font-medium shadow-lg hover:shadow-xl transform hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
                    isDark
                      ? "bg-white/10 text-white before:absolute before:inset-0 before:bg-white/20 before:opacity-0 hover:before:opacity-10 focus-visible:ring-blue-300 focus-visible:ring-offset-black border border-white/30"
                      : "bg-gray-100 text-gray-900 before:absolute before:inset-0 before:bg-gray-200 before:opacity-0 hover:before:opacity-20 focus-visible:ring-purple-300 focus-visible:ring-offset-white border border-gray-300"
                  } group`}
                >
                  <span className="relative flex items-center space-x-2">
                    <span>View Projects</span>
                  </span>
                </button>
              </div>

              {/* Social media buttons */}
              <div className="flex justify-center gap-8 pt-8">
                {socialLinks.map((social, index) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-5 rounded-full transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 ${
                      isDark
                        ? "bg-white/10 border border-white/20 text-gray-300 hover:bg-white/20"
                        : "bg-gray-100 border border-gray-200 text-gray-600 hover:bg-gray-200"
                    } ${social.color}`}
                    style={{ animationDelay: `${index * 100}ms` }}
                    aria-label={`Visit ${social.name}`}
                  >
                    <social.icon size={28} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll down arrow */}
      <div
        className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 transition-all duration-300 ${
          showArrow ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        <button
          onClick={scrollToAbout}
          className={`p-4 rounded-full transition-all duration-200 animate-bounce hover:scale-110 ${
            isDark
              ? "bg-white/10 hover:bg-white/20 text-white border border-white/20"
              : "bg-gray-100 hover:bg-gray-200 text-gray-900 border border-gray-200"
          }`}
        >
          <ChevronDown size={24} />
        </button>
      </div>
    </section>
  );
});

Hero.displayName = "Hero";

export default Hero;
