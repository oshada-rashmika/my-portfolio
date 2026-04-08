"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { GitCommit, Users, Globe, Image, Mail, MessageCircle, ArrowUpRight, Copy, Check, ArrowLeft, Volume2, VolumeX } from "lucide-react";

// JJK-themed social items with cursed technique names
interface SocialItem {
  id: string;
  label: string;
  technique: string; // JJK cursed technique name
  value: string;
  link: string;
  icon: React.ReactNode;
  isCopy?: boolean;
}

const SOCIALS: SocialItem[] = [
  {
    id: "whatsapp",
    label: "通信",
    technique: "CURSED_SPEECH",
    value: "+94 74 030 4576",
    link: "https://wa.me/94740304576",
    icon: <MessageCircle size={22} />,
  },
  {
    id: "linkedin",
    label: "結界",
    technique: "BINDING_VOW",
    value: "/in/oshada-rodrigo",
    link: "https://linkedin.com/in/oshada-rodrigo",
    icon: <Users size={22} />,
  },
  {
    id: "github",
    label: "領域",
    technique: "DOMAIN_EXPANSION",
    value: "@oshada-rashmika",
    link: "https://github.com/oshada-rashmika",
    icon: <GitCommit size={22} />,
  },
  {
    id: "instagram",
    label: "六眼",
    technique: "SIX_EYES",
    value: "@vxl3.r0",
    link: "https://instagram.com/vxl3.r0",
    icon: <Image size={22} />,
  },
  {
    id: "facebook",
    label: "無量",
    technique: "LIMITLESS",
    value: "Damien Vale",
    link: "https://facebook.com/v0idvelour",
    icon: <Globe size={22} />,
  },
  {
    id: "email",
    label: "黒閃",
    technique: "BLACK_FLASH",
    value: "oshadar.rodrigo@gmail.com",
    link: "mailto:oshadar.rodrigo@gmail.com",
    icon: <Mail size={22} />,
    isCopy: true
  }
];

export default function ContactPage() {
  // --- VIDEO MUTE STATE ---
  const [isMuted, setIsMuted] = useState(false);
  
  // --- MOUSE PHYSICS ---
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseX = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseY = useSpring(y, { stiffness: 150, damping: 15 });

  // Deep 3D Rotation
  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-15deg", "15deg"]);
  
  // Background movement (Parallax)
  const bgX = useTransform(mouseX, [-0.5, 0.5], ["-5%", "5%"]);
  const bgY = useTransform(mouseY, [-0.5, 0.5], ["-5%", "5%"]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;
    const xPct = clickX / width - 0.5;
    const yPct = clickY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  return (
    <div 
      className="min-h-screen w-full bg-black flex items-center justify-center overflow-hidden relative perspective-1000"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { x.set(0); y.set(0); }}
    >
        {/* --- YOUTUBE BACKGROUND VIDEO --- */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <div className="absolute inset-[-20%] w-[140%] h-[140%]">
            <iframe
              src={`https://www.youtube.com/embed/44pt8w67S8I?autoplay=1&loop=1&playlist=44pt8w67S8I&controls=0&showinfo=0&mute=${isMuted ? 1 : 0}&modestbranding=1&rel=0&enablejsapi=1&version=3&playsinline=1&vq=small`}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[56.25vw] min-h-[100vh] min-w-[177.78vh]"
              allow="autoplay; encrypted-media"
              title="Background Video"
              frameBorder="0"
              loading="lazy"
            />
          </div>
        </div>

        {/* Video Overlays for blending */}
        <div className="absolute inset-0 bg-black/70 z-[1] pointer-events-none" />
        <div className="absolute inset-0 bg-linear-to-t from-black via-black/50 to-black z-[1] pointer-events-none" />
        <div className="absolute inset-0 bg-linear-to-r from-black/90 via-transparent to-black/90 z-[1] pointer-events-none" />
        
        {/* JJK Domain Expansion Circle - Outer - Using CSS animations for performance */}
        <div 
          className="absolute w-[150vh] h-[150vh] border border-white/5 rounded-full z-[2] pointer-events-none animate-spin-slow"
          style={{ animationDuration: "120s" }}
        />
        <div 
          className="absolute w-[120vh] h-[120vh] border border-white/10 rounded-full z-[2] pointer-events-none animate-spin-slow-reverse"
          style={{ animationDuration: "90s" }}
        />
        <div 
          className="absolute w-[90vh] h-[90vh] border-2 border-dashed border-white/5 rounded-full z-[2] pointer-events-none animate-spin-slow"
          style={{ animationDuration: "60s" }}
        />

        {/* Cursed Energy Particles - Reduced count for performance */}
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/30 rounded-full z-[2] pointer-events-none animate-float-up"
            style={{ 
              left: `${10 + i * 10}%`,
              animationDelay: `${i * 0.6}s`,
              animationDuration: `${5 + i * 0.5}s`
            }}
          />
        ))}
        
        {/* Noise texture */}
        <motion.div 
            className="absolute inset-[-10%] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.08] z-[2] pointer-events-none"
            style={{ x: bgX, y: bgY }}
        />

        {/* Japanese corner text decorations */}
        <div className="fixed top-8 left-8 z-20 font-mono text-white/20 text-xs tracking-widest writing-mode-vertical">
          <span className="text-2xl font-bold">呪術</span>
          <span className="mt-2 block text-[10px]">JUJUTSU</span>
        </div>
        <div className="fixed top-8 right-8 z-20 font-mono text-white/20 text-xs tracking-widest text-right writing-mode-vertical">
          <span className="text-2xl font-bold">廻戦</span>
          <span className="mt-2 block text-[10px]">KAISEN</span>
        </div>
        <div className="fixed bottom-8 left-8 z-20 font-mono text-white/10 text-[10px] tracking-[0.3em]">
          領域展開 // DOMAIN_EXPANSION
        </div>

        {/* --- MUTE TOGGLE BUTTON --- */}
        <motion.button
          onClick={() => setIsMuted(!isMuted)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="fixed bottom-8 right-8 z-50 w-14 h-14 rounded-full bg-white/5 backdrop-blur-md border border-white/20 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 hover:border-white/40 transition-all shadow-lg"
          title={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted ? <VolumeX size={22} /> : <Volume2 size={22} />}
        </motion.button>

        {/* --- MAIN INTERFACE --- */}
        <motion.div
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            className="relative z-10 w-full max-w-2xl mx-4"
        >
            {/* JJK-Style Header */}
            <div className="mb-10 text-center" style={{ transform: "translateZ(40px)" }}>
                {/* Japanese Title */}
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="mb-4"
                >
                  <span className="text-white/30 text-sm tracking-[0.5em] font-mono">接続術式</span>
                </motion.div>
                
                <motion.h1 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3, type: "spring" }}
                  className="text-6xl md:text-8xl font-black text-white tracking-tighter relative inline-block"
                >
                  CONTACT
                  {/* Underline decoration */}
                  <motion.div 
                    className="absolute -bottom-2 left-0 right-0 h-px bg-white/50"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                  />
                </motion.h1>

                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="mt-6 flex items-center justify-center gap-4 text-white/30 font-mono text-xs"
                >
                  <div className="h-px w-16 bg-white/20" />
                  <span className="tracking-[0.3em]">無下限呪術</span>
                  <div className="h-px w-16 bg-white/20" />
                </motion.div>
            </div>

            {/* THE LIST - Cursed Technique Style */}
            <div className="flex flex-col gap-2" style={{ transform: "translateZ(20px)" }}>
                {SOCIALS.map((social, index) => (
                    <ContactRow key={social.id} data={social} index={index} />
                ))}
            </div>

            {/* --- BACK BUTTON - Domain Exit --- */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="mt-10 flex justify-center" 
              style={{ transform: "translateZ(30px)" }}
            >
                <Link href="/">
                    <motion.button
                        whileHover={{ scale: 1.05, borderColor: "rgba(255,255,255,0.5)" }}
                        whileTap={{ scale: 0.95 }}
                        className="group relative flex items-center gap-4 px-10 py-4 bg-transparent border border-white/20 overflow-hidden transition-all duration-500"
                    >
                        {/* Hover fill */}
                        <motion.div 
                          className="absolute inset-0 bg-white origin-left z-0"
                          initial={{ scaleX: 0 }}
                          whileHover={{ scaleX: 1 }}
                          transition={{ duration: 0.4 }}
                        />
                        <ArrowLeft size={18} className="relative z-10 text-white/60 group-hover:text-black group-hover:-translate-x-1 transition-all" />
                        <span className="relative z-10 font-mono text-xs tracking-[0.3em] text-white/60 group-hover:text-black transition-colors">
                          領域解除
                        </span>
                        <span className="relative z-10 text-white/30 group-hover:text-black/50 text-[10px] font-mono transition-colors">
                          EXIT_DOMAIN
                        </span>
                    </motion.button>
                </Link>
            </motion.div>

        </motion.div>
    </div>
  );
}

// JJK-Styled Contact Row - Cursed Technique Cards
function ContactRow({ data, index }: { data: SocialItem, index: number }) {
    const [isHovered, setIsHovered] = useState(false);
    const [copied, setCopied] = useState(false);

    const handleAction = () => {
        if (data.isCopy) {
            navigator.clipboard.writeText(data.value);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <motion.a
            href={data.isCopy ? undefined : data.link}
            target={data.isCopy ? undefined : "_blank"}
            onClick={handleAction}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.08, type: "spring", stiffness: 100 }}
            className="group relative h-20 w-full bg-white/[0.02] backdrop-blur-sm border border-white/10 overflow-hidden flex items-center justify-between px-6 cursor-pointer hover:border-white/30 transition-all duration-300"
        >
            {/* HOVER FILL - White flash like Black Flash */}
            <motion.div 
                className="absolute inset-0 z-0 origin-left bg-white"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: isHovered ? 1 : 0 }}
                transition={{ duration: 0.3, ease: "circOut" }}
            />

            {/* Cursed energy line on left */}
            <motion.div 
              className="absolute left-0 top-0 bottom-0 w-1 bg-white/50"
              initial={{ scaleY: 0 }}
              animate={{ scaleY: isHovered ? 1 : 0 }}
              transition={{ duration: 0.2 }}
            />

            {/* LEFT: Icon & Label */}
            <div className="relative z-10 flex items-center gap-5">
                {/* Icon with circle */}
                <div className={`relative w-12 h-12 flex items-center justify-center transition-all duration-300 ${isHovered ? 'text-black' : 'text-white/60'}`}>
                    {/* Rotating circle decoration */}
                    <motion.div 
                      className={`absolute inset-0 border rounded-full transition-colors duration-300 ${isHovered ? 'border-black/30' : 'border-white/20'}`}
                      animate={{ rotate: isHovered ? 180 : 0 }}
                      transition={{ duration: 0.5 }}
                    />
                    <motion.div 
                      className={`absolute inset-1 border border-dashed rounded-full transition-colors duration-300 ${isHovered ? 'border-black/20' : 'border-white/10'}`}
                      animate={{ rotate: isHovered ? -180 : 0 }}
                      transition={{ duration: 0.5 }}
                    />
                    {data.isCopy && copied ? <Check size={20} /> : data.icon}
                </div>
                
                <div className="flex flex-col">
                    {/* Japanese label + Technique name */}
                    <div className="flex items-center gap-3">
                      <span className={`text-lg font-bold transition-colors duration-300 ${isHovered ? 'text-black' : 'text-white/30'}`}>
                        {data.label}
                      </span>
                      <span className={`font-mono text-[10px] tracking-[0.2em] transition-colors duration-300 ${isHovered ? 'text-black/50' : 'text-white/20'}`}>
                        {data.technique}
                      </span>
                    </div>
                    {/* Value */}
                    <span className={`text-lg font-medium transition-colors duration-300 ${isHovered ? 'text-black' : 'text-white'}`}>
                        {data.isCopy && copied ? "呪力転写完了 // COPIED" : data.value}
                    </span>
                </div>
            </div>

            {/* RIGHT: Arrow / Action */}
            <div className={`relative z-10 transition-all duration-300 ${isHovered ? 'opacity-100 translate-x-0 text-black' : 'opacity-0 translate-x-4 text-white'}`}>
                {data.isCopy ? <Copy size={20} /> : <ArrowUpRight size={20} />}
            </div>

            {/* Bottom line decoration */}
            <motion.div 
              className="absolute bottom-0 left-0 right-0 h-px bg-white/10"
              initial={{ scaleX: 0.3, originX: 0 }}
              animate={{ scaleX: isHovered ? 1 : 0.3 }}
              transition={{ duration: 0.3 }}
            />
        </motion.a>
    );
}