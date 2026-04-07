"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface LoadingScreenProps {
  onComplete?: () => void;
  mode?: "light" | "dark"; // New Prop
}

const CUTE_LOGS = [
  "INITIALIZING_CUTENESS_PROTOCOL...",
  "LOADING_HEADPATS.EXE...",
  "OPTIMIZING_SMILES...",
  "DECRYPTING_UWU_FILES...",
  "GENERATING_KAWAII_ASSETS...",
  "SYSTEM_CHECK: ADORABLE.",
];

export default function LoadingScreen({ onComplete, mode = "light" }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [logIndex, setLogIndex] = useState(0);
  const isDark = mode === "dark";

  // 1. FAST AUTO-LOAD LOGIC
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          if (onComplete) setTimeout(onComplete, 500); 
          return 100;
        }
        // Slightly faster loading for Dark Mode (Page Transitions should be snappy)
        return prev + Math.random() * (isDark ? 8 : 4); 
      });
    }, 30);

    // Cycle through logs
    const logTimer = setInterval(() => {
        setLogIndex(prev => (prev + 1) % CUTE_LOGS.length);
    }, 250);

    return () => {
        clearInterval(timer);
        clearInterval(logTimer);
    };
  }, [onComplete, isDark]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ y: "-100%" }} // Slide up like a curtain reveal
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className={`fixed inset-0 z-9999 flex flex-col items-center justify-center overflow-hidden cursor-wait select-none
        ${isDark ? "bg-[#050505] text-white" : "bg-white text-black"}
      `}
    >
      {/* --- BACKGROUND TEXTURE --- */}
      {/* Huge subtle number in background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03] overflow-hidden">
        <span className="text-[40vw] font-black tracking-tighter">
            {Math.floor(progress)}
        </span>
      </div>
      
      {/* Grid Pattern (Inverted opacity for Dark Mode) */}
      <div className={`absolute inset-0 bg-size-[40px_40px] 
          ${isDark 
            ? "bg-[linear-gradient(to_right,#ffffff12_1px,transparent_1px),linear-gradient(to_bottom,#ffffff12_1px,transparent_1px)]" 
            : "bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)]"
          }
      `} />

      {/* --- MAIN CONTENT --- */}
      <div className="relative z-10 flex flex-col items-center gap-6">
        
        {/* 1. The Anime GIF */}
        <div className="relative">
            <motion.div 
                animate={{ y: [0, -15, 0] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                className="relative w-64 h-64 md:w-80 md:h-80"
            >
            <Image
              src="/assets/anime.gif"
              alt="Animated anime character loading screen for Oshada Rashmika portfolio"
              fill
              className={`object-contain ${isDark ? "drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]" : "drop-shadow-2xl"}`}
              priority
                unoptimized
            />
            </motion.div>
            
            {/* Cute "Speech Bubble" Log */}
            <motion.div 
                key={logIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className={`absolute -right-12 top-10 px-3 py-1 rounded-bl-xl rounded-tr-xl text-[10px] font-mono shadow-lg
                    ${isDark ? "bg-white text-black" : "bg-black text-white"}
                `}
            >
                {CUTE_LOGS[logIndex]}
            </motion.div>
        </div>

        {/* 2. High-Tech Loading Bar */}
        <div className="w-80 md:w-96 space-y-2">
            <div className="flex justify-between items-end">
                <span className="font-bold text-2xl font-mono tracking-tighter">
                    {Math.floor(progress)}%
                </span>
                <div className="flex gap-1">
                    {[0, 0.1, 0.2].map((delay, i) => (
                        <motion.div 
                            key={i}
                            animate={{ opacity: [0,1,0] }} 
                            transition={{ repeat: Infinity, duration: 0.5, delay }} 
                            className={`w-2 h-2 rounded-full ${isDark ? "bg-white" : "bg-black"}`} 
                        />
                    ))}
                </div>
            </div>

            {/* The Bar */}
            <div className={`h-4 w-full border-2 p-0.5 ${isDark ? "bg-zinc-900 border-white" : "bg-zinc-100 border-black"}`}>
                <motion.div 
                    className={`h-full relative overflow-hidden ${isDark ? "bg-white" : "bg-black"}`}
                    style={{ width: `${progress}%` }}
                >
                    {/* Striped Texture inside the bar */}
                    <div className="absolute inset-0 opacity-20 bg-[linear-gradient(45deg,transparent_25%,#888_25%,#888_50%,transparent_50%,transparent_75%,#888_75%,#888_100%)] bg-size-[10px_10px]" />
                </motion.div>
            </div>
            
            {/* Footer Tech Info */}
            <div className="flex justify-between text-[10px] font-mono text-zinc-500 uppercase">
                <span>MEM: 64TB OK</span>
                <span>V.2.0.4 // {isDark ? "NIGHT_OPS" : "DAY_OPS"}</span>
            </div>
        </div>
      </div>

    </motion.div>
  );
}