"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ArrowRight, X, AlertTriangle } from "lucide-react";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();
  const [trapActive, setTrapActive] = useState(false);

  // 1. UNIQUE AUDIO FOR THIS PAGE (Bleach OST - Treachery)
  const bgAudioSrc = `https://www.youtube.com/embed/OlOi8Nxwnrg?autoplay=1&loop=1&playlist=OlOi8Nxwnrg&controls=0&showinfo=0&mute=0`;

  // 2. TRAP VIDEO (Aizen: All According to Plan)
  const trapVideoSrc = `https://www.youtube.com/embed/_e9yMqmXWo0?autoplay=1&controls=0&showinfo=0&modestbranding=1`;

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { type: "spring" as const, stiffness: 100 } },
  };

  return (
    <main className="min-h-screen w-full bg-[#050505] text-white flex flex-col lg:flex-row overflow-hidden relative font-sans selection:bg-white selection:text-black">
      
      {/* --- HIDDEN AUDIO EMBED (Only plays when trap is NOT active) --- */}
      {!trapActive && (
        <div className="absolute opacity-0 pointer-events-none">
          <iframe width="10" height="10" src={bgAudioSrc} allow="autoplay" title="bg-audio" />
        </div>
      )}

      {/* --- BACKGROUND TEXTURE --- */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-size-[4rem_4rem] pointer-events-none z-0" />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05] pointer-events-none z-0" />


      {/* ====== LEFT SIDE: CONTENT ====== */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="w-full lg:w-[55%] relative z-10 flex flex-col justify-center p-8 md:p-16 lg:p-24"
      >
        {/* 1. Header Tag */}
        <motion.div variants={itemVariants} className="flex items-center gap-3 mb-6 text-zinc-500 font-mono text-sm tracking-[0.2em] uppercase">
            <AlertTriangle size={14} className="text-white" />
            <span>Reality Distortion Detected</span>
            <div className="h-px w-12 bg-zinc-800" />
            <span className="text-red-500">Error 404</span>
        </motion.div>

        {/* 2. Main Title */}
        <motion.h1 
            variants={itemVariants}
            className="text-6xl md:text-8xl font-black tracking-tighter leading-none mb-8"
        >
            SHATTER <br />
            <span className="text-transparent" style={{ WebkitTextStroke: "2px white" }}>ILLUSION.</span>
        </motion.h1>

        {/* 3. Description */}
        <motion.p 
            variants={itemVariants}
            className="text-zinc-400 text-lg md:text-xl max-w-xl leading-relaxed mb-12"
        >
            Since when were you under the impression that this page existed? You have strayed into the void. Turn back now, or witness the truth.
        </motion.p>

        {/* 4. BUTTONS */}
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-6">
            
            {/* RETURN BUTTON (Safe) */}
            <button 
                onClick={() => router.push("/")}
                className="group relative overflow-hidden bg-white text-black px-8 py-4 font-bold tracking-widest uppercase flex items-center justify-center gap-4 transition-all hover:scale-105 active:scale-95 w-full sm:w-auto"
            >
                <span className="relative z-10">Return Home</span>
                <ArrowRight className="relative z-10 transition-transform group-hover:-translate-x-1" size={20} />
                <div className="absolute inset-0 bg-zinc-300 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </button>

            {/* TRAP BUTTON (Outline) */}
            <button 
                onClick={() => setTrapActive(true)}
                className="group relative overflow-hidden border-2 border-white text-white px-8 py-4 font-bold tracking-widest uppercase flex items-center justify-center gap-4 transition-all hover:text-black w-full sm:w-auto"
            >
                <span className="relative z-10">Proceed Anyway</span>
                <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-0" />
            </button>

        </motion.div>

        {/* 5. Footer Decor */}
        <motion.div variants={itemVariants} className="mt-24 flex items-center gap-4 text-zinc-600 font-mono text-xs uppercase tracking-wider">
            <span>Sector 404</span>
            <div className="h-0.5 w-full max-w-xs bg-zinc-900 relative">
                <div className="absolute left-0 top-0 h-full w-1/3 bg-white animate-pulse" />
            </div>
            <span className="text-white">Las Noches</span>
        </motion.div>

      </motion.div>


      {/* ====== RIGHT SIDE: AIZEN IMAGE ====== */}
      <motion.div 
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, ease: "circOut", delay: 0.5 }}
        className="hidden lg:block w-[45%] absolute right-0 top-0 h-screen z-0"
      >
        <div className="relative w-full h-full">
            <Image
                src="/assets/aizen.png" 
                alt="Aizen Sosuke"
                fill
                className="object-cover object-top grayscale contrast-[1.2] brightness-90"
                priority
                unoptimized
            />

            {/* GRADIENT FADE (Blends image into the black background) */}
            <div className="absolute inset-0 bg-linear-to-r from-[#050505] via-transparent to-transparent" />
            <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-[#050505]" />
            
            {/* Tech Overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_50%,transparent_50%)] bg-size-[100%_4px] pointer-events-none" />
        </div>
      </motion.div>


      {/* ====== TRAP OVERLAY (Video) ====== */}
      <AnimatePresence>
        {trapActive && (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center p-4"
            >
                {/* Close Button */}
                <button 
                    onClick={() => setTrapActive(false)}
                    className="absolute top-6 right-6 text-white hover:text-red-500 transition-colors z-50"
                >
                    <X size={40} />
                </button>

                {/* Shatter Flash Effect */}
                <motion.div 
                    initial={{ opacity: 1 }} 
                    animate={{ opacity: 0 }} 
                    transition={{ duration: 0.8 }}
                    className="absolute inset-0 bg-white pointer-events-none mix-blend-overlay z-40" 
                />

                <div className="w-full max-w-6xl aspect-video border-y-4 border-white bg-black relative shadow-2xl">
                    <iframe
                        width="100%"
                        height="100%"
                        src={trapVideoSrc}
                        title="THE TRAP"
                        allow="autoplay; encrypted-media; gyroscope; picture-in-picture"
                        className="w-full h-full object-cover"
                    />
                </div>

                <motion.div 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="mt-8 text-center"
                >
                    <h2 className="text-4xl font-black italic text-white uppercase tracking-tighter mb-2">
                        All According to Plan
                    </h2>
                    <p className="font-mono text-xs text-zinc-500 tracking-[0.3em]">
                        YOU CANNOT ESCAPE THE LOGIC
                    </p>
                </motion.div>

            </motion.div>
        )}
      </AnimatePresence>

    </main>
  );
}