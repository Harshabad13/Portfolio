import React, { useMemo } from "react";
import { SiReact, SiTypescript, SiTailwindcss, SiVite } from "react-icons/si";
import { useTheme } from "../contexts/ThemeContext";

const Footer = React.memo(() => {
  const { isDark } = useTheme();

  const majorTech = useMemo(
    () => [
      { icon: SiReact, label: "React" },
      { icon: SiTypescript, label: "TypeScript" },
      { icon: SiVite, label: "Vite" },
      { icon: SiTailwindcss, label: "Tailwind CSS" },
    ],
    []
  );

  return (
    <footer
      className={`py-12 ${
        isDark
          ? "bg-gray-900/20 border-t border-gray-700 text-white"
          : "bg-gray-50 border-t border-gray-200 text-gray-900"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 space-y-12">
        {/* Technologies */}
        <div>
          <h3
            className={`text-2xl font-semibold text-center mb-6 ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            Technologies Used
          </h3>

          <div className="flex flex-wrap justify-center gap-6">
            {majorTech.map(({ icon: Icon, label }, idx) => (
              <div
                key={idx}
                className={`w-16 h-16 flex items-center justify-center rounded-full transition-transform duration-300 transform hover:scale-110 hover:rotate-6 ${
                  isDark
                    ? "bg-white/10 hover:bg-white/25 border border-gray-600 hover:border-gray-500"
                    : "bg-white hover:bg-gray-100 border border-gray-200 hover:border-gray-300 shadow-sm hover:shadow-md"
                }`}
                title={label}
                aria-label={label}
              >
                <Icon
                  className={`w-7 h-7 ${
                    isDark ? "text-white" : "text-gray-700"
                  }`}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0">
          <p className={isDark ? "text-gray-400" : "text-gray-600"}>
            © {new Date().getFullYear()} Harshabad Singh. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
});

Footer.displayName = "Footer";

export default Footer;
