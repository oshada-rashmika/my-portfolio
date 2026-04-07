"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Sidebar from "@/components/Sidebar";
import { 
  Cpu, Crosshair, Globe, 
  Headphones, ArrowUpRight, Terminal, Zap, Activity, Trophy 
} from "lucide-react";

// --- DATA: THE THREE CLASSES ---
const CHARACTER_CLASSES = {
  AI: {
    id: "AI",
    title: "AGENTIC AI",
    icon: Cpu,
    color: "text-cyan-400",
    description: (
      <div className="space-y-4">
        <h3 className="text-3xl font-black uppercase text-white tracking-tight">The Mind</h3>
        <p className="text-zinc-300 leading-relaxed">
          I am a dynamic professional with a strong foundation in <strong className="text-white">Agentic AI systems</strong>. As a Computer Science undergraduate at NSBM Green University, I focus heavily on <strong className="text-white">AI integration</strong> and <strong className="text-white">autonomous system research</strong>.
        </p>
        <p className="text-zinc-300 leading-relaxed">
          Driven by curiosity, I aim to build solutions that bridge the gap between static code and dynamic, decision-making agents. My long-term goal is to excel in agentic AI while contributing meaningful innovations to the field, ensuring architectures are robust, scalable, and intelligent.
        </p>
      </div>
    ),
    stats: [
      { label: "AGENTIC SYS", value: 95, isLegendary: false },
      { label: "LLM LOGIC", value: 90, isLegendary: false },
      { label: "PYTHON", value: 95, isLegendary: false },
    ]
  },
  OFFSEC: {
    id: "OFFSEC",
    title: "OFFSEC",
    icon: Crosshair,
    color: "text-red-500",
    description: (
      <div className="space-y-4">
        <h3 className="text-3xl font-black uppercase text-white tracking-tight">The Breaker</h3>
        <p className="text-zinc-300 leading-relaxed">
          My background is built on <strong className="text-white">Computer Science</strong> and <strong className="text-white">Offensive Security</strong>. I have hands-on experience in <strong className="text-white">Red Teaming</strong>, ethical hacking, and <strong className="text-white">CTF competitions</strong>.
        </p>
        <p className="text-zinc-300 leading-relaxed">
          I am recognized for my strategic mindset and resilience under pressure. I excel at identifying vulnerabilities through penetration testing and approaching security challenges with a breaker&apos;s mentality to secure critical infrastructure. I thrive in high-stakes environments where precision is paramount.
        </p>
      </div>
    ),
    stats: [
      { label: "PEN-TESTING", value: 90, isLegendary: false },
      { label: "EXPLOITATION", value: 85, isLegendary: false },
      { label: "STRATEGY", value: 88, isLegendary: false },
    ]
  },
  DEV: {
    id: "DEV",
    title: "CREATIVE DEV",
    icon: Globe,
    color: "text-yellow-400",
    description: (
      <div className="space-y-4">
        <h3 className="text-3xl font-black uppercase text-white tracking-tight">The Creator</h3>
        <p className="text-zinc-300 leading-relaxed">
          My technical depth is combined with creative versatility. Before transitioning to security, I built a strong portfolio in <strong className="text-white">UI/UX design</strong>, videography, and content development.
        </p>
        <p className="text-zinc-300 leading-relaxed">
          This blend allows me to approach technical problems with clarity and user-centered thinking. I have gained real experience in leading cross-functional teams, mentoring peers, and delivering high-impact projects that marry complex logic with intuitive visual storytelling.
        </p>
      </div>
    ),
    stats: [
      { label: "UI/UX DESIGN", value: 100, isLegendary: true },
      { label: "ARCHITECTURE", value: 85 },
      { label: "VISUALS", value: 90 },
    ]
  }
};

// --- COMPONENT: STAT BAR ---
const StatBar = ({ label, value, isLegendary }: { label: string, value: number, isLegendary?: boolean }) => (
    <div className="w-full">
        <div className="flex justify-between text-[10px] font-bold mb-1 uppercase tracking-wider text-zinc-500">
            <span className={isLegendary ? "text-yellow-500 flex items-center gap-1" : ""}>
                {isLegendary && <Zap size={10} fill="currentColor" />} {label}
            </span>
            <span>{value}%</span>
        </div>
        <div className="h-2 w-full bg-black/50 rounded-full overflow-hidden border border-zinc-800">
            <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${value}%` }}
                transition={{ duration: 1, ease: "circOut" }}
                className={`h-full rounded-full ${isLegendary ? "bg-yellow-500" : "bg-white"}`}
            />
        </div>
    </div>
)

export default function CharacterPage() {
  const [activeClass, setActiveClass] = useState<keyof typeof CHARACTER_CLASSES>("AI");
  const data = CHARACTER_CLASSES[activeClass];

  return (
    <main className="min-h-screen w-full bg-black text-white font-sans p-4 md:p-8 lg:p-12 overflow-hidden relative flex items-center justify-center">
      <div className="fixed z-50"><Sidebar /></div>

      {/* --- YOUTUBE BACKGROUND VIDEO (Muted) --- */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-[-20%] w-[140%] h-[140%]">
          <iframe
            src="https://www.youtube.com/embed/nhr0igKYIMQ?autoplay=1&loop=1&playlist=nhr0igKYIMQ&controls=0&showinfo=0&mute=1&modestbranding=1&rel=0&enablejsapi=1&version=3&playsinline=1&vq=small"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-screen h-[56.25vw] min-h-screen min-w-[177.78vh]"
            allow="autoplay; encrypted-media"
            title="Background Video"
            frameBorder="0"
            loading="lazy"
          />
        </div>
      </div>

      {/* Video Overlays for blending */}
      <div className="fixed inset-0 bg-black/80 z-[1] pointer-events-none" />
      <div className="fixed inset-0 bg-linear-to-t from-black via-black/60 to-black z-[1] pointer-events-none" />
      <div className="fixed inset-0 bg-linear-to-r from-black/70 via-transparent to-black/70 z-[1] pointer-events-none" />

      {/* --- BACKGROUND GRID --- */}
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none z-[2]" 
           style={{ backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)', backgroundSize: '40px 40px' }} 
      />

      {/* --- MAIN BENTO LAYOUT --- */}
      <div className="w-full max-w-350 h-full md:h-[85vh] grid grid-cols-1 md:grid-cols-12 grid-rows-[auto_1fr_auto] md:grid-rows-12 gap-6 relative z-10">

        {/* 1. HEADER (Row 1) */}
        <div className="col-span-1 md:col-span-12 md:row-span-2 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-zinc-900 pb-6">
             {/* THE TITLE (Outlined Effect Applied Here) */}
             <h1 className="text-6xl md:text-8xl font-black italic tracking-tighter text-white leading-none">
                 THE <span className="text-transparent" style={{ WebkitTextStroke: "2px white" }}>ARCHITECT</span>
             </h1>

             {/* Class Selector Pills */}
             <div className="flex bg-zinc-900/80 p-1.5 rounded-full border border-zinc-800 backdrop-blur-sm">
                {Object.values(CHARACTER_CLASSES).map((cls) => (
                    <button
                        key={cls.id}
                        onClick={() => setActiveClass(cls.id as keyof typeof CHARACTER_CLASSES)}
                        className={`px-6 py-2 rounded-full font-bold text-xs uppercase tracking-wider transition-all duration-300
                            ${activeClass === cls.id 
                                ? "bg-white text-black shadow-lg" 
                                : "text-zinc-500 hover:text-white"
                            }
                        `}
                    >
                        {cls.title}
                    </button>
                ))}
             </div>
        </div>


        {/* 2. BIO PANEL (Left Side - Large) */}
        <AnimatePresence mode="wait">
        <motion.div 
            key={activeClass}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="col-span-1 md:col-span-8 md:row-span-10 bg-zinc-900/50 rounded-4xl border border-zinc-800 p-8 md:p-12 relative overflow-hidden group flex flex-col justify-between"
        >
            {/* Background Decor */}
            <div className={`absolute -right-10 -top-10 opacity-[0.02] transition-colors duration-500 ${data.color}`}>
                <data.icon size={500} />
            </div>

            {/* Content Container */}
            <div className="relative z-10 max-w-3xl">
                {data.description}
            </div>

            {/* Bottom Decor */}
            <div className="mt-8 pt-8 border-t border-zinc-800/50 flex items-center justify-between text-xs font-mono text-zinc-600 uppercase tracking-widest">
                <div className="flex items-center gap-2">
                    <Activity size={14} className="animate-pulse text-green-500" />
                    System_Ready
                </div>
                <span>ID: ARCH-01 // {activeClass}</span>
            </div>
        </motion.div>
        </AnimatePresence>


        {/* 3. RIGHT COLUMN STACK */}
        <div className="col-span-1 md:col-span-4 md:row-span-10 flex flex-col gap-6 h-full">
            
            {/* TOP CARD: AVATAR */}
            <div className="flex-1 bg-zinc-800/50 rounded-4xl relative overflow-hidden border border-zinc-700/50 group min-h-60">
                <Image 
                    src="/assets/me.gif"
                    alt="Avatar"
                    fill
                    className="object-cover object-center grayscale contrast-125 group-hover:scale-110 group-hover:grayscale-0 transition-all duration-500"
                    unoptimized
                />
                
                {/* Level Tag */}
                <div className="absolute top-4 right-4 bg-white text-black text-[10px] font-black px-3 py-1 rounded-full z-20">
                    LVL.21
                </div>
            </div>

            {/* BOTTOM CARD: STATS & PLAYLIST */}
            <div className="h-auto bg-black rounded-4xl p-5 border border-zinc-800 flex flex-col justify-between gap-4 shadow-2xl">
                
                {/* Stats */}
                <div className="space-y-4">
                    <div className="flex items-center gap-2 text-zinc-500 mb-2">
                         <Terminal size={14} />
                         <span className="text-[10px] font-mono uppercase tracking-widest">Skill Sync</span>
                    </div>
                     {data.stats.map((stat, i) => (
                         <StatBar key={i} label={stat.label} value={stat.value} isLegendary={stat.isLegendary} />
                     ))}
                </div>

                {/* Playlist Button */}
                <a 
                    href="https://music.youtube.com/playlist?list=PLNgH9AUveKGSzKADAO8XudT1j_QgU0KIb&si=2SIaIm0Bru2zG8R5" 
                    target="_blank" rel="noopener noreferrer"
                    className="w-full bg-white text-black rounded-xl py-3 flex items-center justify-center gap-3 font-bold text-xs tracking-[0.2em] uppercase hover:bg-zinc-200 transition-colors group"
                >
                    <Headphones size={16} className="group-hover:animate-bounce" /> Vibes_//01
                    <ArrowUpRight size={14} />
                </a>

                {/* Achievements Button */}
                <Link 
                    href="/achievements"
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl py-3 flex items-center justify-center gap-3 font-bold text-xs tracking-[0.2em] uppercase hover:from-purple-500 hover:to-pink-500 transition-all group"
                >
                    <Trophy size={16} className="group-hover:animate-bounce" /> Achievements
                    <ArrowUpRight size={14} />
                </Link>

            </div>

        </div>
        
        {/* --- 4. THE STICKER BADGE --- */}
        <div className="hidden md:block absolute top-[22%] left-[66%] -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none">
            <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="w-28 h-28 bg-black rounded-full border border-zinc-700 flex items-center justify-center shadow-xl"
            >
                 <svg className="w-full h-full absolute inset-0 p-1" viewBox="0 0 100 100">
                    <path id="circlePath" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" fill="transparent" />
                    <text className="text-[11px] font-bold uppercase fill-white tracking-[0.25em]">
                        <textPath href="#circlePath" startOffset="0%">
                            • The Architect • System Online 
                        </textPath>
                    </text>
                 </svg>
                 <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-black font-black text-lg">
                    21
                 </div>
            </motion.div>
        </div>

      </div>

    </main>
  );
}