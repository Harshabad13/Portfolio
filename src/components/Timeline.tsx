import React, { useEffect, useRef, useState, useMemo } from "react";
import { Calendar, MapPin, Building, GraduationCap } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";
import {
  useScrollAnimation,
  useSequentialAnimation,
} from "../hooks/useScrollAnimation";

const Timeline = React.memo(() => {
  const { isDark } = useTheme();
  const [titleRef, titleVisible] = useScrollAnimation();
  const [progressHeight, setProgressHeight] = useState(0);
  const progressRef = useRef<HTMLDivElement>(null);

/* Work and Education Timeline */
  const timelineItems = useMemo(
    () => [
      {
        
        title: "Hackaccino_3.0 - Computer Society of India (CSI) ",
        organization: "Bennett University",
        organizationLogo: "public/images/experience/uni.webp",
        location: "Greater Noida, Uttar Pradesh",
        period: "June 2025",
        description: [
        ],
      },
     
      {
        type: "education",
        title: "Bachelor of Technology in Computer Science Engineering",
        organization: "Bennett University",
        organizationLogo: "/images/experience/uni.webp",
        location: "Greater Noida, Uttar Pradesh",
        period: "Aug 2023 - Aug 2027",
        description: [
          "Current CGPA: 7.31 ",
        ],
      },

      {
        type: "education",
        title: "Senior Secondary (Class XII)",
        organization: "Sant Gyaneshwar Model School",
        organizationLogo: "/images/experience/sant.webp",
        location: "Alipur,Delhi",
        period: "2022 - 2023",
        description: [
          "Scored 75.4%",
        ],
      },
      {
        type: "education",
        title: "Secondary Education (Class X)",
        organization: "Pratap Public School",
        organizationLogo: "/images/experience/school.webp",
        location: "Karnal, Haryana",
        period: "2020 - 2021",
        description: [
          "Scored 86.1%",
        ],
      },
    ],
    []
  );

  const [timelineRef, visibleItems] = useSequentialAnimation(
    timelineItems.length
  );

  
  useEffect(() => {
    let ticking = false;

    const updateProgress = () => {
      if (!progressRef.current) return;
      const container = progressRef.current.parentElement;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      if (rect.top < windowHeight && rect.bottom > 0) {
        const progress = Math.min(
          1,
          Math.max(0, (windowHeight - rect.top) / rect.height)
        );
        setProgressHeight(progress * 100);
      }

      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(updateProgress);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    updateProgress();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section id="experience" className="py-20 relative scroll-mt-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div
          ref={titleRef}
          className={`text-center mb-16 transition-all duration-300 ease-out ${
            titleVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <h2
            className={`text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r ${
              isDark
                ? "from-sky-400 via-blue-500 to-cyan-300"
                : "from-blue-700 via-blue-600 to-cyan-600"
            }`}
          >
            Experience
          </h2>
          <div
            className={`h-1.5 w-28 mx-auto rounded-full mb-4 bg-gradient-to-r ${
              isDark
                ? "from-sky-400 via-blue-500 to-cyan-300"
                : "from-blue-700 via-blue-600 to-cyan-600"
            }`}
          />
          <p
            className={`text-lg max-w-2xl mx-auto ${
              isDark ? "text-gray-400" : "text-gray-600"
            }`}
          >
            My professional journey and educational background.
          </p>
        </div>

        {/* Timeline Container */}
        <div ref={timelineRef} className="relative">
          <div
            className={`absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full ${
              isDark ? "bg-white/20" : "bg-gray-300"
            }`}
          >
            <div
              ref={progressRef}
              className={`w-full transition-all duration-300 ease-out ${
                isDark ? "bg-white" : "bg-gray-900"
              }`}
              style={{ height: `${progressHeight}%` }}
            />
          </div>

          {/* Timeline Cards */}
          <div className="space-y-12">
            {timelineItems.map((item, index) => {
              const isWork = item.type === "work";
              const Icon = isWork ? Building : GraduationCap;
              const isVisible = visibleItems[index];
              const alignRight = index % 2 !== 0;

              return (
                <div
                  key={index}
                  className={`relative flex items-center transition-all duration-300 ease-out group ${
                    isVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-8"
                  } ${alignRight ? "lg:flex-row-reverse" : "lg:flex-row"}`}
                >
                  {/* Timeline Dot */}
                  <div
                    className={`absolute left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full border-2 z-10 flex items-center justify-center group-hover:scale-125 group-hover:shadow-md transition-all duration-200 ${
                      isDark
                        ? "bg-black border-white"
                        : "bg-white border-gray-900"
                    }`}
                  >
                    <div
                      className={`w-2 h-2 rounded-full ${
                        isWork
                          ? isDark
                            ? "bg-blue-400"
                            : "bg-blue-600"
                          : isDark
                          ? "bg-green-400"
                          : "bg-green-600"
                      }`}
                    />
                  </div>

                  {/* Timeline Content Box */}
                  <div
                    className={`w-full lg:w-5/12 ${
                      alignRight ? "lg:pl-8" : "lg:pr-8"
                    }`}
                  >
                    <div
                      className={`p-6 rounded-xl group-hover:scale-[1.03] group-hover:-translate-y-1 transition-all duration-300 ${
                        isDark
                          ? "bg-white/5 border border-white/10 group-hover:bg-white/10"
                          : "bg-gray-50 border border-gray-200 group-hover:bg-white"
                      }`}
                    >
                      {/* Icon & Type */}
                      <div className="flex items-center space-x-2 mb-3">
                        <Icon
                          className={`w-5 h-5 group-hover:scale-110 group-hover:rotate-6 transition-transform ${
                            isWork
                              ? isDark
                                ? "text-blue-400"
                                : "text-blue-600"
                              : isDark
                              ? "text-green-400"
                              : "text-green-600"
                          }`}
                        />
                        <span
                          className={`text-xs px-3 py-1 rounded-full font-medium border group-hover:scale-105 transition-transform ${
                            isWork
                              ? isDark
                                ? "bg-blue-500/20 text-blue-400 border-blue-500/30"
                                : "bg-blue-100 text-blue-700 border-blue-200"
                              : isDark
                              ? "bg-green-500/20 text-green-400 border-green-500/30"
                              : "bg-green-100 text-green-700 border-green-200"
                          }`}
                        >
                          {isWork ? "Work" : "Education"}
                        </span>
                      </div>

                      {/* Title */}
                      <h3
                        className={`text-xl font-semibold mb-4 ${
                          isDark ? "text-white" : "text-gray-900"
                        }`}
                      >
                        {item.title}
                      </h3>

                      {/* Organization, Logo, Location, and Date */}
                      <div className="space-y-3 mb-4">
                        <div
                          className={`flex items-center space-x-3 text-sm ${
                            isDark ? "text-gray-400" : "text-gray-600"
                          }`}
                        >
                          {/* Logo */}
                          <div className="relative w-8 h-8 rounded-full overflow-hidden border-2 group-hover:scale-110 transition-transform">
                            <img
                              src={item.organizationLogo}
                              alt={`${item.organization} Logo`}
                              className="w-full h-full object-cover"
                            />
                            <div
                              className={`absolute inset-0 ${
                                isDark ? "bg-white/5" : "bg-black/5"
                              }`}
                            />
                          </div>
                          {/* Name */}
                          <span className="font-medium">
                            {item.organization}
                          </span>
                        </div>
                        {/* Location */}
                        <div
                          className={`flex items-center text-sm ${
                            isDark ? "text-gray-400" : "text-gray-600"
                          }`}
                        >
                          <MapPin className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform duration-200" />
                          <span>{item.location}</span>
                        </div>

                        <div
                          className={`flex items-center text-sm ${
                            isDark ? "text-gray-400" : "text-gray-600"
                          }`}
                        >
                          <Calendar className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform duration-200" />
                          <span>{item.period}</span>
                        </div>
                      </div>

                      {/* Description Bullets */}
                      <ul className="space-y-2">
                        {item.description.map((desc, i) => (
                          <li key={i} className="flex items-start">
                            <span
                              className={`w-1.5 h-1.5 mt-2 mr-3 rounded-full ${
                                isDark ? "bg-white" : "bg-gray-900"
                              }`}
                            />
                            <span
                              className={`text-sm ${
                                isDark ? "text-gray-400" : "text-gray-600"
                              }`}
                            >
                              {desc}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
});

Timeline.displayName = "Timeline";
export default Timeline;
