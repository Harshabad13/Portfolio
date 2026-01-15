import React, { useMemo } from "react";
import { ExternalLink, Github, Calendar } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";
import {
  useScrollAnimation,
  useStaggeredAnimation,
} from "../hooks/useScrollAnimation";

const Projects = React.memo(() => {
  const { isDark } = useTheme();

  const [titleRef, titleVisible] = useScrollAnimation();
  const [buttonRef, buttonVisible] = useScrollAnimation();

  // Project list
  const projects = useMemo(
    () => [
      {
        title: "NC2X: Concept & Causal-AI",
        description:
          "Advanced AI system for context-aware scene understanding — bridging perception and reasoning using object detection, scene graphs, and causal analysis.",
        image: "/images/projects/ncx.jpg",
        technologies: [
          "Python",
          "PyTorch",
          "YOLOv8",
          "Graph Neural Network",
          "Streamlit",
          "OpenCV",
        ],
        liveUrl: "",
        githubUrl: "https://github.com/Harshabad13/NC2X_WebApp",
        date: "2025",
        category: "AI / Python",
      },
      {
        title: "HiredNext: AI-Powered Mock Interview Platform",
        description:
          "Practice job interviews with AI-generated questions, voice-based sessions, and detailed feedback to improve your interview skills and land your dream job.",
        image: "/images/projects/hirenext.jpg",
        technologies: [
          "Next.js",
          "Firebase Firestore",
          "Firebase Authentication",
          "Vapi.ai",
          "Google Gemini",
          "Tailwind CSS",
          "Shadcn UI",
          "TypeScript",
        ],
        liveUrl: "",
        githubUrl: "https://github.com/Harshabad13/HiredNext-Mock-Inter",
        date: "2025",
        category: "Next.js / AI",
      },
      {
        title: "WhatsApp Chat Analysis",
        description:
          "A Python-based analytics tool that parses WhatsApp chat exports to extract insights like message statistics, activity trends, most active users, emoji usage, and word clouds.",
        image: "/images/projects/whatsappanalysis.png",
        technologies: [
          "Python",
          "Pandas",
          "Matplotlib",
          "Seaborn",
          "Streamlit",
          "Regex",
          "WordCloud",
        ],
        liveUrl: "",
        githubUrl: "https://github.com/Harshabad13/WhatsApp-Chat-Analysis",
        date: "2025",
        category: "Data Analysis / Python",
      },
    ],
    []
  );

  const [projectsRef, visibleProjects] = useStaggeredAnimation(
    projects.length
  );

  return (
    <section id="projects" className="py-20 mt-10 relative scroll-mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div
          ref={titleRef}
          className={`text-center mb-12 transition-all duration-500 ${
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
            Featured Projects
          </h2>
          <div
            className={`h-1.5 w-28 mx-auto rounded-full mb-3 bg-gradient-to-r ${
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
            A showcase of my recent work and personal projects
          </p>
        </div>

        {/* Project Grid */}
        <div
          ref={projectsRef}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projects.map((project, index) => (
            <div
              key={project.title}
              className={`group rounded-2xl overflow-hidden transition-all duration-300 hover:scale-105 ${
                visibleProjects[index]
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              } ${
                isDark
                  ? "bg-white/5 border border-white/10"
                  : "bg-white border border-gray-200 shadow-lg"
              }`}
            >
              {/* Image */}
              <div className="relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-56 object-cover"
                  loading="lazy"
                />
                <div className="absolute top-4 left-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      isDark
                        ? "bg-white/20 text-white backdrop-blur-sm"
                        : "bg-black/20 text-white backdrop-blur-sm"
                    }`}
                  >
                    {project.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3
                    className={`text-xl font-semibold ${
                      isDark ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {project.title}
                  </h3>
                  <div
                    className={`flex items-center text-sm ${
                      isDark ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    <Calendar className="w-4 h-4 mr-1" />
                    {project.date}
                  </div>
                </div>

                <p
                  className={`text-sm mb-4 leading-relaxed ${
                    isDark ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  {project.description}
                </p>

                {/* Tech */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, i) => (
                    <span
                      key={i}
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        isDark
                          ? "bg-white/10 text-gray-300 border border-white/20"
                          : "bg-gray-100 text-gray-700 border border-gray-200"
                      }`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Buttons */}
                <div className="flex space-x-3">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium flex items-center justify-center space-x-2 ${
                        isDark
                          ? "bg-white text-black"
                          : "bg-gray-900 text-white"
                      }`}
                    >
                      <ExternalLink size={14} />
                      <span>Live Demo</span>
                    </a>
                  )}
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium flex items-center justify-center space-x-2 border ${
                      isDark
                        ? "border-white/20 text-white"
                        : "border-gray-300 text-gray-700"
                    }`}
                  >
                    <Github size={14} />
                    <span>Code</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View More */}
        <div
          ref={buttonRef}
          className={`text-center mt-10 transition-all duration-500 ${
            buttonVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <a
            href="https://github.com/Harshabad13"
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center space-x-2 px-8 py-4 rounded-full border ${
              isDark
                ? "border-white/20 text-white"
                : "border-gray-300 text-gray-700"
            }`}
          >
            <Github size={20} />
            <span className="font-medium">View All Projects</span>
          </a>
        </div>
      </div>
    </section>
  );
});

Projects.displayName = "Projects";
export default Projects;
