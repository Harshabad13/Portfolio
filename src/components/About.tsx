import React, { useMemo } from "react";
import { Code, Palette, Zap, Users } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

const About = React.memo(() => {
  const { isDark } = useTheme();
  const [titleRef, titleVisible] = useScrollAnimation();
  const [contentRef, contentVisible] = useScrollAnimation();
  const [imageRef, imageVisible] = useScrollAnimation();

  const highlights = useMemo(
    () => [
      { icon: <Code className="w-6 h-6" />, title: "Clean Code", description: "Writing maintainable and scalable code" },
      { icon: <Palette className="w-6 h-6" />, title: "Creative Design", description: "Crafting beautiful user interfaces" },
      { icon: <Zap className="w-6 h-6" />, title: "Fast Performance", description: "Optimizing for speed and efficiency" },
      { icon: <Users className="w-6 h-6" />, title: "Team Player", description: "Collaborating effectively with teams" },
    ],
    []
  );

  return (
    <section id="about" className="py-20 scroll-mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <div
          ref={titleRef}
          className={`text-center mb-16 transition-all duration-400 ${
            titleVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4"
          }`}
        >
          <h2
            className={`text-4xl sm:text-5xl font-extrabold mb-2 tracking-tight bg-clip-text text-transparent bg-gradient-to-r ${
              isDark
                ? "from-sky-400 via-blue-500 to-cyan-300"
                : "from-blue-700 via-blue-600 to-cyan-600"
            }`}
          >
            About Me
          </h2>
          <div
            className={`h-1.5 w-24 mx-auto rounded-full mb-4 bg-gradient-to-r ${
              isDark
                ? "from-sky-400 via-blue-500 to-cyan-300"
                : "from-blue-700 via-blue-600 to-cyan-600"
            }`}
          />
          <p
            className={`text-lg sm:text-xl max-w-3xl mx-auto ${
              isDark ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Turning ideas into clean, intuitive, and scalable digital products
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Profile Image*/}
          <div
            ref={imageRef}
            className={`relative transition-all duration-700 ${
              imageVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-12"
            } flex justify-center`}
          >
            <div
              className={`w-80 h-80 rounded-full flex items-center justify-center shadow-2xl transition-all duration-700 ${
                isDark
                  ? "bg-white/5 border border-white/20"
                  : "bg-gray-100 border border-gray-200"
              }`}
            >
              <div
                className={`w-72 h-72 rounded-full overflow-hidden flex items-center justify-center transition-transform duration-300 hover:scale-110 ${
                  isDark
                    ? "bg-gray-800 border border-white/10"
                    : "bg-white border border-gray-100"
                }`}
              >
                <img
                  src="/images/others/profile.jpeg"
                  alt="Harshabad Singh"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </div>

          {/* About Text and Highlights */}
          <div
            ref={contentRef}
            className={`space-y-6 transition-all duration-700 ${
              contentVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-12"
            }`}
          >
            {/* Summary */}
            <div className="space-y-4">
              <h3
                className={`text-2xl font-semibold ${
                  isDark ? "text-white" : "text-gray-900"
                }`}
              >
                AI/ML Engineer | Full-Stack Applications
              </h3>
              <p
                className={`leading-relaxed ${
                  isDark ? "text-gray-400" : "text-gray-600"
                }`}
              >
               I’m an AI/ML enthusiast passionate about building intelligent systems that solve real-world problems. I enjoy working with data, designing machine learning models, and integrating AI into full-stack applications. My interests include predictive analytics, natural language processing, and AI-driven user experiences. I love turning data into meaningful insights and practical, scalable solutions, driven by curiosity, problem-solving, and a constant desire to explore how AI can enhance everyday experiences. I continuously learn and experiment with emerging technologies to create impactful and future-ready systems.
              </p>
            </div>

            {/*  Highlights  */}
            <div className="grid grid-cols-2 gap-4">
              {highlights.map((highlight, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg transition-all duration-400 group hover:shadow-md hover:-translate-y-1 ${
                    contentVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-6"
                  } ${
                    isDark
                      ? "bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20"
                      : "bg-gray-50 hover:bg-gray-100 border border-gray-200 hover:border-gray-300"
                  }`}
                  style={{ transitionDelay: `${index * 60 + 150}ms` }}
                >
                  <div className="flex items-center space-x-3 mb-2">
                    <div
                      className={`group-hover:scale-110 transition-transform duration-200 ${
                        isDark ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {highlight.icon}
                    </div>
                    <h4
                      className={`font-semibold ${
                        isDark ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {highlight.title}
                    </h4>
                  </div>
                  <p
                    className={`text-sm ${
                      isDark ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    {highlight.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

About.displayName = "About";

export default About;
