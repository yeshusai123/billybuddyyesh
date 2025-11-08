import React, { useEffect, useRef } from "react";

const AIBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
    }[] = [];

    const colors = [
      "rgba(99, 102, 241, 0.4)", // indigo
      "rgba(139, 92, 246, 0.4)", // violet
      "rgba(79, 70, 229, 0.4)",  // deep indigo
    ];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      particles = Array.from({ length: 100 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        size: Math.random() * 3 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
      }));
    };

    const drawParticle = (x: number, y: number, size: number, color: string) => {
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();
    };

    const drawConnection = (
      x1: number,
      y1: number,
      x2: number,
      y2: number,
      distance: number
    ) => {
      const gradient = ctx.createLinearGradient(x1, y1, x2, y2);
      gradient.addColorStop(0, "rgba(99, 102, 241, 0.1)");
      gradient.addColorStop(1, "rgba(139, 92, 246, 0.1)");

      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.strokeStyle = gradient;
      ctx.lineWidth = Math.max(0, 1 - distance / 150);
      ctx.stroke();
    };

    const drawCircularPattern = (x: number, y: number) => {
      const time = Date.now() * 0.001;
      const size = 50 + Math.sin(time) * 10;

      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(99, 102, 241, 0.1)";
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(x, y, size * 0.7, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(139, 92, 246, 0.1)";
      ctx.stroke();
    };

    const animate = () => {
      ctx.fillStyle = "rgba(30, 27, 75, 0.1)"; // dark indigo background
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      drawCircularPattern(canvas.width * 0.2, canvas.height * 0.3);
      drawCircularPattern(canvas.width * 0.8, canvas.height * 0.7);

      particles.forEach((particle, i) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        drawParticle(particle.x, particle.y, particle.size, particle.color);

        particles.slice(i + 1).forEach((other) => {
          const dx = other.x - particle.x;
          const dy = other.y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            drawConnection(particle.x, particle.y, other.x, other.y, distance);
          }
        });
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener("resize", resize);
    resize();
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-900 via-indigo-800 to-indigo-900 opacity-90" />
      {/* Animated particles */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ mixBlendMode: "screen" }}
      />
      {/* Soft radial overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.1),transparent_50%)]" />
    </div>
  );
};

export default AIBackground;
