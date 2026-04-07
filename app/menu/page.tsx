"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { 
  Home, User, Code, Award, Mail, ArrowUpRight 
} from "lucide-react";

// --- CONFIG ---
const MENU_ITEMS = [
  { 
    id: "START", 
    label: "START", 
    shortLabel: "START",
    path: "/", 
    icon: Home, 
    num: "01", 
    fontSize: "text-6xl md:text-8xl" 
  },
  { 
    id: "CHARACTER", 
    label: "CHARACTER", 
    shortLabel: "CHARACTER", 
    path: "/character", 
    icon: User, 
    num: "02", 
    fontSize: "text-4xl md:text-6xl" 
  }, 
  { 
    id: "QUESTS", 
    label: "QUESTS", 
    shortLabel: "QUESTS",
    path: "/quests", 
    icon: Code, 
    num: "03", 
    fontSize: "text-6xl md:text-8xl" 
  },
  { 
    id: "CERTIFICATIONS", 
    label: "CERTIFICATIONS", 
    shortLabel: "CERTS", // Abbreviated for vertical mode
    path: "/certifications", 
    icon: Award, 
    num: "04", 
    fontSize: "text-3xl md:text-5xl" 
  }, 
  { 
    id: "CONTACT", 
    label: "CONTACT", 
    shortLabel: "CONTACT",
    path: "/contact", 
    icon: Mail, 
    num: "05", 
    fontSize: "text-5xl md:text-7xl" 
  }
];

export default function MenuPage() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <main className="min-h-screen w-full bg-[#050505] text-white overflow-hidden relative font-sans flex flex-col justify-center items-center">

      {/* --- BACKGROUND DECOR --- */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03]" 
           style={{ backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)', backgroundSize: '60px 60px' }} 
      />
      
      {/* --- MAIN MENU CONTAINER --- */}
      <div className="w-[95vw] max-w-450 h-[60vh] flex items-stretch gap-1 z-10">
        
        {MENU_ITEMS.map((item, index) => {
            const isActive = activeIndex === index;
            
            return (
                <Link 
                    key={item.id} 
                    href={item.path}
                    className={`relative group transition-[flex] duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] overflow-hidden border-r border-zinc-800 last:border-r-0
                        ${isActive ? "flex-3" : "flex-1"}
                    `}
                    onMouseEnter={() => setActiveIndex(index)}
                    onMouseLeave={() => setActiveIndex(null)}
                >
                    <div className={`relative h-full w-full flex flex-col justify-between p-4 md:p-10 transition-colors duration-500
                        ${isActive ? "bg-white text-black" : "bg-black/50 hover:bg-zinc-900 text-zinc-500"}
                    `}>
                        
                        {/* --- TOP: NUMBER --- */}
                        <div className="flex justify-between items-start border-b border-current pb-4 transition-all duration-500">
                            <span className="text-sm font-mono font-bold tracking-widest">
                                {item.num}
                            </span>
                            <motion.div 
                                animate={{ rotate: isActive ? 45 : 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                <ArrowUpRight size={24} />
                            </motion.div>
                        </div>

                        {/* --- CENTER CONTENT --- */}
                        <div className="flex-1 flex items-center justify-center relative w-full">
                            
                            {/* VERTICAL TEXT (When Inactive) */}
                            {/* Fixed cropping by using absolute positioning + smaller font + shortLabel */}
                            <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 ${isActive ? "opacity-0" : "opacity-100"}`}>
                                <span className="writing-mode-vertical text-2xl md:text-4xl font-black tracking-[0.2em] uppercase whitespace-nowrap rotate-180 opacity-50 select-none">
                                    {item.shortLabel}
                                </span>
                            </div>

                            {/* HORIZONTAL EXPANDED TEXT (When Active) */}
                            <div className={`w-full flex flex-col items-center gap-4 transition-all duration-500 transform ${isActive ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-10 scale-90"}`}>
                                <item.icon size={48} strokeWidth={1.5} />
                                <h2 className={`${item.fontSize} font-black italic tracking-tighter uppercase leading-none text-center wrap-break-word w-full`}>
                                    {item.label}
                                </h2>
                            </div>

                        </div>

                        {/* --- BOTTOM: DECOR --- */}
                        <div className="h-2 w-full bg-current opacity-10 rounded-full overflow-hidden">
                            {isActive && (
                                <motion.div 
                                    className="h-full bg-black"
                                    initial={{ width: "0%" }}
                                    animate={{ width: "100%" }}
                                    transition={{ duration: 0.8, ease: "circOut" }}
                                />
                            )}
                        </div>

                    </div>
                </Link>
            );
        })}

      </div>

      <style jsx global>{`
        .writing-mode-vertical {
            writing-mode: vertical-rl;
        }
      `}</style>

    </main>
  );
}