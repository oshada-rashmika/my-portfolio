"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, MicOff, Volume2, Loader2, X, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";

// Type declarations for Web Speech API
interface ISpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start: () => void;
  stop: () => void;
  onresult: ((event: ISpeechRecognitionEvent) => void) | null;
  onerror: ((event: ISpeechRecognitionErrorEvent) => void) | null;
  onend: (() => void) | null;
}

interface ISpeechRecognitionEvent {
  results: {
    [index: number]: {
      [index: number]: { transcript: string };
      isFinal: boolean;
    };
  };
  resultIndex: number;
}

interface ISpeechRecognitionErrorEvent {
  error: string;
  message: string;
}

declare global {
  interface Window {
    SpeechRecognition: new () => ISpeechRecognition;
    webkitSpeechRecognition: new () => ISpeechRecognition;
  }
}

// Define voice commands
const COMMANDS: Record<string, string> = {
  // Navigation
  "show projects": "/quests",
  "go to projects": "/quests",
  "show quests": "/quests",
  "open projects": "/quests",
  
  "show contact": "/contact",
  "go to contact": "/contact",
  "open contact": "/contact",
  "contact me": "/contact",
  
  "show character": "/character",
  "go to character": "/character",
  "who are you": "/character",
  "about you": "/character",
  
  "show certifications": "/certifications",
  "go to certifications": "/certifications",
  "show badges": "/certifications",
  
  "go home": "/",
  "go to home": "/",
  "back home": "/",
  "home page": "/",
  
  "show secrets": "/secrets",
  "secret page": "/secrets",
  "show me secrets": "/secrets",
};

// Fun responses for certain commands
const FUN_RESPONSES: Record<string, string> = {
  "hello": "Hey there! Nice to meet you! 👋",
  "hi": "Hello! How can I help you navigate? 🚀",
  "hey portfolio": "I'm listening! Try saying 'show projects' or 'go to contact' 🎤",
  "who made you": "I was crafted by Oshada with love, coffee, and questionable sleep schedules ☕",
  "tell me a joke": "Why do programmers prefer dark mode? Because light attracts bugs! 🐛",
  "you're cool": "No YOU'RE cool! Thanks for visiting! 😎",
  "play music": "🎵 Music controls are in the bottom right!",
  "what can you do": "I can navigate! Try: 'show projects', 'go to contact', 'show character', or 'show secrets' 🗺️",
  "help": "Commands: 'show projects', 'go to contact', 'show character', 'show secrets', 'go home' 📋",
  "good night": "Sweet dreams! But wait... why are you awake? 🌙",
  "good morning": "Rise and shine! Ready to explore? ☀️",
  "i love you": "I... I love you too! 💕 (This is getting weird)",
  "sing a song": "🎵 Never gonna give you up, never gonna let you down... 🎵",
  "dance": "💃🕺 *does the robot* 🤖",
};

// Pre-generated waveform heights
const WAVEFORM_HEIGHTS = [24, 36, 18, 40, 28, 32, 20, 38, 26, 34, 22, 30];

export default function VoiceCommands() {
  const router = useRouter();
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [feedback, setFeedback] = useState("");
  const [showUI, setShowUI] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const recognitionRef = useRef<ISpeechRecognition | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const initializedRef = useRef(false);
  const [isSupported, setIsSupported] = useState(false);

  // Initialize speech recognition (only once)
  const initRecognition = useCallback(() => {
    if (initializedRef.current) return !!recognitionRef.current;
    initializedRef.current = true;
    
    const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognitionAPI) {
      recognitionRef.current = new SpeechRecognitionAPI();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = "en-US";
      return true;
    }
    return false;
  }, []);

  // Check support on mount
  useEffect(() => {
    setIsSupported(initRecognition());
  }, [initRecognition]);

  // Process the command
  const processCommand = useCallback((text: string) => {
    const lowerText = text.toLowerCase().trim();
    setIsProcessing(true);

    // Check for navigation commands
    for (const [command, path] of Object.entries(COMMANDS)) {
      if (lowerText.includes(command)) {
        setFeedback(`Navigating to ${path === "/" ? "home" : path.slice(1)}... 🚀`);
        setTimeout(() => {
          router.push(path);
          setShowUI(false);
          setIsProcessing(false);
        }, 1000);
        return;
      }
    }

    // Check for fun responses
    for (const [trigger, response] of Object.entries(FUN_RESPONSES)) {
      if (lowerText.includes(trigger)) {
        setFeedback(response);
        setIsProcessing(false);
        return;
      }
    }

    // Unknown command
    setFeedback("I didn't catch that. Try 'help' for commands! 🤔");
    setIsProcessing(false);
  }, [router]);

  // Stop listening
  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsListening(false);
  }, []);

  // Start listening
  const startListening = useCallback(() => {
    if (!recognitionRef.current) return;

    setTranscript("");
    setFeedback("Listening... 🎤");
    setIsListening(true);
    setShowUI(true);

    recognitionRef.current.onresult = (event: ISpeechRecognitionEvent) => {
      const current = event.resultIndex;
      const result = event.results[current];
      const text = result[0].transcript;
      setTranscript(text);

      if (result.isFinal) {
        processCommand(text);
      }
    };

    recognitionRef.current.onerror = (event: ISpeechRecognitionErrorEvent) => {
      console.error("Speech recognition error:", event.error);
      setFeedback(`Error: ${event.error}. Try again! ❌`);
      setIsListening(false);
    };

    recognitionRef.current.onend = () => {
      setIsListening(false);
    };

    try {
      recognitionRef.current.start();
      
      // Auto-stop after 10 seconds
      timeoutRef.current = setTimeout(() => {
        stopListening();
        if (!transcript) {
          setFeedback("No speech detected. Tap to try again! 🔇");
        }
      }, 10000);
    } catch (err) {
      console.error("Failed to start recognition:", err);
      setFeedback("Microphone access denied! 🚫");
    }
  }, [processCommand, transcript, stopListening]);

  // Keyboard shortcut (Hold V to talk)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "v" && !e.repeat && !isListening && isSupported) {
        // Don't trigger if typing in an input
        if (document.activeElement?.tagName === "INPUT" || 
            document.activeElement?.tagName === "TEXTAREA") return;
        startListening();
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "v" && isListening) {
        stopListening();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [isListening, isSupported, startListening, stopListening]);

  // Auto-hide UI after inactivity
  useEffect(() => {
    if (showUI && !isListening && feedback) {
      const hideTimer = setTimeout(() => {
        setShowUI(false);
        setTranscript("");
        setFeedback("");
      }, 5000);
      return () => clearTimeout(hideTimer);
    }
  }, [showUI, isListening, feedback]);

  if (!isSupported) return null;

  return (
    <>
      {/* Floating Mic Button */}
      <motion.button
        onClick={() => isListening ? stopListening() : startListening()}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className={`fixed bottom-8 left-8 z-50 w-14 h-14 rounded-full flex items-center justify-center transition-all shadow-lg backdrop-blur-md border ${
          isListening 
            ? "bg-red-500/20 border-red-500/50 text-red-500 animate-pulse" 
            : "bg-white/5 border-white/20 text-white/50 hover:text-white hover:bg-white/10"
        }`}
        title="Voice Commands (Hold V)"
      >
        {isListening ? <Mic size={22} /> : <MicOff size={22} />}
      </motion.button>

      {/* Voice UI Overlay */}
      <AnimatePresence>
        {showUI && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-28 left-8 z-50 w-80"
          >
            <div className="bg-zinc-900/95 backdrop-blur-xl border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl">
              {/* Header */}
              <div className={`px-4 py-3 flex items-center justify-between border-b ${
                isListening ? "border-red-500/30 bg-red-500/5" : "border-zinc-800"
              }`}>
                <div className="flex items-center gap-2">
                  {isListening ? (
                    <>
                      <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                      <span className="text-red-500 text-sm font-medium">Listening...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles size={14} className="text-yellow-500" />
                      <span className="text-white text-sm font-medium">Voice Control</span>
                    </>
                  )}
                </div>
                <button 
                  onClick={() => setShowUI(false)}
                  className="text-zinc-500 hover:text-white transition-colors"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Content */}
              <div className="p-4 space-y-3">
                {/* Waveform visualization when listening */}
                {isListening && (
                  <div className="flex items-center justify-center gap-1 h-12">
                    {WAVEFORM_HEIGHTS.map((maxHeight, i) => (
                      <motion.div
                        key={i}
                        className="w-1 bg-red-500 rounded-full"
                        animate={{
                          height: [8, maxHeight, 8],
                        }}
                        transition={{
                          duration: 0.5,
                          repeat: Infinity,
                          delay: i * 0.05,
                        }}
                      />
                    ))}
                  </div>
                )}

                {/* Transcript */}
                {transcript && (
                  <div className="bg-black/30 rounded-lg px-3 py-2">
                    <p className="text-xs text-zinc-500 mb-1">You said:</p>
                    <p className="text-white font-medium">&quot;{transcript}&quot;</p>
                  </div>
                )}

                {/* Feedback */}
                {feedback && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-start gap-2"
                  >
                    {isProcessing ? (
                      <Loader2 size={14} className="text-cyan-500 animate-spin mt-0.5" />
                    ) : (
                      <Volume2 size={14} className="text-cyan-500 mt-0.5" />
                    )}
                    <p className="text-sm text-zinc-300">{feedback}</p>
                  </motion.div>
                )}

                {/* Hint */}
                {!transcript && !isListening && (
                  <p className="text-xs text-zinc-600 text-center">
                    Hold <kbd className="px-1.5 py-0.5 bg-zinc-800 rounded text-zinc-400">V</kbd> or tap mic to speak
                  </p>
                )}
              </div>

              {/* Quick Commands */}
              <div className="px-4 py-3 bg-black/30 border-t border-zinc-800">
                <p className="text-[10px] text-zinc-600 mb-2 uppercase tracking-wider">Try saying:</p>
                <div className="flex flex-wrap gap-1.5">
                  {["show projects", "go to contact", "help"].map((cmd) => (
                    <span key={cmd} className="px-2 py-1 bg-zinc-800/50 rounded text-[10px] text-zinc-400">
                      &quot;{cmd}&quot;
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}