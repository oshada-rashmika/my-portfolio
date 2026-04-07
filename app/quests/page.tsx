"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Sidebar from "@/components/Sidebar";
import { 
  Star, GitFork, ExternalLink, Zap, 
  Code, Terminal, Globe, Database, 
  Cpu, Sword, Shuffle
} from "lucide-react";

// --- TYPES ---
interface Repo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
}

// --- CONFIG: THEMES ---
const THEMES: Record<string, { color: string, icon: React.ComponentType<{ size?: number; className?: string }>, kanji: string, bg: string }> = {
  TypeScript: { color: "#3178C6", icon: Zap, kanji: "雷", bg: "bg-blue-950" },
  JavaScript: { color: "#F7DF1E", icon: Code, kanji: "脚本", bg: "bg-yellow-950" },
  Python: { color: "#3776AB", icon: Terminal, kanji: "蛇", bg: "bg-cyan-950" },
  React: { color: "#61DAFB", icon: Cpu, kanji: "核", bg: "bg-sky-950" },
  default: { color: "#ffffff", icon: Sword, kanji: "技", bg: "bg-zinc-900" }
};

export default function QuestsPage() {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        // 1. Fetch your GitHub Repos
        const githubRes = await fetch("https://api.github.com/users/oshada-rashmika/repos?sort=updated&per_page=50");
        const githubData = await githubRes.json();
        
        // 2. Fetch Specific ASMO Project as requested
        const asmoRes = await fetch("https://api.github.com/repos/nschandunu/ASMO");
        const asmoData = await asmoRes.json();
        
        if (Array.isArray(githubData)) {
            // Combine your repos with the ASMO quest
            setRepos([asmoData, ...githubData]);
        }
      } catch (error) {
        console.error("Fetch failed:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  // GACHA MECHANIC: Scroll to a random quest
  const summonRandom = () => {
    const randomRepo = repos[Math.floor(Math.random() * repos.length)];
    if (randomRepo) {
        const element = document.getElementById(`repo-${randomRepo.id}`);
        element?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <div className="min-h-screen w-full bg-zinc-950 text-white overflow-x-hidden relative pb-20">
      
      {/* GLOBAL SIDEBAR */}
      <Sidebar />

      {/* --- BACKGROUND FX --- */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-10 bg-[repeating-linear-gradient(90deg,transparent,transparent_49px,white_50px)]" />
      <div className="fixed inset-0 pointer-events-none z-0 bg-[radial-gradient(circle_at_center,transparent_0%,black_100%)] opacity-50" />

      {/* --- HEADER --- */}
      <div className="relative z-10 pt-24 px-6 md:px-12 max-w-7xl mx-auto pl-4 md:pl-20">
        <div className="flex flex-col md:flex-row items-end justify-between gap-6">
            <motion.div initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
                <h1 className="text-7xl md:text-9xl font-black italic tracking-tighter uppercase leading-[0.8]">
                    <span className="text-white drop-shadow-[0_4px_0_rgba(255,255,255,0.2)]">QUEST</span>
                    <span 
                        className="block text-6xl md:text-8xl text-transparent mt-2" 
                        style={{ WebkitTextStroke: "2px white" }}
                    >
                        ARCHIVES
                    </span>
                </h1>
                <div className="bg-white text-black inline-block px-4 py-1 mt-6 font-mono text-sm transform -skew-x-12 font-bold border-2 border-white hover:bg-black hover:text-white transition-colors cursor-default">
                    {/* SYSTEM: TERMINAL_ONLY // BOUNTIES: ACTIVE */}
                </div>
            </motion.div>

            {/* SUMMON BUTTON */}
            <motion.button
                onClick={summonRandom}
                whileHover={{ scale: 1.05, rotate: 2 }}
                whileTap={{ scale: 0.95 }}
                className="group relative px-8 py-4 bg-white text-black font-black text-xl uppercase tracking-widest overflow-hidden border-4 border-white transform -skew-x-12"
            >
                <span className="relative z-10 flex items-center gap-2">
                    <Shuffle size={20} /> Summon Quest
                </span>
                <div className="absolute inset-0 bg-purple-500 translate-y-full group-hover:translate-y-0 transition-transform duration-200 z-0" />
                <span className="absolute inset-0 z-10 flex items-center gap-2 text-white opacity-0 group-hover:opacity-100 transition-opacity justify-center">
                    <Shuffle size={20} /> Summon Quest
                </span>
            </motion.button>
        </div>
      </div>

      {/* --- GRID CONTENT --- */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:pl-20 mt-12">
        {loading ? (
             <div className="h-64 flex items-center justify-center text-2xl font-black animate-pulse text-white/20 uppercase tracking-widest">
                SYNCING_DATABASE...
             </div>
        ) : (
             <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
                 {repos.map((repo, i) => (
                    <ProjectCard key={repo.id} repo={repo} index={i} />
                 ))}
             </div>
        )}
      </div>

    </div>
  );
}

// --- SUB-COMPONENT: PROJECT CARD ---
function ProjectCard({ repo, index }: { repo: Repo, index: number }) {
    const theme = THEMES[repo.language] || THEMES.default;
    const Icon = theme.icon;

    return (
        <motion.a
            id={`repo-${repo.id}`}
            href={repo.html_url}
            target="_blank"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05 }}
            className="block break-inside-avoid relative group cursor-pointer mb-6"
        >
            {/* MANGA FRAME */}
            <div className="relative bg-zinc-900 border-4 border-white p-1 shadow-[8px_8px_0px_rgba(255,255,255,0.1)] group-hover:shadow-[12px_12px_0px_#ffffff] transition-all overflow-hidden">
                
                {/* PREVIEW AREA */}
                <div className={`h-52 relative overflow-hidden border-b-4 border-white ${theme.bg}`}>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <Icon size={80} className="text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.5)] group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    
                    {/* Kanji Decor */}
                    <div className="absolute -right-4 -bottom-8 text-9xl font-black text-white/10 select-none leading-none pointer-events-none">
                        {theme.kanji}
                    </div>

                    {/* Stats Badge */}
                    <div className="absolute top-2 left-2 bg-white text-black px-2 py-1 font-mono text-[10px] border-2 border-black font-bold">
                        LVL: {repo.stargazers_count + 1}
                    </div>
                </div>

                {/* INFO AREA */}
                <div className="p-5 bg-black relative">
                    <h2 className="text-2xl font-black uppercase tracking-tighter leading-none mb-3 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-zinc-500 transition-all">
                        {repo.name}
                    </h2>

                    <p className="font-mono text-[11px] text-zinc-400 line-clamp-2 border-l-2 border-white pl-3 mb-4">
                        {repo.description || "ENCRYPTED_DATA_STREAM: No briefing available for this mission."}
                    </p>

                    <div className="flex items-center justify-between font-bold text-xs uppercase">
                        <div className="flex items-center gap-4 text-white">
                            <span className="flex items-center gap-1 group-hover:text-yellow-400 transition-colors">
                                <Star size={14} fill="currentColor" /> {repo.stargazers_count}
                            </span>
                            <span className="flex items-center gap-1 group-hover:text-blue-400 transition-colors">
                                <GitFork size={14} /> {repo.forks_count}
                            </span>
                        </div>
                        
                        <div className="flex items-center gap-1 bg-white text-black px-3 py-1 transform skew-x-[-15deg] group-hover:bg-yellow-400 transition-colors">
                            <span className="text-[10px]">ACCEPT_QUEST</span> <ExternalLink size={12} />
                        </div>
                    </div>
                </div>

                {/* ACTION OVERLAY */}
                <div 
                    className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 mix-blend-screen"
                    style={{ background: `linear-gradient(45deg, ${theme.color}15, transparent)` }}
                />
            </div>
        </motion.a>
    );
}