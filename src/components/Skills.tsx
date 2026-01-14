import React, { useMemo } from "react";
import { useTheme } from "../contexts/ThemeContext";
import {
  useScrollAnimation,
  useStaggeredAnimation,
} from "../hooks/useScrollAnimation";

const Skills = React.memo(() => {
  const { isDark } = useTheme();

  const [titleRef, titleVisible] = useScrollAnimation();

  // Skills
 const skillCategories = useMemo(
  () => [
    {
      title: "PROGRAMMING & CORE ",
      skills: [
        { name: "Python", level: 85 },
        { name: "C++", level: 85 },
        { name: "Data Structures & Algorithms", level: 85 },
        { name: "Operating Systems", level: 80 },
        { name: "Computer Networking", level: 78 },
      ],
    },
    {
      title: "AI / ML ",
      skills: [
        { name: "Machine Learning", level: 90 },
        { name: "PyTorch", level: 85 },
        { name: "Transformers", level: 85 },
        { name: "Hugging Face", level: 80 },
        { name: "OCR Pipelines", level: 80 },
      ],
    },
    {
      title: "BACKEND & DATABASES",
      skills: [
        { name: "Flask", level: 80 },
        { name: "Node.js", level: 78 },
        { name: "REST APIs", level: 85 },
        { name: "Authentication", level: 85 },
        { name: "NoSQL Databases", level: 80 },
      ],
    },
    {
      title: "FRONTEND & TOOLS",
      skills: [
        { name: "React.js", level: 80 },
        { name: "HTML & CSS", level: 85 },
        { name: "Tailwind CSS", level: 85 },
        { name: "Git / GitHub", level: 85 },
        { name: "Linux / Unix", level: 80 },
      ],
    },
  ],
  []
);



  const [categoriesRef, visibleCategories] = useStaggeredAnimation(
    skillCategories.length
  );

  return (
    <section id="skills" className="py-20 relative scroll-mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div
          ref={titleRef}
          className={`text-center mb-14 transition-all duration-500 ${
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
            Technical Skills
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
            Technologies and tools used to turn ideas into impactful web
            solutions
          </p>
        </div>

        {/* Skills Grid */}
        <div
          ref={categoriesRef}
          className="grid lg:grid-cols-2 xl:grid-cols-4 gap-8"
        >
          {skillCategories.map((category, categoryIndex) => (
            <div
              key={categoryIndex}
              className={`p-6 rounded-2xl transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl ${
                visibleCategories[categoryIndex]
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              } ${
                isDark
                  ? "bg-white/5 border border-white/10"
                  : "bg-gray-50 border border-gray-200"
              }`}
              style={{ transitionDelay: `${categoryIndex * 100}ms` }}
            >
              {/* Category Title */}
              <div className="text-center mb-6">
                <h3
                  className={`text-xl font-semibold ${
                    isDark ? "text-white" : "text-gray-900"
                  }`}
                >
                  {category.title}
                </h3>
              </div>

              {/* Skills List */}
              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex} className="space-y-2">
                    {/* Skill Name and Level */}
                    <div className="flex justify-between items-center">
                      <span
                        className={`font-medium text-sm ${
                          isDark ? "text-gray-300" : "text-gray-700"
                        }`}
                      >
                        {skill.name}
                      </span>
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full ${
                          isDark
                            ? "bg-white/10 text-gray-400"
                            : "bg-gray-200 text-gray-500"
                        }`}
                      >
                        {skill.level}%
                      </span>
                    </div>

                    {/* Skill Bar */}
                    <div
                      className={`w-full h-2 rounded-full overflow-hidden ${
                        isDark ? "bg-gray-700/50" : "bg-gray-200"
                      }`}
                    >
                      <div
                        className={`h-full rounded-full transition-all duration-700 ease-out ${
                          isDark
                            ? "bg-gradient-to-r from-blue-400 to-white"
                            : "bg-gradient-to-r from-blue-600 to-gray-900"
                        }`}
                        style={{
                          width: visibleCategories[categoryIndex]
                            ? `${skill.level}%`
                            : "0%",
                          transitionDelay: `${skillIndex * 80 + 100}ms`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

Skills.displayName = "Skills";

export default Skills;
