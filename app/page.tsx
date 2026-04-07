"use client";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import Sidebar from "@/components/Sidebar";
import InteractiveBackground from "@/components/InteractiveBackground";
import LoadingScreen from "@/components/LoadingScreen";
import MagneticButton from "@/components/MagneticButton"; // New Button

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-black">
      {/* SEO Headings for homepage */}
      <h1 className="sr-only">Oshada Rashmika – Web Developer Portfolio</h1>
      <h2 className="sr-only">Welcome to the personal portfolio of Oshada Rashmika</h2>

      {/* 1. LOADING SCREEN */}
      <AnimatePresence>
        {isLoading && (
          <LoadingScreen onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      {/* 2. BACKGROUND (Always visible) */}
      <InteractiveBackground />

      {/* 3. MAIN INTERFACE (Visible after load) */}
      <div className={`transition-opacity duration-1000 ${isLoading ? "opacity-0" : "opacity-100"}`}>
        {/* Navigation */}
        <div className="relative z-50">
            <Sidebar />
        </div>
        {/* Audio Player (Bottom Right) */}
        {/* Main Center Content */}
        <div className="relative z-40 flex flex-col items-center justify-end h-screen pb-24 pointer-events-none">
            {/* The New Magnetic Button (Pointer events auto to allow interaction) */}
            <div className="pointer-events-auto">
                <MagneticButton />
            </div>

            {/* Flavor Text */}
            <p className="mt-6 text-[10px] font-mono text-zinc-400 opacity-60 uppercase tracking-[0.5em]">
                System_Ready // Awaiting_Input
            </p>

        </div>

      </div>
    </main>
  );
}