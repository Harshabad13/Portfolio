import React, { useState, useMemo, useCallback } from "react";
import { Mail, Linkedin, Send, Github,  } from "lucide-react";
import emailjs from "@emailjs/browser";
import { useTheme } from "../contexts/ThemeContext";
import { useScrollAnimation } from "../hooks/useScrollAnimation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Contact = React.memo(() => {
  const { isDark } = useTheme();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [titleRef, titleVisible] = useScrollAnimation();
  const [contentRef, contentVisible] = useScrollAnimation();

  const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      setIsSubmitting(true);

      emailjs
        .send(
          EMAILJS_SERVICE_ID,
          EMAILJS_TEMPLATE_ID,
          {
            from_name: formData.name,
            from_email: formData.email,
            message: formData.message,
            to_name: "Harshabad Singh",
          },
          EMAILJS_PUBLIC_KEY
        )
        .then(() => {
          toast.success("Message sent successfully! I'll reply soon.");
          setFormData({ name: "", email: "", message: "" });
        })
        .catch(() => {
          toast.error("Failed to send message. Please try again.");
        })
        .finally(() => setIsSubmitting(false));
    },
    [formData]
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    },
    []
  );

  const contactInfo = useMemo(
    () => [
      {
        icon: <Mail className="w-6 h-6" />,
        title: "Email",
        value: "harshabadsingh123@gmail.com",
        href: "mailto:harshabadsingh123@gmail.com",
      },
      {
        icon: <Linkedin className="w-6 h-6" />,
        title: "LinkedIn",
        value: "Harshabad Singh",
        href: "https://www.linkedin.com/in/harshabad-singh/",
      },
      {
        icon: <Github className="w-6 h-6" />,
        title: "GitHub",
        value: "Harshabad13",
        href: "https://github.com/Harshabad13",
      },
    ],
    []
  );

  return (
    <section
      id="contact"
      className="py-20 relative min-h-screen flex items-center scroll-mt-10"
    >
      <ToastContainer theme={isDark ? "dark" : "light"} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Section Title */}
        <div
          ref={titleRef}
          className={`text-center mb-16 transition-all duration-400 ${
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
            Contact Me
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
            Open to freelance, internships, and collaborations.
          </p>
        </div>

        {/* Grid Layout */}
        <div
          ref={contentRef}
          className={`grid lg:grid-cols-2 gap-12 items-center transition-all duration-400 ${
            contentVisible
              ? "opacity-100 translate-x-0"
              : "opacity-0 translate-x-12"
          }`}
        >
          {/* Contact Info */}
          <div className="h-full flex flex-col justify-center space-y-8">
            <div>
              <h3
                className={`text-2xl font-semibold mb-6 ${
                  isDark ? "text-white" : "text-gray-900"
                }`}
              >
                Let's Connect
              </h3>
              <p
                className={`${isDark ? "text-gray-400" : "text-gray-600"} mb-3`}
              >
                Feel free to reach out for collaborations, tech projects, or
                just a friendly chat.
              </p>
            </div>

            <div className="space-y-4">
              {contactInfo.map((info, index) => (
                <a
                  key={index}
                  href={info.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center space-x-4 p-4 rounded-lg transition duration-300 group focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
                    isDark
                      ? "bg-white/5 hover:bg-white/10 border border-white/10 focus-visible:ring-white/40 focus-visible:ring-offset-black"
                      : "bg-gray-50 hover:bg-gray-100 border border-gray-200 focus-visible:ring-gray-300 focus-visible:ring-offset-white"
                  }`}
                  style={{ transitionDelay: `${index * 40}ms` }}
                >
                  <div
                    className={`group-hover:scale-110 transform ${
                      isDark ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {info.icon}
                  </div>
                  <div>
                    <h4
                      className={`font-semibold ${
                        isDark ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {info.title}
                    </h4>
                    <p className={isDark ? "text-gray-400" : "text-gray-600"}>
                      {info.value}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div
            className={`h-full p-8 rounded-2xl transition-all duration-400 ${
              isDark
                ? "bg-white/5 border border-white/10"
                : "bg-gray-50 border border-gray-200"
            }`}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className={`block text-sm font-medium mb-2 ${
                    isDark ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className={`w-full px-4 py-3 rounded-lg ${
                    isDark
                      ? "bg-white/10 border-white/20 text-white placeholder-gray-400"
                      : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                  }`}
                  placeholder="Your Name"
                />
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className={`block text-sm font-medium mb-2 ${
                    isDark ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className={`w-full px-4 py-3 rounded-lg ${
                    isDark
                      ? "bg-white/10 border-white/20 text-white placeholder-gray-400"
                      : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                  }`}
                  placeholder="your.email@example.com"
                />
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="message"
                  className={`block text-sm font-medium mb-2 ${
                    isDark ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className={`w-full px-4 py-3 rounded-lg resize-none ${
                    isDark
                      ? "bg-white/10 border-white/20 text-white placeholder-gray-400"
                      : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                  }`}
                  placeholder="Have a project in mind or just want to say hi?"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-3 px-6 rounded-lg flex items-center justify-center space-x-2 transition duration-200 transform hover:scale-105 ${
                  isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                } ${
                  isDark
                    ? "bg-white text-black hover:bg-gray-100"
                    : "bg-gray-900 text-white hover:bg-gray-800"
                }`}
              >
                <Send size={18} />
                <span>{isSubmitting ? "Sending..." : "Send Message"}</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
});

Contact.displayName = "Contact";
export default Contact;
