import React, { useState, useMemo, useCallback, useEffect } from "react";
import {
  Award,
  Calendar,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

interface Certification {
  title: string;
  issuer: string;
  date: string;
  
  verifyUrl: string;
  image: string;
}

const Certifications = React.memo(() => {
  const { isDark } = useTheme();
  const [titleRef, titleVisible] = useScrollAnimation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(3);

  const certifications = useMemo<Certification[]>(
    () => [
      {
        title: "Academy Accreditation - Generative AI Fundamentals ",
        issuer: "Databricks",
        date: "Aug 2025",
        
        verifyUrl:
          "https://credentials.databricks.com/9b8491fc-a995-48b2-85f1-1a52e245f36f",
        image: "/images/certifications/databricks_certificate_600x400.png",
      },
      {
        title: "AI Workflow: Data Analysis and Hypothesis Testing",
        issuer: "IBM",
        date: "Sep 2024",
        verifyUrl:
          "https://www.coursera.org/account/accomplishments/records/N6QC1UX5DFZ4",
         image: "/images/certifications/ibm_certificate_600x400.png",
      },
      {
        title: "Machine Learning: Regression",
        issuer: "University of Washington",
        date: "Sep 2024",
        
        verifyUrl:
          "https://www.coursera.org/account/accomplishments/records/X1K8S0QZWTH0",
         image: "/images/certifications/uw_certificate_600x400.png",
      },
      {
        title: "Algorithmic Toolbox",
        issuer: "University of California, San Diego - Rady School of Management",
        date: "Feb 2025",
        verifyUrl:
          "https://www.coursera.org/account/accomplishments/records/BYTWYY0HITFE",
         image: "/images/certifications/ucsd_certificate_600x400.png",
      },
      {
        title: "Object-Oriented Data Structures in C++",
        issuer: "University of Illinois Urbana-Champaign",
        date: "Sep 2024",
        verifyUrl:
          "https://www.coursera.org/account/accomplishments/records/E5HFWNK8XGVY",
         image: "/images/certifications/illinois_certificate_600x400.png",
      },
      {
        title: "Data Structures",
        issuer: "University of California, San Diego - Rady School of Management",
        date: "Sep 2024",
        verifyUrl:
          "https://www.coursera.org/account/accomplishments/records/OWHO2GJ4HL3Q",
         image: "/images/certifications/ucsd_data_structures_600x400_v2.png",
      },
      
    ],
    []
  );

  useEffect(() => {
    const updateCardsPerView = () => {
      if (window.innerWidth < 768) {
        setCardsPerView(1);
      } else if (window.innerWidth < 1024) {
        setCardsPerView(2);
      } else {
        setCardsPerView(3);
      }
    };

    updateCardsPerView();
    window.addEventListener("resize", updateCardsPerView);
    return () => window.removeEventListener("resize", updateCardsPerView);
  }, []);

  const displayItems = useMemo<(Certification | null)[]>(() => {
    const items: (Certification | null)[] = [...certifications];

    const totalPages = Math.ceil(items.length / cardsPerView);
    const totalSlotsNeeded = totalPages * cardsPerView;

    while (items.length < totalSlotsNeeded) {
      items.push(null);
    }

    return items;
  }, [certifications, cardsPerView]);

  const totalPages = Math.ceil(displayItems.length / cardsPerView);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => Math.min(prev + 1, totalPages - 1));
  }, [totalPages]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  }, []);

  useEffect(() => {
    setCurrentIndex(0);
  }, [cardsPerView]);

  const EmptyCard = () => <div className="min-h-[400px]" />;

  return (
    <section id="certifications" className="py-20 relative scroll-mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div
          ref={titleRef}
          className={`text-center mb-16 transition-all duration-500 ${
            titleVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <h2
            className={`text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r ${
              isDark
                ? "from-sky-400 via-blue-500 to-cyan-300"
                : "from-blue-700 via-blue-600 to-cyan-600"
            }`}
          >
            Certifications
          </h2>
          <div
            className={`h-1.5 w-28 mx-auto rounded-full mb-4 bg-gradient-to-r ${
              isDark
                ? "from-sky-400 via-blue-500 to-cyan-300"
                : "from-blue-700 via-blue-600 to-cyan-600"
            }`}
          />
          <p
            className={`text-base md:text-lg max-w-2xl mx-auto ${
              isDark ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Professional certifications and achievements that validate my
            expertise
          </p>
        </div>

        {/* Carousel */}
        <div
          className={`relative transition-all duration-500 ${
            titleVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <div className="relative overflow-hidden">
            <div
              className="flex transition-transform duration-700 ease-out"
              style={{
                transform: `translateX(-${currentIndex * (100 / totalPages)}%)`,
                width: `${totalPages * 100}%`,
              }}
            >
              {Array.from({ length: totalPages }).map((_, pageIndex) => (
                <div
                  key={pageIndex}
                  className="flex-shrink-0 grid gap-4 md:gap-6 px-2"
                  style={{
                    width: `${100 / totalPages}%`,
                    gridTemplateColumns: `repeat(${cardsPerView}, 1fr)`,
                  }}
                >
                  {displayItems
                    .slice(
                      pageIndex * cardsPerView,
                      (pageIndex + 1) * cardsPerView
                    )
                    .map((cert, index) => (
                      <div
                        key={`${pageIndex}-${index}`}
                        className="w-full"
                        style={{
                          transitionDelay: `${index * 100}ms`,
                        }}
                      >
                        {cert ? (
                          <div
                            className={`rounded-2xl overflow-hidden transition-all duration-300 hover:scale-105 h-full ${
                              isDark
                                ? "bg-white/5 border border-white/10 hover:bg-white/10"
                                : "bg-white border border-gray-200 hover:shadow-xl shadow-lg"
                            }`}
                          >
                            {/* Image */}
                            <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden">
                              <img
                                src={cert.image}
                                alt={cert.title}
                                className="w-auto h-auto object-cover"
                              />
                              <div className="absolute top-4 right-4">
                                <div
                                  className={`p-2 rounded-full ${
                                    isDark
                                      ? "bg-white/20 backdrop-blur-sm"
                                      : "bg-black/20 backdrop-blur-sm"
                                  }`}
                                >
                                  <Award className="w-5 h-5 text-yellow-400" />
                                </div>
                              </div>
                            </div>

                            {/* Content */}
                            <div className="p-4 md:p-6">
                              <h3
                                className={`text-lg md:text-xl font-semibold mb-2 line-clamp-2 ${
                                  isDark ? "text-white" : "text-gray-900"
                                }`}
                              >
                                {cert.title}
                              </h3>
                              <p
                                className={`text-sm font-medium mb-3 ${
                                  isDark ? "text-gray-300" : "text-gray-700"
                                }`}
                              >
                                {cert.issuer}
                              </p>
                              <div
                                className={`flex items-center text-sm mb-4 ${
                                  isDark ? "text-gray-400" : "text-gray-600"
                                }`}
                              >
                                <Calendar className="w-4 h-4 mr-2" />
                                <span>{cert.date}</span>
                              </div>
                              

                              <div className="space-y-3">
                                <div
                                  className={`text-xs px-3 py-2 rounded-full inline-block ${
                                    isDark
                                      ? "bg-white/10 text-gray-300 border border-white/20"
                                      : "bg-gray-100 text-gray-700 border border-gray-200"
                                  }`}
                                >
                                 
                                </div>
                                <div>
                                  <a
                                    href={cert.verifyUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={`Verify ${cert.title}`}
                                    className={`inline-flex items-center space-x-2 text-sm font-medium transition-all duration-200 hover:scale-105 ${
                                      isDark
                                        ? "text-white hover:text-gray-300"
                                        : "text-gray-900 hover:text-gray-700"
                                    }`}
                                  >
                                    <ExternalLink className="w-4 h-4" />
                                    <span>Verify</span>
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <EmptyCard />
                        )}
                      </div>
                    ))}
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          {totalPages > 1 && (
            <>
              <button
                onClick={prevSlide}
                disabled={currentIndex === 0}
                aria-label="Previous Slide"
                className={`absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-2 md:-translate-x-4 p-2 md:p-3 rounded-full transition-all duration-300 hover:shadow-lg active:scale-95 ${
                  currentIndex === 0
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:scale-110 hover:-translate-x-3 md:hover:-translate-x-5"
                } ${
                  isDark
                    ? "bg-white/10 hover:bg-white/20 text-white border border-white/20"
                    : "bg-white hover:bg-gray-50 text-gray-900 border border-gray-200 shadow-lg"
                }`}
              >
                <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
              </button>

              <button
                onClick={nextSlide}
                disabled={currentIndex >= totalPages - 1}
                aria-label="Next Slide"
                className={`absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-2 md:translate-x-4 p-2 md:p-3 rounded-full transition-all duration-300 hover:shadow-lg active:scale-95 ${
                  currentIndex >= totalPages - 1
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:scale-110 hover:translate-x-3 md:hover:translate-x-5"
                } ${
                  isDark
                    ? "bg-white/10 hover:bg-white/20 text-white border border-white/20"
                    : "bg-white hover:bg-gray-50 text-gray-900 border border-gray-200 shadow-lg"
                }`}
              >
                <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
              </button>
            </>
          )}
        </div>

        {/* Pagination Dots */}
        {totalPages > 1 && (
          <div className="flex justify-center space-x-2 mt-8">
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                aria-label={`Go to slide ${index + 1}`}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 hover:scale-125 active:scale-110 ${
                  index === currentIndex
                    ? isDark
                      ? "bg-white"
                      : "bg-gray-900"
                    : isDark
                    ? "bg-white/30"
                    : "bg-gray-400"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
});

Certifications.displayName = "Certifications";

export default Certifications;
