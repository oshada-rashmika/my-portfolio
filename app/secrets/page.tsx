"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Lock, Unlock, Skull, Terminal, 
  CheckCircle, Loader2, Eye, EyeOff, ArrowLeft,
  Music, PartyPopper, Sparkles
} from "lucide-react";
import Link from "next/link";

// Troll stages
type Stage = "access" | "verify" | "loading" | "fake-error" | "real-content";

export default function SecretsPage() {
  const [stage, setStage] = useState<Stage>("access");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [fakeFileIndex, setFakeFileIndex] = useState(0);
  const [showGangnam, setShowGangnam] = useState(false);
  const [buttonOffset, setButtonOffset] = useState({ x: 0, y: 0 });
  const [trollMessages, setTrollMessages] = useState<string[]>([]);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Fake files being "decrypted"
  const fakeFiles = [
    "secrets/embarrassing_photos.zip",
    "secrets/childhood_diary.txt",
    "secrets/browser_history.log",
    "secrets/definitely_not_anime.folder",
    "secrets/unfinished_projects.git",
    "secrets/3am_code.js",
    "secrets/copy_from_stackoverflow.tsx",
    "secrets/passwords.txt (jk)",
    "secrets/memes_folder_2024.rar",
    "secrets/why_am_i_like_this.md",
  ];
  const fakeFilesLength = fakeFiles.length;

  // Stage 1: Trick password (any password works after 3 attempts)
  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newAttempts = attempts + 1;
    setAttempts(newAttempts);

    if (newAttempts >= 3 || password.toLowerCase() === "please" || password.toLowerCase() === "secret") {
      setStage("verify");
    } else {
      // Shake animation handled by state change
      setTrollMessages(prev => [...prev, `Attempt ${newAttempts}: "${password}" - Nice try! 🤣`]);
      setPassword("");
    }
  };

  // Stage 2: Fake verification that runs away
  const handleMouseMove = (e: React.MouseEvent) => {
    if (stage !== "verify") return;
    
    const button = buttonRef.current;
    if (!button) return;

    const rect = button.getBoundingClientRect();
    const buttonCenterX = rect.left + rect.width / 2;
    const buttonCenterY = rect.top + rect.height / 2;
    
    const distX = e.clientX - buttonCenterX;
    const distY = e.clientY - buttonCenterY;
    const distance = Math.sqrt(distX * distX + distY * distY);

    if (distance < 150) {
      // Button runs away!
      const angle = Math.atan2(distY, distX);
      const escapeX = -Math.cos(angle) * 200;
      const escapeY = -Math.sin(angle) * 200;
      
      // Keep within bounds
      const maxX = window.innerWidth / 2 - 100;
      const maxY = window.innerHeight / 2 - 50;
      
      setButtonOffset({
        x: Math.max(-maxX, Math.min(maxX, buttonOffset.x + escapeX * 0.3)),
        y: Math.max(-maxY, Math.min(maxY, buttonOffset.y + escapeY * 0.3))
      });
      handleButtonMoved();
    }
  };

  // Eventually let them click after enough chasing
  const [chaseCount, setChaseCount] = useState(0);
  
  // Track chase count when button moves
  const handleButtonMoved = () => {
    setChaseCount(prev => prev + 1);
  };

  const handleVerifyClick = () => {
    if (chaseCount > 15 || stage !== "verify") {
      setStage("loading");
    }
  };

  // Stage 3: Fake loading with file decryption
  useEffect(() => {
    if (stage !== "loading") return;

    const progressInterval = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setTimeout(() => setStage("fake-error"), 500);
          return 100;
        }
        return prev + Math.random() * 3;
      });
    }, 100);

    const fileInterval = setInterval(() => {
      setFakeFileIndex(prev => (prev + 1) % fakeFilesLength);
    }, 400);

    return () => {
      clearInterval(progressInterval);
      clearInterval(fileInterval);
    };
  }, [stage, fakeFilesLength]);

  // Stage 4: Fake error that resolves
  useEffect(() => {
    if (stage === "fake-error") {
      setTimeout(() => setStage("real-content"), 3000);
    }
  }, [stage]);

  return (
    <div 
      className="min-h-screen w-full bg-black text-white flex items-center justify-center overflow-hidden relative"
      onMouseMove={handleMouseMove}
    >
      {/* Background noise */}
      <div className="fixed inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none" />
      
      {/* Scanlines */}
      <div className="fixed inset-0 pointer-events-none opacity-20" 
           style={{ background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 4px)' }} 
      />

      <AnimatePresence mode="wait">
        {/* STAGE 1: Password Entry */}
        {stage === "access" && (
          <motion.div
            key="access"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="w-full max-w-md mx-4"
          >
            <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl overflow-hidden backdrop-blur-xl">
              {/* Header */}
              <div className="bg-red-500/10 border-b border-red-500/20 px-6 py-4 flex items-center gap-3">
                <Lock className="text-red-500" size={20} />
                <div>
                  <h2 className="font-bold text-red-500">ACCESS RESTRICTED</h2>
                  <p className="text-red-500/60 text-xs font-mono">LEVEL_5_CLEARANCE_REQUIRED</p>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-6">
                <p className="text-zinc-400 text-sm">
                  You&apos;ve found the secret entrance. Enter the password to proceed.
                </p>

                <form onSubmit={handlePasswordSubmit} className="space-y-4">
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter password..."
                      className="w-full bg-black/50 border border-zinc-700 rounded-lg px-4 py-3 pr-12 font-mono text-sm focus:border-red-500 focus:outline-none transition-colors"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white transition-colors"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>

                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    <Unlock size={18} />
                    ACCESS
                  </motion.button>
                </form>

                {/* Troll messages */}
                {trollMessages.length > 0 && (
                  <div className="space-y-2 max-h-32 overflow-y-auto">
                    {trollMessages.map((msg, i) => (
                      <motion.p 
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-xs font-mono text-zinc-500"
                      >
                        {msg}
                      </motion.p>
                    ))}
                  </div>
                )}

                {/* Hint after 2 attempts */}
                {attempts >= 2 && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-xs text-zinc-600 text-center"
                  >
                    Hint: Just say &quot;please&quot; 🙄 (or keep trying)
                  </motion.p>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {/* STAGE 2: Verify Button That Runs Away */}
        {stage === "verify" && (
          <motion.div
            key="verify"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center"
          >
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="mb-12"
            >
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-white mb-2">Password Accepted!</h2>
              <p className="text-zinc-400">Just click the button below to continue...</p>
              {chaseCount > 5 && (
                <p className="text-zinc-600 text-xs mt-2 font-mono">
                  ({chaseCount > 10 ? "FINE, I'll stop running soon..." : "Why won't it stay still? 🤔"})
                </p>
              )}
            </motion.div>

            <motion.button
              ref={buttonRef}
              onClick={handleVerifyClick}
              animate={{ 
                x: chaseCount > 15 ? 0 : buttonOffset.x, 
                y: chaseCount > 15 ? 0 : buttonOffset.y 
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              whileHover={{ scale: chaseCount > 15 ? 1.05 : 1 }}
              className={`px-8 py-4 bg-green-500 hover:bg-green-600 text-black font-bold rounded-xl transition-colors ${chaseCount > 15 ? '' : 'cursor-not-allowed'}`}
            >
              {chaseCount > 15 ? "Okay fine, click me 😤" : "CONTINUE →"}
            </motion.button>
          </motion.div>
        )}

        {/* STAGE 3: Fake Loading */}
        {stage === "loading" && (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full max-w-lg mx-4 text-center"
          >
            <Terminal className="w-12 h-12 text-green-500 mx-auto mb-6 animate-pulse" />
            <h2 className="text-xl font-bold mb-2">Decrypting Secret Files...</h2>
            <p className="text-zinc-500 text-sm mb-6">Please wait while we expose everything 💀</p>

            {/* Progress bar */}
            <div className="w-full h-3 bg-zinc-800 rounded-full overflow-hidden mb-4">
              <motion.div 
                className="h-full bg-green-500"
                style={{ width: `${Math.min(loadingProgress, 100)}%` }}
              />
            </div>

            {/* Fake file decryption */}
            <div className="bg-black/50 border border-zinc-800 rounded-lg p-4 font-mono text-xs text-left">
              <p className="text-green-500 mb-2">&gt; Decrypting files...</p>
              <p className="text-zinc-400 truncate">
                <Loader2 className="inline w-3 h-3 animate-spin mr-2" />
                {fakeFiles[fakeFileIndex]}
              </p>
            </div>

            <p className="text-zinc-600 text-xs mt-4">
              {loadingProgress > 30 && loadingProgress < 60 && "Finding embarrassing moments..."}
              {loadingProgress >= 60 && loadingProgress < 80 && "Loading cringe compilation..."}
              {loadingProgress >= 80 && "Almost done exposing secrets..."}
            </p>
          </motion.div>
        )}

        {/* STAGE 4: Fake Error */}
        {stage === "fake-error" && (
          <motion.div
            key="error"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="text-center"
          >
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 0.5, repeat: 3 }}
            >
              <Skull className="w-20 h-20 text-red-500 mx-auto mb-6" />
            </motion.div>
            <h2 className="text-3xl font-black text-red-500 mb-2">SYSTEM ERROR</h2>
            <p className="text-zinc-400 mb-4">Just kidding 😂 Loading real content...</p>
            <Loader2 className="w-6 h-6 animate-spin mx-auto text-white" />
          </motion.div>
        )}

        {/* STAGE 5: Real Content */}
        {stage === "real-content" && (
          <motion.div
            key="content"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-4xl mx-4 space-y-8"
          >
            {/* Header */}
            <div className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.2 }}
              >
                <PartyPopper className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
              </motion.div>
              <h1 className="text-4xl md:text-6xl font-black mb-2">
                YOU FOUND THE <span className="text-yellow-500">SECRETS!</span>
              </h1>
              <p className="text-zinc-400">Welcome to the hidden chamber, fellow explorer 🎉</p>
            </div>

            {/* Secret Content Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Behind the Scenes */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 space-y-4"
              >
                <div className="flex items-center gap-2 text-yellow-500">
                  <Sparkles size={20} />
                  <h3 className="font-bold">Behind The Scenes</h3>
                </div>
                <ul className="space-y-3 text-sm text-zinc-400">
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">✓</span>
                    This portfolio was built with Next.js, Tailwind, and way too much coffee ☕
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">✓</span>
                    The pet companion uses AI to roast you (lovingly)
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">✓</span>
                    There are 3 easter eggs hidden. You found this one!
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">✓</span>
                    The 404 page has an Aizen trap (go check it out 👀)
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500">✓</span>
                    I spent more time on easter eggs than actual content 💀
                  </li>
                </ul>
              </motion.div>

              {/* Fun Stats */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 space-y-4"
              >
                <div className="flex items-center gap-2 text-cyan-500">
                  <Terminal size={20} />
                  <h3 className="font-bold">Dev Stats (Real)</h3>
                </div>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="bg-black/50 rounded-xl p-4">
                    <p className="text-3xl font-black text-white">∞</p>
                    <p className="text-xs text-zinc-500">Stack Overflow Visits</p>
                  </div>
                  <div className="bg-black/50 rounded-xl p-4">
                    <p className="text-3xl font-black text-white">3AM</p>
                    <p className="text-xs text-zinc-500">Best Coding Hours</p>
                  </div>
                  <div className="bg-black/50 rounded-xl p-4">
                    <p className="text-3xl font-black text-white">99%</p>
                    <p className="text-xs text-zinc-500">Code from AI</p>
                  </div>
                  <div className="bg-black/50 rounded-xl p-4">
                    <p className="text-3xl font-black text-white">1</p>
                    <p className="text-xs text-zinc-500">Brain Cell Left</p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* The Troll Video */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-zinc-900/50 border border-zinc-800 rounded-2xl overflow-hidden"
            >
              <div className="px-6 py-4 border-b border-zinc-800 flex items-center justify-between">
                <div className="flex items-center gap-2 text-pink-500">
                  <Music size={20} />
                  <h3 className="font-bold">Official Theme Song</h3>
                </div>
                <button
                  onClick={() => setShowGangnam(!showGangnam)}
                  className="text-xs font-mono text-zinc-500 hover:text-white transition-colors"
                >
                  {showGangnam ? "Hide" : "Reveal"} 🎵
                </button>
              </div>
              
              <AnimatePresence>
                {showGangnam && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: "auto" }}
                    exit={{ height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="aspect-video">
                      <iframe
                        width="100%"
                        height="100%"
                        src="https://www.youtube.com/embed/9bZkp7q19f0?autoplay=1"
                        title="Secret Theme"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {!showGangnam && (
                <div className="p-8 text-center text-zinc-500">
                  <p className="text-sm">Click &quot;Reveal&quot; to unlock the official vibe ✨</p>
                </div>
              )}
            </motion.div>

            {/* Back Button */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-center pt-4"
            >
              <Link href="/">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/20 hover:bg-white/10 rounded-full text-sm font-mono transition-colors"
                >
                  <ArrowLeft size={16} />
                  Return to Reality
                </motion.button>
              </Link>
              <p className="text-zinc-600 text-xs mt-4 font-mono">
                Your secret clearance has been logged 👁️
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
