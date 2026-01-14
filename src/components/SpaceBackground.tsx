import React, { useEffect, useRef, useMemo } from "react";
import { useTheme } from "../contexts/ThemeContext";

interface Star {
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
}

const SpaceBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const animationRef = useRef<number>();
  const lastTimeRef = useRef(0);
  const { isDark } = useTheme();
  const isDarkRef = useRef(isDark);

  useEffect(() => {
    isDarkRef.current = isDark;
  }, [isDark]);

  const backgroundStyle = useMemo(
    () =>
      isDark
        ? { background: "linear-gradient(135deg, #0a0a0a, #2a2a2a)" }
        : { background: "linear-gradient(135deg, #f8fafc, #cbd5e1)" },
    [isDark]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createStars = () => {
      starsRef.current = Array.from({ length: 50 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 1.5 + 0.5,
        speed: Math.random() * 0.6 + 0.1,
        opacity: Math.random() * 0.5 + 0.3,
      }));
    };

    const drawStars = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      starsRef.current.forEach(star => {
        ctx.globalAlpha = star.opacity * (isDarkRef.current ? 1 : 0.2);
        ctx.fillStyle = isDarkRef.current ? "#fff" : "#1e293b";
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();

        star.y += star.speed;
        if (star.y > canvas.height) {
          star.y = -star.size;
          star.x = Math.random() * canvas.width;
        }
      });
    };

    const animate = (time: number) => {
      if (time - lastTimeRef.current > 30) {
        lastTimeRef.current = time;
        drawStars();
      }
      animationRef.current = requestAnimationFrame(animate);
    };

    resizeCanvas();
    createStars();
    window.addEventListener("resize", resizeCanvas);
    animationRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 pointer-events-none"
      style={backgroundStyle}
    />
  );
};

export default React.memo(SpaceBackground);
