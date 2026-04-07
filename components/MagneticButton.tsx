"use client";
import { useRef, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";
import { ArrowRight, Terminal } from "lucide-react";
import { useRouter } from "next/navigation"; // 1. Import Router

export default function MagneticButton() {
  const router = useRouter(); // 2. Initialize Router
  const ref = useRef<HTMLButtonElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 120, damping: 15 });
  const springY = useSpring(y, { stiffness: 120, damping: 15 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    x.set((e.clientX - centerX) * 0.3);
    y.set((e.clientY - centerY) * 0.3);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  const BLADE_SHAPE = "polygon(12% 0, 100% 0, 100% 60%, 88% 100%, 0 100%, 0 40%)";
  const gridBlocks = Array.from({ length: 20 }); 

  return (
    <div className="relative group perspective-1000">
        <div 
            className="absolute inset-0 bg-black z-0 pointer-events-none transition-transform duration-200"
            style={{ 
                clipPath: BLADE_SHAPE,
                transform: isHovered ? "translate(0px, 0px)" : "translate(5px, 5px)" 
            }}
        />

        <motion.button
            ref={ref}
            onClick={() => router.push("/menu")} // 3. Add Navigation Action
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
            style={{ x: springX, y: springY, clipPath: BLADE_SHAPE }}
            className="relative w-56 h-16 bg-transparent border-none outline-none cursor-pointer z-10"
        >

            <div className="absolute inset-0 flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 overflow-hidden">
                <div className="absolute inset-0 opacity-20 bg-[linear-gradient(0deg,transparent_24%,rgba(255,255,255,.3)_25%,rgba(255,255,255,.3)_26%,transparent_27%,transparent_74%,rgba(255,255,255,.3)_75%,rgba(255,255,255,.3)_76%,transparent_77%,transparent),linear-gradient(90deg,transparent_24%,rgba(255,255,255,.3)_25%,rgba(255,255,255,.3)_26%,transparent_27%,transparent_74%,rgba(255,255,255,.3)_75%,rgba(255,255,255,.3)_76%,transparent_77%,transparent)] bg-size-[20px_20px]" />
                
                <div className="relative z-10 flex items-center gap-2">
                    <Terminal size={14} className="text-green-500 animate-pulse" />
                    <span className="font-mono font-bold text-white text-md tracking-[0.2em] animate-pulse">
                        LINK_START
                    </span>
                </div>
            </div>

            <div className="absolute inset-0 z-20 flex flex-wrap pointer-events-none">
                {gridBlocks.map((_, i) => (
                    <motion.div
                        key={i}
                        animate={isHovered ? { scale: 0, opacity: 0 } : { scale: 1, opacity: 1 }}
                        transition={{ 
                            duration: 0.3, 
                            delay: i * 0.02, 
                            ease: "easeIn" 
                        }}
                        className="w-[10%] h-[50%] bg-white border-[0.5px] border-zinc-100 relative"
                    />
                ))}
            </div>

            <motion.div 
                animate={isHovered ? { opacity: 0, scale: 1.5, filter: "blur(10px)" } : { opacity: 1, scale: 1, filter: "blur(0px)" }}
                transition={{ duration: 0.2 }}
                className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none"
            >

                <span className="font-black text-lg tracking-widest text-black flex items-center gap-2 pr-1">
                    START <ArrowRight size={18} />
                </span>
            </motion.div>

            <div className="absolute inset-0 shadow-[inset_0_0_0_2px_rgba(0,0,0,0.05)] pointer-events-none" />

        </motion.button>

        <div className="absolute -bottom-5 right-0 text-[9px] font-mono text-zinc-500 opacity-50 tracking-widest">
            NO.001 // SYS
        </div>

    </div>
  );
}