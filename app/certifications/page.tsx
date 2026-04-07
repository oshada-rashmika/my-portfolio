"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Sidebar from "@/components/Sidebar";
import { 
  Award, 
  ExternalLink, 
  ShieldCheck, 
  Zap, 
  Crown,
  Lock,
  Target,
  BrainCircuit
} from "lucide-react";

// --- TYPES ---
interface Certification {
  id: string;
  title: string;
  issuer: string;
  rarity: "S" | "A" | "B";
  color: string;
  kanji: string;
}

interface CertRelicProps {
  cert: Certification;
  index: number;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
}

// --- DATA: POPULATED FROM YOUR IMAGES ---
const CERTS: Certification[] = [
  {
    id: "1",
    title: "Cambridge PET",
    issuer: "Cambridge English",
    rarity: "S",
    color: "#dc2626",
    kanji: "英" // English
  },
  {
    id: "2",
    title: "Advent of Cyber 2025",
    issuer: "TryHackMe",
    rarity: "S",
    color: "#ff0044",
    kanji: "鬼" // Demon/Cyber
  },
  {
    id: "3",
    title: "Advent of Cyber 2022",
    issuer: "TryHackMe",
    rarity: "S",
    color: "#ff0044",
    kanji: "影" // Shadow/Cyber
  },
  {
    id: "4",
    title: "Introduction to Gemini",
    issuer: "SkillUp Online",
    rarity: "S",
    color: "#4285F4",
    kanji: "核" // Core/AI
  },
  {
    id: "5",
    title: "Encoder-Decoder Architecture",
    issuer: "SkillUp Online",
    rarity: "S",
    color: "#8b5cf6",
    kanji: "解" // Decode
  },
  {
    id: "6",
    title: "Introduction to AI",
    issuer: "SkillUp Online",
    rarity: "S",
    color: "#06b6d4",
    kanji: "智" // Intelligence/Wisdom
  },
  {
    id: "7",
    title: "CyberSprint 2.0",
    issuer: "CSSL GenZ Chapter",
    rarity: "A",
    color: "#00ff99",
    kanji: "走" // Sprint
  },
  {
    id: "8",
    title: "Introduction to Cyber Security",
    issuer: "SkillUp Online",
    rarity: "A",
    color: "#22c55e",
    kanji: "盾" // Shield
  },
  {
    id: "9",
    title: "Crisis Management",
    issuer: "London School of PR",
    rarity: "A",
    color: "#0ea5e9",
    kanji: "危" // Crisis/Danger
  },
  {
    id: "10",
    title: "Fundamentals of 5G Technology",
    issuer: "EAcademy",
    rarity: "A",
    color: "#a855f7",
    kanji: "波" // Wave/Signal
  },
  {
    id: "11",
    title: "Egyptian Mathematics",
    issuer: "The Open University",
    rarity: "A",
    color: "#f59e0b",
    kanji: "算" // Calculation
  },
  {
    id: "12",
    title: "Web Design for Beginners",
    issuer: "University of Moratuwa",
    rarity: "A",
    color: "#f97316",
    kanji: "網" // Web/Network
  },
  {
    id: "13",
    title: "Python for Beginners",
    issuer: "University of Moratuwa",
    rarity: "A",
    color: "#ffd43b",
    kanji: "蛇" // Snake/Python
  },
  {
    id: "14",
    title: "Forensic Science & Fingerprints",
    issuer: "The Open University",
    rarity: "A",
    color: "#3b82f6",
    kanji: "探" // Detective/Investigate
  },
  {
    id: "15",
    title: "UI/UX Design",
    issuer: "Great Learning",
    rarity: "A",
    color: "#ec4899",
    kanji: "美" // Beauty/Design
  },
  {
    id: "16",
    title: "Mathematics for Science & Tech",
    issuer: "The Open University",
    rarity: "A",
    color: "#6366f1",
    kanji: "数" // Math/Numbers
  }
];

export default function CertificationsPage() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <div className="min-h-screen w-full bg-black text-white overflow-x-hidden relative font-sans">
      <Sidebar />

      {/* --- BACKGROUND DYNAMICS --- */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
        <div className="absolute inset-0 bg-linear-to-br from-zinc-900 via-black to-zinc-900" />
        {/* Anime Action Lines */}
        <div className="absolute inset-0 opacity-10 bg-[repeating-linear-gradient(90deg,transparent,transparent_49px,white_50px)]" />
      </div>

      {/* --- HEADER --- */}
      <div className="relative z-10 pt-20 px-6 md:px-24 pl-4 md:pl-32">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-2">
            <Crown className="text-yellow-400 animate-pulse" size={32} />
            <span className="font-mono text-yellow-400 tracking-[0.4em] text-xs uppercase">{`// System: Archive_Logged`}</span>
          </div>
          <h1 className="text-6xl md:text-9xl font-black italic uppercase tracking-tighter leading-none text-white">
            MASTERY <br /> 
            <span className="text-transparent" style={{ WebkitTextStroke: "2px white" }}>SCROLLS</span>
          </h1>
        </motion.div>

        {/* --- CERT GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-32">
          {CERTS.map((cert, index) => (
            <CertRelic 
              key={cert.id} 
              cert={cert} 
              index={index} 
              isHovered={hoveredId === cert.id}
              onHover={() => setHoveredId(cert.id)}
              onLeave={() => setHoveredId(null)}
            />
          ))}
        </div>
      </div>

      {/* --- VERTICAL DECOR --- */}
      <div className="fixed right-8 bottom-8 z-10 hidden xl:block pointer-events-none">
        <div className="writing-mode-vertical text-[10px] font-mono tracking-[1.5em] text-white/20 uppercase">
          Continuous_Learning // Skill_Unlocked // Mastery_Protocol
        </div>
      </div>
    </div>
  );
}

// --- SUB-COMPONENT: THE RELIC CARD ---
function CertRelic({ cert, index, isHovered, onHover, onLeave }: CertRelicProps) {
  const Icon = cert.rarity === "S" ? Zap : cert.rarity === "A" ? ShieldCheck : Target;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      className="relative h-72 group"
    >
      {/* GLOW EFFECT LAYER */}
      <div 
        className="absolute inset-0 blur-3xl rounded-full opacity-0 group-hover:opacity-30 transition-opacity duration-700 pointer-events-none"
        style={{ backgroundColor: cert.color }}
      />

      {/* MANGA-STYLE CARD FRAME */}
      <div className="relative h-full w-full bg-zinc-950 border-4 border-white p-1 shadow-[10px_10px_0px_rgba(255,255,255,0.1)] group-hover:shadow-[15px_15px_0px_#ffffff] group-hover:-translate-x-2 group-hover:-translate-y-2 transition-all duration-300 overflow-hidden flex flex-col">
        
        {/* KANJI BACKGROUND (The "Spirit") */}
        <div className="absolute -right-4 -top-8 text-[160px] font-black text-white/5 select-none pointer-events-none group-hover:text-white/10 transition-colors leading-none italic">
          {cert.kanji}
        </div>

        {/* TOP BAR: RANK & DATE */}
        <div className="flex items-center justify-between p-4 relative z-10 border-b-2 border-white/10 group-hover:border-white transition-colors">
            <div className={`text-3xl font-black italic tracking-tighter ${cert.rarity === 'S' ? 'text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.5)]' : 'text-zinc-500'}`}>
                {cert.rarity}_RANK
            </div>
            <Lock size={14} className="text-white/20 group-hover:text-white transition-colors" />
        </div>

        {/* CONTENT SECTION */}
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center relative z-10">
            <motion.div
                animate={isHovered ? { scale: [1, 1.2, 1], rotate: [0, 5, -5, 0] } : {}}
                className="mb-4 text-white group-hover:text-white transition-colors"
            >
                <Icon size={56} className="drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]" />
            </motion.div>

            <h3 className="font-black uppercase text-2xl tracking-tighter leading-none mb-2 group-hover:text-yellow-400 transition-colors">
                {cert.title}
            </h3>
            
            <div className="bg-white text-black px-2 py-0.5 text-[9px] font-black uppercase transform -skew-x-12">
                ISSUED BY: {cert.issuer}
            </div>
        </div>

        {/* FOOTER: ACTION BAR */}
        <div className="bg-white/5 group-hover:bg-white p-3 flex items-center justify-between transition-colors">
            <span className="text-[10px] font-mono font-bold text-white/40 group-hover:text-black uppercase tracking-widest">
                Verification_Valid
            </span>
            <ExternalLink size={14} className="text-white group-hover:text-black" />
        </div>

        {/* DECORATIVE CROSSHAIRS */}
        <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-white" />
        <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-white" />
      </div>
    </motion.div>
  );
}