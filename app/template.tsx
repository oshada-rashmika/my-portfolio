"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import LoadingScreen from "@/components/LoadingScreen";
import { AnimatePresence, motion } from "framer-motion";

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(pathname !== "/");

  // --- SYSTEM EVENT DISPATCHER ---
  useEffect(() => {
    if (isLoading) {
      // Tell Pet to go to sleep (Hide)
      window.dispatchEvent(new Event("pet-sleep"));
    } else {
      // Tell Pet to wake up (Show)
      window.dispatchEvent(new Event("pet-wake"));
    }
  }, [isLoading]);

  const handleComplete = () => {
    setIsLoading(false);
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && (
            <LoadingScreen mode="dark" onComplete={handleComplete} />
        )}
      </AnimatePresence>

      {!isLoading && (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            {children}
        </motion.div>
      )}
    </>
  );
}