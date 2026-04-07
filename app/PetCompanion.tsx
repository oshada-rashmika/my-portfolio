"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Cookie, Send, MessageCircle, X } from "lucide-react";

export default function PetCompanion() {
  const pathname = usePathname();
  
  const [mounted, setMounted] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);
  const [petName, setPetName] = useState<string | null>(null);
  const [hunger, setHunger] = useState(100);
  const [cookiesEaten, setCookiesEaten] = useState(0);
  const [dialog, setDialog] = useState(""); // Default to empty to avoid ghost bubble
  const [isTalking, setIsTalking] = useState(false); 
  const [isOpen, setIsOpen] = useState(false); 
  const [userMessage, setUserMessage] = useState("");

  useEffect(() => {
    setMounted(true);
    const savedUser = localStorage.getItem("visitorName");
    const savedPet = localStorage.getItem("petName");
    const savedCookies = localStorage.getItem("petCookies");
    
    if (savedCookies) setCookiesEaten(parseInt(savedCookies));
    if (savedUser) setUserName(savedUser);
    if (savedPet) setPetName(savedPet);

    setTimeout(() => {
        if (savedUser && savedPet) {
            talkToAI("I just arrived at the website! Greet me warmly.", savedUser, savedPet, 100);
        } else if (!savedUser) {
            setDialog("Hello! Who are you? (Click me to chat!)");
            setIsOpen(true); 
        }
    }, 1000);
  }, []);

  const talkToAI = async (message: string, uName = userName, pName = petName, currentHunger = hunger) => {
    setIsTalking(true);
    try {
        const res = await fetch("/api/pet", {
            method: "POST",
            body: JSON.stringify({
                message,
                context: { userName: uName, petName: pName, hunger: currentHunger, page: pathname }
            })
        });
        const data = await res.json();
        setDialog(data.reply);
    } catch (e) {
        setDialog("Connection lost... (╥﹏╥)");
    } finally {
        setIsTalking(false);
    }
  };

  useEffect(() => {
    const hungerInterval = setInterval(() => {
        setHunger((prev) => {
            const newVal = Math.max(0, prev - 1);
            if (newVal === 20) talkToAI("I am very hungry now. Complain about it cuteley.");
            return newVal;
        });
    }, 10000); 
    return () => clearInterval(hungerInterval);
  }, []);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userMessage.trim()) return;

    if (!userName) {
        localStorage.setItem("visitorName", userMessage);
        setUserName(userMessage);
        setDialog(`Nice to meet you, ${userMessage}! What is MY name?`);
        setUserMessage("");
        return;
    }
    if (!petName) {
        localStorage.setItem("petName", userMessage);
        setPetName(userMessage);
        talkToAI(`My name is now ${userMessage}. React happily!`, userName, userMessage);
        setUserMessage("");
        return;
    }

    talkToAI(userMessage);
    setUserMessage("");
  };

  const feedCookie = () => {
    if (hunger >= 100) {
        talkToAI("I am too full! refuse the cookie politely.");
        return;
    }
    const newCount = cookiesEaten + 1;
    setCookiesEaten(newCount);
    setHunger((prev) => Math.min(100, prev + 25));
    localStorage.setItem("petCookies", newCount.toString());
    talkToAI("I just ate a delicious cookie! Yummy!");
  };

  // --- NEW: DISMISS HANDLER ---
  const dismissBubble = () => {
    setIsOpen(false);
    setDialog(""); // This clears the condition that keeps the bubble rendered
  };

  if (!mounted) return null;

  return (
    <div className="fixed bottom-4 left-4 md:left-8 z-50 flex flex-col items-start font-sans">
      
      <AnimatePresence>
        {(isOpen || dialog) && (
            <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.8 }}
                className="bg-white/90 backdrop-blur-md text-black p-4 rounded-2xl rounded-bl-none shadow-2xl max-w-[250px] border border-white/20 mb-3 relative"
            >
                {/* FIXED: Close button now calls dismissBubble */}
                <button 
                    onClick={dismissBubble}
                    className="absolute top-2 right-2 text-black/20 hover:text-red-500 transition-colors p-1"
                >
                    <X size={14} />
                </button>

                <p className="text-sm font-bold mb-3 leading-relaxed pr-4">
                    {isTalking ? <span className="animate-pulse">Thinking... 💭</span> : dialog}
                </p>

                {isOpen && (
                    <form onSubmit={handleSend} className="flex gap-2 mt-2 pt-2 border-t border-black/5">
                        <input 
                            className="w-full bg-transparent text-xs outline-none placeholder:text-black/30"
                            placeholder={!userName ? "Your name?" : !petName ? "Name me!" : "Say something..."}
                            value={userMessage}
                            onChange={(e) => setUserMessage(e.target.value)}
                            autoFocus
                        />
                        <button type="submit" className="text-blue-500 hover:scale-110 transition-transform">
                            <Send size={14} />
                        </button>
                    </form>
                )}
            </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-end gap-4">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
                setIsOpen(true);
                if(!isTalking && !dialog) talkToAI("The user poked me! React cuteley.");
            }}
            className={`relative w-28 h-28 cursor-pointer drop-shadow-2xl transition-all duration-500 ${hunger < 30 ? "grayscale brightness-75" : ""}`}
          >
             <Image src="/assets/avatar.gif" alt="Pet" fill className="object-contain" unoptimized />
             {petName && (
                 <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-black/80 text-white text-[10px] font-bold px-3 py-1 rounded-full border border-white/20 whitespace-nowrap">
                     {petName}
                 </div>
             )}
          </motion.div>

          <div className="flex flex-col gap-2 pb-2">
            <motion.button
                onClick={feedCookie}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-10 h-10 bg-orange-100 text-orange-600 rounded-full border-2 border-orange-200 shadow-lg flex items-center justify-center relative"
            >
                <Cookie size={18} />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[8px] font-black w-4 h-4 rounded-full flex items-center justify-center">
                    {cookiesEaten}
                </span>
            </motion.button>

            <motion.button
                onClick={() => isOpen ? dismissBubble() : setIsOpen(true)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={`w-10 h-10 rounded-full border-2 shadow-lg flex items-center justify-center transition-colors ${isOpen ? 'bg-red-100 text-red-600 border-red-200' : 'bg-blue-100 text-blue-600 border-blue-200'}`}
            >
                {isOpen ? <X size={18} /> : <MessageCircle size={18} />}
            </motion.button>
          </div>
      </div>
    </div>
  );
}