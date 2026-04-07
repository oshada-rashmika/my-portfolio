"use client";
import { useEffect, useRef, useCallback } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";

export default function InteractiveBackground() {
  // Mouse position values
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  // Smooth the mouse movement with reduced stiffness for better performance
  const smoothX = useSpring(x, { stiffness: 30, damping: 25 });
  const smoothY = useSpring(y, { stiffness: 30, damping: 25 });

  // Map mouse x/y to a small movement range (Parallax)
  const moveX = useTransform(smoothX, [0, 1], ["2%", "-2%"]);
  const moveY = useTransform(smoothY, [0, 1], ["2%", "-2%"]);

  // Throttle ref for mouse events
  const lastUpdate = useRef(0);
  const rafId = useRef<number | null>(null);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    // Throttle to ~30fps (33ms) using requestAnimationFrame
    const now = performance.now();
    if (now - lastUpdate.current < 33) return;
    
    if (rafId.current) cancelAnimationFrame(rafId.current);
    
    rafId.current = requestAnimationFrame(() => {
      const xPos = e.clientX / window.innerWidth;
      const yPos = e.clientY / window.innerHeight;
      x.set(xPos);
      y.set(yPos);
      lastUpdate.current = now;
    });
  }, [x, y]);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [handleMouseMove]);

  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden z-0 bg-black">
      <motion.div
        style={{ x: moveX, y: moveY, scale: 1.1, willChange: "transform" }} 
        className="relative w-full h-full gpu-accelerate"
      >
        <Image
          src="/assets/bgdark.webp"
          alt="Dark abstract background for Oshada Rashmika portfolio"
          fill
          priority
          className="object-cover object-center"
          quality={75}
        />
        
        {/* --- GAMIFIED OVERLAY EFFECTS --- */}
        
        {/* 1. CRT Scanlines - simplified pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.08)_50%)] z-10 bg-size-[100%_4px] pointer-events-none" />

        {/* 2. Vignette */}
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-black/20 to-black/80 z-20 pointer-events-none" />
      </motion.div>
    </div>
  );
}