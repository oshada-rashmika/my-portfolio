"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export default function RickRoll() {
  const [isRickRolled, setIsRickRolled] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  // Dispatch events when Rick Roll state changes
  useEffect(() => {
    if (isRickRolled) {
      window.dispatchEvent(new CustomEvent('rickroll-start'));
    } else {
      window.dispatchEvent(new CustomEvent('rickroll-end'));
    }
  }, [isRickRolled]);

  const handleSecretClick = () => {
    const newCount = clickCount + 1;
    setClickCount(newCount);
    
    // Easter egg triggers after 3 clicks on the secret spot
    if (newCount >= 3) {
      setIsRickRolled(true);
      setClickCount(0);
    }
  };

  return (
    <>
      {/* The Secret Spot - a tiny nearly invisible element in the bottom right corner */}
      <motion.button
        onClick={handleSecretClick}
        className="fixed bottom-2 right-2 w-3 h-3 z-[9999] opacity-[0.02] hover:opacity-10 transition-opacity duration-1000 rounded-full bg-white cursor-default"
        whileHover={{ scale: 1.5 }}
        title="" // No hint!
        aria-label="." // Sneaky
      />

      {/* Rick Roll Modal */}
      <AnimatePresence>
        {isRickRolled && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[10000] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 180 }}
              transition={{ type: "spring", damping: 15 }}
              className="relative bg-zinc-900 rounded-2xl overflow-hidden border-4 border-white/20 shadow-2xl max-w-3xl w-full"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-red-600 to-orange-500 px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🎵</span>
                  <div>
                    <h2 className="font-bold text-white text-lg">You Found a Secret!</h2>
                    <p className="text-white/70 text-xs font-mono">EASTER_EGG_UNLOCKED.exe</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsRickRolled(false)}
                  className="p-2 hover:bg-white/20 rounded-full transition-colors text-white"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Video Container */}
              <div className="aspect-video w-full bg-black">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&start=0"
                  title="You've been Rick Rolled!"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>

              {/* Footer */}
              <div className="px-6 py-4 bg-zinc-800/50 text-center">
                <p className="text-zinc-400 text-sm font-mono">
                  Never gonna give you up, never gonna let you down... 🕺
                </p>
                <p className="text-zinc-600 text-xs mt-2">
                  You clicked the secret spot 3 times. Congrats, you&apos;re curious!
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
