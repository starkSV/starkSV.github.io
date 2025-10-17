import React, { useEffect, useRef } from "react";

/**
 * AnimatedGradientBackground.jsx
 * - Modern animated gradient background with floating orbs
 * - Smooth color transitions and subtle particle effects
 * - Perfect for portfolio sites - eye-catching but not distracting
 */
export default function AnimatedGradientBackground({
  colors = [
    "#667eea", // purple-blue
    "#764ba2", // deep purple
    "#f093fb", // pink
    "#f5576c", // coral
    "#4facfe", // sky blue
    "#00f2fe", // cyan
  ],
  orbCount = 5,
  animationSpeed = 0.5,
}) {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const orbsRef = useRef([]);
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    let mounted = true;

    const resize = () => {
      const dpr = Math.max(1, window.devicePixelRatio || 1);
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = rect.width + "px";
      canvas.style.height = rect.height + "px";
      ctx.scale(dpr, dpr);
      
      // Recreate orbs on resize
      initializeOrbs();
    };

    const initializeOrbs = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      
      orbsRef.current = Array.from({ length: orbCount }, (_, i) => ({
        x: Math.random() * w,
        y: Math.random() * h,
        radius: Math.random() * 200 + 100,
        vx: (Math.random() - 0.5) * animationSpeed,
        vy: (Math.random() - 0.5) * animationSpeed,
        color: colors[i % colors.length],
        opacity: 0.6 + Math.random() * 0.4,
        pulseSpeed: 0.02 + Math.random() * 0.03,
        pulseOffset: Math.random() * Math.PI * 2,
      }));
    };

    const animate = () => {
      if (!mounted) return;
      
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      
      // Clear canvas with dark base
      ctx.fillStyle = "#0a0a0f";
      ctx.fillRect(0, 0, w, h);
      
      timeRef.current += 0.01;
      
      // Update and draw orbs
      orbsRef.current.forEach((orb, index) => {
        // Update position
        orb.x += orb.vx;
        orb.y += orb.vy;
        
        // Bounce off edges
        if (orb.x < -orb.radius || orb.x > w + orb.radius) orb.vx *= -1;
        if (orb.y < -orb.radius || orb.y > h + orb.radius) orb.vy *= -1;
        
        // Keep in bounds
        orb.x = Math.max(-orb.radius, Math.min(w + orb.radius, orb.x));
        orb.y = Math.max(-orb.radius, Math.min(h + orb.radius, orb.y));
        
        // Pulsing effect
        const pulse = Math.sin(timeRef.current + orb.pulseOffset) * 0.3 + 1;
        const currentRadius = orb.radius * pulse;
        const currentOpacity = orb.opacity * pulse * 0.8;
        
        // Create gradient with proper RGBA colors
        const gradient = ctx.createRadialGradient(
          orb.x, orb.y, 0,
          orb.x, orb.y, currentRadius
        );
        
        // Convert hex to RGB for proper alpha blending
        const hexToRgb = (hex) => {
          const r = parseInt(hex.slice(1, 3), 16);
          const g = parseInt(hex.slice(3, 5), 16);
          const b = parseInt(hex.slice(5, 7), 16);
          return { r, g, b };
        };
        
        const rgb = hexToRgb(orb.color);
        
        gradient.addColorStop(0, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${currentOpacity})`);
        gradient.addColorStop(0.5, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${currentOpacity * 0.4})`);
        gradient.addColorStop(1, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0)`);
        
        // Draw orb
        ctx.save();
        ctx.globalCompositeOperation = "screen";
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(orb.x, orb.y, currentRadius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });
      
      // Add subtle overlay noise
      ctx.save();
      ctx.globalAlpha = 0.03;
      ctx.fillStyle = `hsl(${(timeRef.current * 50) % 360}, 100%, 50%)`;
      for (let i = 0; i < 100; i++) {
        const x = Math.random() * w;
        const y = Math.random() * h;
        const size = Math.random() * 2;
        ctx.fillRect(x, y, size, size);
      }
      ctx.restore();
      
      animationRef.current = requestAnimationFrame(animate);
    };

    // Handle visibility changes for performance
    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
          animationRef.current = null;
        }
      } else if (!animationRef.current && mounted) {
        animate();
      }
    };

    resize();
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    
    initializeOrbs();
    animate();

    return () => {
      mounted = false;
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [colors, orbCount, animationSpeed]);

  return (
    <>
      <canvas
        ref={canvasRef}
        aria-hidden
        style={{
          position: "fixed",
          inset: 0,
          width: "100%",
          height: "100%",
          zIndex: -2,
          pointerEvents: "none",
        }}
      />
      {/* CSS gradient overlay for additional depth */}
      <div
        aria-hidden
        style={{
          position: "fixed",
          inset: 0,
          width: "100%",
          height: "100%",
          zIndex: -1,
          pointerEvents: "none",
          background: `
            radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(120, 219, 255, 0.1) 0%, transparent 50%)
          `,
          mixBlendMode: "overlay",
        }}
      />
    </>
  );
}