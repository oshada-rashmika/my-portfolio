"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function AudioPlayer() {
  const pathname = usePathname();
  const [isMuted, setIsMuted] = useState(false);
  const [isPausedByRickRoll, setIsPausedByRickRoll] = useState(false);
  const wasPlayingBeforeRickRoll = useRef(false);

  // Listen for Rick Roll events
  useEffect(() => {
    const handleRickRollStart = () => {
      wasPlayingBeforeRickRoll.current = !isMuted;
      setIsPausedByRickRoll(true);
    };

    const handleRickRollEnd = () => {
      setIsPausedByRickRoll(false);
    };

    window.addEventListener('rickroll-start', handleRickRollStart);
    window.addEventListener('rickroll-end', handleRickRollEnd);

    return () => {
      window.removeEventListener('rickroll-start', handleRickRollStart);
      window.removeEventListener('rickroll-end', handleRickRollEnd);
    };
  }, [isMuted]);

  // 1. DEFINE VALID ROUTES
  // The player will ONLY exist on these paths.
  // Note: /contact has its own background video with audio
  const validRoutes = [
    "/", 
    "/menu", 
    "/character", 
    "/quests", 
    "/certifications", 
    "/playlist",
    "/aizen-ui",
    "/achievements"
  ];

  // 2. GUARD CLAUSE
  if (!validRoutes.includes(pathname || "")) {
    return null;
  }

  const audioSrc = "https://www.youtube.com/embed/72DMrkE8jks?autoplay=1&loop=1&playlist=72DMrkE8jks&controls=0&showinfo=0&mute=0";

  const toggleAudio = () => {
    setIsMuted(!isMuted);
  };

  return (
    <>
      {/* Hidden YouTube Embed - Only renders when not muted and not paused by Rick Roll */}
      {!isMuted && !isPausedByRickRoll && (
        <div className="absolute opacity-0 pointer-events-none">
          <iframe
            width="10"
            height="10"
            src={audioSrc}
            title="Background Audio"
            allow="autoplay"
          />
        </div>
      )}

      <div className="fixed bottom-8 right-8 z-50 flex items-center gap-4">
        {/* Control Button */}
        <button 
          onClick={toggleAudio}
          className={`group relative flex items-center justify-center w-16 h-16 rounded-full transition-all duration-300 ${isMuted ? "opacity-40 grayscale" : "opacity-100 hover:scale-110"}`}
        >
        <div className="relative w-full h-full overflow-hidden rounded-full border-2 border-white/10 bg-black/50 backdrop-blur-sm shadow-[0_0_15px_rgba(255,255,255,0.1)] group-hover:shadow-[0_0_25px_rgba(255,255,255,0.3)] transition-shadow">
            <Image 
              src="/assets/audio.gif"
              alt="Animated audio visualizer for Oshada Rashmika portfolio background music"
              fill
              className="object-cover grayscale contrast-125"
              unoptimized
            />

            {isMuted && (
                <div className="absolute inset-0 flex items-center justify-center z-10">
                    <div className="w-10 h-1 bg-white rotate-45 shadow-lg" />
                </div>
            )}
        </div>
      </button>

      {/* Floating Status Label */}
      <div className="absolute right-20 top-1/2 -translate-y-1/2 overflow-hidden w-0 hover:w-auto group-hover:w-40 transition-all duration-300 pointer-events-none">
        <div className="bg-black/90 text-white text-[10px] font-mono whitespace-nowrap px-4 py-2 rounded-l-md border-l-2 border-green-500 shadow-xl flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${isMuted ? "bg-red-500" : "bg-green-500 animate-pulse"}`} />
            <span>{isMuted ? "AUDIO: MUTED" : "NOW PLAYING: VIBES"}</span>
        </div>
      </div>

      </div>
    </>
  );
}