"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, AlertTriangle } from "lucide-react";

export default function RightClickTrap() {
  const [isTrapped, setIsTrapped] = useState(false);
  const [rightClickCount, setRightClickCount] = useState(0);

  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      
      const newCount = rightClickCount + 1;
      setRightClickCount(newCount);
      
      // Trigger on 2nd right-click (first one might be accidental)
      if (newCount >= 2) {
        setIsTrapped(true);
        setRightClickCount(0);
        // Dispatch event to pause background music
        window.dispatchEvent(new CustomEvent('rickroll-start'));
      }
    };

    document.addEventListener('contextmenu', handleContextMenu);
    
    // Reset count after 3 seconds of no right-clicks
    const resetTimer = setTimeout(() => {
      setRightClickCount(0);
    }, 3000);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      clearTimeout(resetTimer);
    };
  }, [rightClickCount]);

  const handleClose = () => {
    setIsTrapped(false);
    window.dispatchEvent(new CustomEvent('rickroll-end'));
  };

  return (
    <AnimatePresence>
      {isTrapped && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[10000] bg-black flex items-center justify-center p-4"
        >
          {/* Glitch/Static effect overlay */}
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 bg-white pointer-events-none z-50"
          />

          <motion.div
            initial={{ scale: 0.8, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.8, y: 50 }}
            transition={{ type: "spring", damping: 20 }}
            className="relative bg-zinc-950 border-2 border-red-500/50 rounded-xl overflow-hidden max-w-3xl w-full shadow-[0_0_100px_rgba(239,68,68,0.3)]"
          >
            {/* Warning Header */}
            <div className="bg-red-500/10 border-b border-red-500/30 px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 1 }}
                >
                  <AlertTriangle className="text-red-500" size={24} />
                </motion.div>
                <div>
                  <h2 className="font-bold text-red-500 text-lg tracking-wide">SECURITY ALERT</h2>
                  <p className="text-red-500/60 text-xs font-mono">UNAUTHORIZED_ACCESS_DETECTED.exe</p>
                </div>
              </div>
              <button
                onClick={handleClose}
                className="p-2 hover:bg-red-500/20 rounded-full transition-colors text-red-500/70 hover:text-red-500"
              >
                <X size={24} />
              </button>
            </div>

            {/* Fake Warning Message */}
            <div className="px-6 py-4 border-b border-zinc-800 bg-black/50">
              <p className="text-zinc-400 text-sm font-mono">
                <span className="text-red-500">[!]</span> Right-click inspection detected. 
                <span className="text-zinc-600"> Initiating counter-measures...</span>
              </p>
            </div>

            {/* Video Container */}
            <div className="aspect-video w-full bg-black">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/6-8E4Nirh9s?autoplay=1&start=0"
                title="You've been caught!"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            {/* Footer */}
            <div className="px-6 py-4 bg-zinc-900/50 flex items-center justify-between">
              <p className="text-zinc-500 text-xs font-mono">
                Nice try, inspector. 🕵️
              </p>
              <div className="flex items-center gap-2 text-zinc-600 text-xs font-mono">
                <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                TRACE_ACTIVE
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
