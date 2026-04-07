"use client";
import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Home, 
  User, 
  Code, 
  Mail, 
  ChevronRight, 
  Terminal,
  X,
  Award,
  Cpu
} from "lucide-react";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { name: "START", icon: Home, desc: "MAIN_MENU_LOG", path: "/" },
    { name: "CHARACTER", icon: User, desc: "STATS_&_BIO", path: "/character" },
    { name: "QUESTS", icon: Code, desc: "PROJECT_DATABASE", path: "/quests" },
    { name: "CERTIFICATIONS", icon: Award, desc: "EARNED_BADGES", path: "/certifications" },
    { name: "CONTACT", icon: Mail, desc: "ENCRYPTED_COMMS", path: "/contact" },
  ];

  return (
    <>
      {/* --- TACTICAL SIDE-TAB (TRIGGER) --- */}
      <motion.button
        onClick={() => setIsOpen(true)}
        initial={{ x: -10 }}
        animate={{ x: 0 }}
        whileHover={{ x: 5 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className={`fixed left-0 top-1/2 -translate-y-1/2 z-50 group flex flex-col items-center py-6 px-2 
          bg-white text-black border-y-2 border-r-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,0.5)] 
          hover:shadow-[8px_8px_0px_rgba(0,0,0,1)] transition-all cursor-pointer overflow-hidden
          ${isOpen ? "opacity-0 pointer-events-none" : "opacity-100"}
        `}
      >
        <div className="w-px h-8 bg-black/30 mb-4" />
        <div className="writing-mode-vertical text-xs font-bold tracking-[0.3em] uppercase flex items-center gap-4 opacity-70 group-hover:opacity-100 transition-opacity">
          <span className="rotate-180">SYSTEM</span>
          <span className="rotate-180 text-black/40">{"//"}</span>
          <span className="rotate-180">MENU</span>
        </div>
        <div className="mt-6 mb-2">
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </div>
        <div className="flex flex-col gap-0.5 mt-2">
            <div className="w-1 h-8 bg-black" />
            <div className="w-1 h-2 bg-black/50" />
            <div className="w-1 h-4 bg-black" />
        </div>
      </motion.button>


      {/* --- MAIN MENU OVERLAY --- */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-[2px] z-40"
            />

            {/* Menu Panel */}
            <motion.nav
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 120 }}
              className="fixed top-0 left-0 h-full w-full md:w-112.5 bg-zinc-950 border-r-4 border-white z-50 flex flex-col shadow-2xl overflow-hidden"
            >
              
              {/* Header */}
              <div className="h-20 border-b border-zinc-800 flex items-center justify-between px-8 bg-black text-white">
                <div className="flex items-center gap-3">
                    <Terminal size={20} className="text-green-500 animate-pulse" />
                    <span className="font-mono text-sm tracking-widest text-green-500">
                        ROOT@PORTFOLIO:~#
                    </span>
                </div>
                <button 
                    onClick={() => setIsOpen(false)}
                    className="p-2 hover:bg-white/10 rounded-full transition-colors"
                >
                    <X size={24} />
                </button>
              </div>

              {/* MENU LINKS CONTAINER */}
              <div className="flex-1 flex flex-col justify-center px-6 gap-6 relative">
                
                {/* Background Decor */}
                <div className="absolute right-0 top-1/2 -translate-y-1/2 font-black text-[200px] text-white/5 pointer-events-none select-none rotate-90 md:rotate-0">
                    MENU
                </div>

                {menuItems.map((item, index) => (
                  <Link 
                    key={item.name} 
                    href={item.path} 
                    onClick={() => setIsOpen(false)} // Moved onClick to Link
                    className="block w-full"         // Ensure Link fills the width
                  >
                    <motion.div // Changed from motion.a to motion.div
                        initial={{ x: -50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.1 + (index * 0.05) }}
                        className="group relative flex items-center justify-between p-4 cursor-pointer overflow-hidden border border-transparent hover:border-zinc-700 transition-colors"
                    >
                        {/* HOVER EFFECT: Sliding White Block */}
                        <div className="absolute inset-0 bg-white -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out z-0" />

                        {/* Left Side: Icon & Text */}
                        <div className="relative z-10 flex items-center gap-6">
                            {/* Icon Box */}
                            <div className="p-2 border border-zinc-700 group-hover:border-black bg-black group-hover:bg-white transition-colors duration-300">
                                <item.icon size={24} className="text-white group-hover:text-black transition-colors duration-300" />
                            </div>

                            <div className="flex flex-col">
                                {/* Main Title */}
                                <span className="text-3xl md:text-4xl font-black uppercase italic text-white group-hover:text-black transition-colors duration-300 flex items-center gap-2">
                                    {item.name}
                                    <span className="opacity-0 group-hover:opacity-100 text-sm transition-opacity duration-300 translate-y-1">
                                        {`<<`}
                                    </span>
                                </span>
                                {/* Description Subtext */}
                                <span className="text-[10px] font-mono tracking-[0.2em] text-zinc-500 group-hover:text-black/70 transition-colors duration-300">
                                    {`// ${item.desc}`}
                                </span>
                            </div>
                        </div>

                        {/* Right Side: Tech Arrow */}
                        <div className="relative z-10 opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-300">
                            <Cpu size={24} className="text-black animate-spin-slow" />
                        </div>

                    </motion.div>
                  </Link>
                ))}
              </div>

              {/* Footer */}
              <div className="p-6 border-t border-zinc-800 bg-black/50">
                <div className="flex justify-between items-center opacity-60">
                    <div className="flex flex-col text-[10px] font-mono gap-1 text-white/50">
                        <span>SYS.ID: 492-AX</span>
                        <span>STATUS: ONLINE</span>
                    </div>
                    {/* Animated Barcode */}
                    <div className="flex gap-0.5 h-6 items-end">
                        {[...Array(10)].map((_, i) => (
                            <motion.div 
                                key={i}
                                animate={{ height: [10, 24, 10] }}
                                transition={{ repeat: Infinity, duration: 1, delay: i * 0.1 }}
                                className="w-0.5 bg-zinc-500"
                            />
                        ))}
                    </div>
                </div>
              </div>

            </motion.nav>
          </>
        )}
      </AnimatePresence>
      
      {/* Global CSS for vertical text support */}
      <style jsx global>{`
        .writing-mode-vertical {
          writing-mode: vertical-rl;
          text-orientation: mixed;
        }
      `}</style>
    </>
  );
}