"use client";
import { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import Sidebar from "@/components/Sidebar";
import { 
  GraduationCap, Briefcase, Code, Users, Palette, Award,
  ChevronRight, Calendar, MapPin, Star, Sparkles, BookOpen,
  Globe, Rocket, Shield, Megaphone, Trophy, Target, Flame, Zap
} from "lucide-react";

// --- CHAPTER DATA ---
interface Chapter {
  id: number;
  era: string;
  title: string;
  role: string;
  organization: string;
  period: string;
  status: "ongoing" | "completed";
  icon: typeof GraduationCap;
  color: string;
  gradient: string;
  skills: string[];
  description: string[];
  achievement?: string;
}

const CHAPTERS: Chapter[] = [
  {
    id: 1,
    era: "ARC I",
    title: "THE ORIGIN",
    role: "Lead UI/UX Designer & CEO",
    organization: "Medusa Designers",
    period: "Jan 2019 - Dec 2023",
    status: "completed",
    icon: Briefcase,
    color: "#8b5cf6",
    gradient: "from-violet-600 to-purple-900",
    skills: ["UI/UX Design Principles", "Community Building", "Leadership"],
    description: [
      "Founded and led a creative design agency for 5 years.",
      "Built a community of designers and developers.",
      "Delivered high-impact design solutions to clients."
    ]
  },
  {
    id: 2,
    era: "ARC II",
    title: "THE AWAKENING",
    role: "Undergraduate",
    organization: "NSBM Green University",
    period: "Jul 2024 - Present",
    status: "ongoing",
    icon: GraduationCap,
    color: "#22c55e",
    gradient: "from-green-500 to-emerald-900",
    skills: ["Programming & Software Development", "Teamwork", "Project Management"],
    description: [
      "Pursuing Computer Science with focus on AI & Security.",
      "Building strong foundations in software development.",
      "Active participant in university tech communities."
    ]
  },
  {
    id: 3,
    era: "ARC III",
    title: "THE STRATEGIST",
    role: "Executive Committee Member",
    organization: "Mathematics & Statistics Circle - NSBM",
    period: "Nov 2024 - Present",
    status: "ongoing",
    icon: Users,
    color: "#0ea5e9",
    gradient: "from-sky-500 to-blue-900",
    skills: ["Strategic Planning", "Event Organization", "Educational Content"],
    description: [
      "Contributing to strategic planning of math & statistics initiatives.",
      "Organizing events and workshops to enhance learning experience.",
      "Collaborating on innovative problem-solving approaches."
    ]
  },
  {
    id: 4,
    era: "ARC IV",
    title: "THE ARCHITECT",
    role: "Lead UI/UX Designer & Front-End Developer",
    organization: "R136a1",
    period: "Jan 2025 - Present",
    status: "ongoing",
    icon: Code,
    color: "#f59e0b",
    gradient: "from-amber-500 to-orange-900",
    skills: ["Communication & Coordination", "User-Centered Design", "Front-End Development"],
    description: [
      "Leading design and development initiatives.",
      "Creating user-centered interfaces with modern technologies.",
      "Bridging the gap between design and development teams."
    ]
  },
  {
    id: 5,
    era: "ARC V",
    title: "THE CREATOR",
    role: "Design and Content Co-Lead",
    organization: "Hackathon Hub NSBM",
    period: "Feb 2025 - Present",
    status: "ongoing",
    icon: Palette,
    color: "#ec4899",
    gradient: "from-pink-500 to-rose-900",
    skills: ["Content Creation", "Visual Design", "Brand Development"],
    description: [
      "Co-leading content creation and design initiatives.",
      "Overseeing promotional materials and brand guidelines.",
      "Coordinating cross-functional teams for hackathon events."
    ]
  },
  {
    id: 6,
    era: "ARC VI",
    title: "THE VANGUARD",
    role: "Design Subcommittee Lead",
    organization: "IEEE Student Branch - NSBM",
    period: "Mar 2025 - Present",
    status: "ongoing",
    icon: Award,
    color: "#06b6d4",
    gradient: "from-cyan-500 to-teal-900",
    skills: ["Design Leadership", "Mentorship", "Project Management"],
    description: [
      "Leading a subcommittee for visual materials and publications.",
      "Implementing effective workflows for creative outputs.",
      "Mentoring junior team members in graphic design tools."
    ],
    achievement: "Contributed to winning Best Student Chapter at IEEE Awards 2025"
  },
  {
    id: 7,
    era: "ARC VII",
    title: "THE AMBASSADOR",
    role: "Media Marketing Subcommittee Member",
    organization: "ICCE - NSBM",
    period: "Mar 2025 - Present",
    status: "ongoing",
    icon: Megaphone,
    color: "#f472b6",
    gradient: "from-pink-400 to-fuchsia-900",
    skills: ["Media Marketing", "Content Creation", "Campaign Planning"],
    description: [
      "Supporting media marketing initiatives for cultural exchange activities.",
      "Creating engaging digital content for social media and newsletters.",
      "Developing strategies for audience engagement and participation."
    ]
  },
  {
    id: 8,
    era: "ARC VIII",
    title: "THE COMMANDER",
    role: "Vice President of Management",
    organization: "SEDS NSBM",
    period: "May 2025 - Present",
    status: "ongoing",
    icon: Rocket,
    color: "#10b981",
    gradient: "from-emerald-500 to-green-900",
    skills: ["Strategic Planning", "Team Leadership", "Partnership Management"],
    description: [
      "Overseeing strategic planning and execution of chapter initiatives.",
      "Leading a team of executive members to achieve organizational goals.",
      "Establishing partnerships with external organizations."
    ]
  },
  {
    id: 9,
    era: "ARC IX",
    title: "THE VOICE",
    role: "Divisional Member - Media Division",
    organization: "SEDS Sri Lanka",
    period: "May 2025 - Present",
    status: "ongoing",
    icon: Globe,
    color: "#6366f1",
    gradient: "from-indigo-500 to-violet-900",
    skills: ["Media Strategy", "Brand Communication", "Digital Outreach"],
    description: [
      "Contributing to national-level media strategies for SEDS Sri Lanka.",
      "Coordinating social media campaigns across multiple platforms.",
      "Fostering partnerships to expand media outreach efforts."
    ]
  },
  {
    id: 10,
    era: "ARC X",
    title: "THE BRIDGE",
    role: "CX & Partner Relations Team Leader - iGT",
    organization: "AIESEC in Sri Lanka",
    period: "Jul 2025 - Present",
    status: "ongoing",
    icon: Users,
    color: "#3b82f6",
    gradient: "from-blue-500 to-indigo-900",
    skills: ["Customer Experience", "Partner Management", "Team Leadership"],
    description: [
      "Leading the iGT team for seamless exchange participant experiences.",
      "Managing customer journey and partner relationships globally.",
      "Training team members in customer-centric service delivery."
    ]
  },
  {
    id: 11,
    era: "ARC XI",
    title: "THE VISIONARY",
    role: "Art Director - Creators Back Office",
    organization: "AIESEC NSBM",
    period: "Jul 2025 - Present",
    status: "ongoing",
    icon: Palette,
    color: "#f59e0b",
    gradient: "from-amber-500 to-yellow-900",
    skills: ["Creative Direction", "Visual Identity", "Team Mentorship"],
    description: [
      "Leading creative vision for all AIESEC NSBM branding and campaigns.",
      "Supervising design and content creation for consistent visual identity.",
      "Mentoring designers and ensuring timely delivery of creative outputs."
    ]
  },
  {
    id: 12,
    era: "ARC XII",
    title: "THE SENTINEL",
    role: "University Ambassador",
    organization: "Legion Offensive Security",
    period: "Oct 2025 - Present",
    status: "ongoing",
    icon: Shield,
    color: "#ef4444",
    gradient: "from-red-500 to-rose-900",
    skills: ["Cybersecurity Advocacy", "Technical Exposure", "Community Building"],
    description: [
      "Promoting cybersecurity awareness and offensive security practices.",
      "Bridging the gap between industry and university communities.",
      "Organizing workshops and sessions on security fundamentals."
    ]
  }
];

// --- COMPETITION DATA ---
interface Competition {
  id: number;
  title: string;
  event: string;
  organizer: string;
  placement: string;
  year: string;
  color: string;
  icon: typeof Trophy;
}

const COMPETITIONS: Competition[] = [
  {
    id: 1,
    title: "2nd Runner Up",
    event: "Inter-University CTF Competition",
    organizer: "Cicra Campus",
    placement: "🥉",
    year: "2025",
    color: "#cd7f32",
    icon: Shield
  },
  {
    id: 2,
    title: "4th Place",
    event: "PlymHack 2026 Global Buildathon",
    organizer: "Plymouth University",
    placement: "4th",
    year: "2026",
    color: "#a855f7",
    icon: Flame
  },
  {
    id: 3,
    title: "Top 5",
    event: "HacktoNight 2025",
    organizer: "FOCC Community - NSBM",
    placement: "🏆",
    year: "2025",
    color: "#22c55e",
    icon: Zap
  },
  {
    id: 4,
    title: "Top 5",
    event: "CyberRush - All Island Competition",
    organizer: "CS&E Dept - University of Moratuwa",
    placement: "🏆",
    year: "2025",
    color: "#ef4444",
    icon: Target
  }
];

// --- CHAPTER CARD COMPONENT ---
const ChapterCard = ({ 
  chapter, 
  isActive, 
  onClick,
  index
}: { 
  chapter: Chapter; 
  isActive: boolean;
  onClick: () => void;
  index: number;
}) => {
  const Icon = chapter.icon;
  
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      onClick={onClick}
      className={`
        relative cursor-pointer group
        transition-all duration-500 ease-out
        ${isActive ? "z-20" : "z-10 hover:z-15"}
      `}
    >
      {/* Timeline connector */}
      {index < CHAPTERS.length - 1 && (
        <div className="absolute left-6 top-full w-0.5 h-8 bg-gradient-to-b from-zinc-600 to-transparent hidden md:block" />
      )}
      
      {/* Main Card */}
      <div 
        className={`
          relative overflow-hidden rounded-2xl border transition-all duration-500
          ${isActive 
            ? "border-white/30 bg-zinc-900/90 shadow-2xl scale-[1.02]" 
            : "border-zinc-800 bg-zinc-900/50 hover:border-zinc-600 hover:bg-zinc-900/70"
          }
        `}
        style={{
          boxShadow: isActive ? `0 0 60px ${chapter.color}20` : "none"
        }}
      >
        {/* Era Badge */}
        <div 
          className={`
            absolute top-0 right-0 px-4 py-2 text-[10px] font-black tracking-[0.3em]
            bg-gradient-to-l ${chapter.gradient} text-white
            clip-path-polygon
          `}
        >
          {chapter.era}
        </div>
        
        {/* Status indicator */}
        <div className="absolute top-4 left-4 flex items-center gap-2">
          <span 
            className={`w-2 h-2 rounded-full ${chapter.status === "ongoing" ? "bg-green-500 animate-pulse" : "bg-zinc-500"}`}
          />
          <span className="text-[10px] uppercase tracking-wider text-zinc-500">
            {chapter.status === "ongoing" ? "In Progress" : "Completed"}
          </span>
        </div>
        
        {/* Content */}
        <div className="p-6 pt-12">
          <div className="flex items-start gap-4">
            {/* Icon */}
            <div 
              className={`
                w-12 h-12 rounded-xl flex items-center justify-center
                bg-gradient-to-br ${chapter.gradient}
                transform transition-transform duration-300 group-hover:scale-110
              `}
            >
              <Icon size={24} className="text-white" />
            </div>
            
            {/* Text */}
            <div className="flex-1 min-w-0">
              <h3 className="text-xl md:text-2xl font-black text-white tracking-tight mb-1">
                {chapter.title}
              </h3>
              <p className="text-sm text-zinc-400 font-medium truncate">
                {chapter.role}
              </p>
            </div>
            
            {/* Expand indicator */}
            <ChevronRight 
              className={`
                text-zinc-500 transition-transform duration-300
                ${isActive ? "rotate-90" : "group-hover:translate-x-1"}
              `}
            />
          </div>
          
          {/* Organization & Period */}
          <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-zinc-500">
            <span className="flex items-center gap-1">
              <MapPin size={12} />
              {chapter.organization}
            </span>
            <span className="flex items-center gap-1">
              <Calendar size={12} />
              {chapter.period}
            </span>
          </div>
          
          {/* Expanded Content */}
          <AnimatePresence>
            {isActive && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="pt-6 mt-6 border-t border-zinc-800">
                  {/* Skills */}
                  <div className="mb-6">
                    <h4 className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 mb-3 flex items-center gap-2">
                      <Star size={12} /> Skills Acquired
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {chapter.skills.map((skill, i) => (
                        <span 
                          key={i}
                          className="px-3 py-1.5 text-xs font-medium rounded-full border border-zinc-700 text-zinc-300 bg-zinc-800/50"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {/* Description */}
                  <div className="space-y-3">
                    <h4 className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 flex items-center gap-2">
                      <BookOpen size={12} /> Chapter Summary
                    </h4>
                    {chapter.description.map((desc, i) => (
                      <motion.p 
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="text-sm text-zinc-400 leading-relaxed pl-4 border-l-2 border-zinc-700"
                      >
                        {desc}
                      </motion.p>
                    ))}
                  </div>
                  
                  {/* Achievement Badge */}
                  {chapter.achievement && (
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      className="mt-6 p-4 rounded-xl bg-gradient-to-r from-yellow-500/10 to-amber-500/10 border border-yellow-500/30"
                    >
                      <div className="flex items-center gap-3">
                        <Sparkles className="text-yellow-500" size={20} />
                        <p className="text-sm font-medium text-yellow-500">
                          {chapter.achievement}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        {/* Bottom gradient line */}
        <div 
          className="h-1 w-full"
          style={{ background: `linear-gradient(90deg, ${chapter.color}, transparent)` }}
        />
      </div>
    </motion.div>
  );
};

// --- PROGRESS INDICATOR ---
const ProgressIndicator = ({ activeIndex, total }: { activeIndex: number; total: number }) => (
  <div className="fixed right-8 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-3">
    {Array.from({ length: total }).map((_, i) => (
      <button
        key={i}
        className={`
          w-3 h-3 rounded-full transition-all duration-300 border-2
          ${i === activeIndex 
            ? "bg-white border-white scale-125" 
            : i < activeIndex
              ? "bg-zinc-600 border-zinc-600"
              : "bg-transparent border-zinc-600 hover:border-zinc-400"
          }
        `}
        aria-label={`Go to chapter ${i + 1}`}
      />
    ))}
  </div>
);

// --- FLOATING PARTICLES ---
const PARTICLE_CONFIG = [
  { id: 0, xPct: 0.12, yPct: 0.34, duration: 15, delay: 1 },
  { id: 1, xPct: 0.87, yPct: 0.67, duration: 18, delay: 2 },
  { id: 2, xPct: 0.45, yPct: 0.12, duration: 12, delay: 0 },
  { id: 3, xPct: 0.23, yPct: 0.89, duration: 20, delay: 3 },
  { id: 4, xPct: 0.67, yPct: 0.45, duration: 14, delay: 1.5 },
  { id: 5, xPct: 0.91, yPct: 0.23, duration: 16, delay: 4 },
  { id: 6, xPct: 0.34, yPct: 0.78, duration: 19, delay: 2.5 },
  { id: 7, xPct: 0.56, yPct: 0.56, duration: 13, delay: 0.5 },
  { id: 8, xPct: 0.78, yPct: 0.91, duration: 17, delay: 3.5 },
  { id: 9, xPct: 0.09, yPct: 0.67, duration: 11, delay: 1.2 },
  { id: 10, xPct: 0.43, yPct: 0.34, duration: 15, delay: 2.8 },
  { id: 11, xPct: 0.65, yPct: 0.12, duration: 18, delay: 0.8 },
  { id: 12, xPct: 0.21, yPct: 0.45, duration: 14, delay: 4.2 },
  { id: 13, xPct: 0.89, yPct: 0.78, duration: 16, delay: 1.8 },
  { id: 14, xPct: 0.54, yPct: 0.89, duration: 12, delay: 3.2 },
  { id: 15, xPct: 0.32, yPct: 0.21, duration: 19, delay: 0.3 },
  { id: 16, xPct: 0.76, yPct: 0.54, duration: 13, delay: 2.1 },
  { id: 17, xPct: 0.18, yPct: 0.09, duration: 17, delay: 4.5 },
  { id: 18, xPct: 0.95, yPct: 0.43, duration: 11, delay: 1.6 },
  { id: 19, xPct: 0.48, yPct: 0.76, duration: 20, delay: 3.8 },
];

const FloatingParticles = () => (
  <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
    {PARTICLE_CONFIG.map((particle) => (
      <motion.div
        key={particle.id}
        className="absolute w-1 h-1 bg-white/20 rounded-full"
        style={{
          left: `${particle.xPct * 100}%`,
          top: `${particle.yPct * 100}%`,
        }}
        animate={{
          y: [0, -100],
          opacity: [0, 0.5, 0],
        }}
        transition={{
          duration: particle.duration,
          repeat: Infinity,
          delay: particle.delay,
        }}
      />
    ))}
  </div>
);

// --- MAIN PAGE ---
export default function AchievementsPage() {
  const [activeChapter, setActiveChapter] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ container: containerRef });
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  // Calculate stats
  const totalYears = 7; // 2019 to 2026
  const ongoingRoles = CHAPTERS.filter(c => c.status === "ongoing").length;
  const completedArcs = CHAPTERS.filter(c => c.status === "completed").length;

  return (
    <main className="min-h-screen w-full bg-black text-white font-sans overflow-hidden relative">
      <div className="fixed z-50"><Sidebar /></div>
      
      {/* Background */}
      <div className="fixed inset-0 z-0">
        {/* Grid */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{ 
            backgroundImage: "linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)",
            backgroundSize: "60px 60px"
          }}
        />
        
        {/* Gradient orbs */}
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-cyan-500/5 rounded-full blur-3xl" />
      </div>
      
      <FloatingParticles />
      
      {/* Scroll Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 z-50"
        style={{ width: progressWidth }}
      />
      
      {/* Progress Indicator */}
      <ProgressIndicator activeIndex={activeChapter ?? -1} total={CHAPTERS.length} />

      {/* Content Container */}
      <div 
        ref={containerRef}
        className="relative z-10 min-h-screen overflow-y-auto px-4 md:px-8 lg:px-16 py-8 md:py-16"
      >
        {/* Header */}
        <header className="max-w-4xl mx-auto mb-12 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            {/* Decorative top */}
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-zinc-600" />
              <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-zinc-500">
                The Journey So Far
              </span>
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-zinc-600" />
            </div>
            
            {/* Title */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-300 to-zinc-500">
                ACHIEVEMENTS
              </span>
            </h1>
            
            {/* Subtitle */}
            <p className="text-lg md:text-xl text-zinc-500 font-light max-w-xl mx-auto leading-relaxed">
              Every chapter tells a story. Every role shapes the architect.
            </p>
            
            {/* Stats Row */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-6 md:gap-8">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-black text-white">{CHAPTERS.length}</div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 mt-1">Chapters</div>
              </div>
              <div className="h-8 w-px bg-zinc-800 hidden sm:block" />
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-black text-green-500">{ongoingRoles}</div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 mt-1">Active Roles</div>
              </div>
              <div className="h-8 w-px bg-zinc-800 hidden sm:block" />
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-black text-red-500">{COMPETITIONS.length}</div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 mt-1">Battles</div>
              </div>
              <div className="h-8 w-px bg-zinc-800 hidden sm:block" />
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-black text-purple-500">{totalYears}+</div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 mt-1">Years</div>
              </div>
            </div>
          </motion.div>
        </header>

        {/* Timeline Intro */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="flex items-center gap-4">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-zinc-700 to-transparent" />
            <span className="text-xs font-mono uppercase tracking-[0.3em] text-zinc-600 px-4">
              Leadership Timeline
            </span>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-zinc-700 to-transparent" />
          </div>
        </div>

        {/* Chapters */}
        <div className="max-w-4xl mx-auto space-y-6 pb-12">
          {CHAPTERS.map((chapter, index) => (
            <ChapterCard
              key={chapter.id}
              chapter={chapter}
              index={index}
              isActive={activeChapter === chapter.id}
              onClick={() => setActiveChapter(activeChapter === chapter.id ? null : chapter.id)}
            />
          ))}
        </div>

        {/* Competition Section Divider */}
        <div className="max-w-4xl mx-auto my-16">
          <div className="flex items-center gap-4">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-red-500/50 to-transparent" />
            <span className="text-xs font-mono uppercase tracking-[0.3em] text-red-500 px-4 flex items-center gap-2">
              <Trophy size={14} /> Battle Records
            </span>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-red-500/50 to-transparent" />
          </div>
        </div>

        {/* Competition Cards */}
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 pb-20">
          {COMPETITIONS.map((comp, index) => {
            const Icon = comp.icon;
            return (
              <motion.div
                key={comp.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="group relative overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/70 p-5 hover:border-zinc-600 transition-all duration-300"
                style={{
                  boxShadow: `0 0 30px ${comp.color}10`
                }}
              >
                {/* Placement Badge */}
                <div 
                  className="absolute top-0 right-0 px-4 py-2 text-lg font-black"
                  style={{ color: comp.color }}
                >
                  {comp.placement}
                </div>

                {/* Icon */}
                <div 
                  className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                  style={{ background: `${comp.color}20` }}
                >
                  <Icon size={20} style={{ color: comp.color }} />
                </div>

                {/* Title */}
                <h3 
                  className="text-xl font-black mb-1"
                  style={{ color: comp.color }}
                >
                  {comp.title}
                </h3>
                
                {/* Event Name */}
                <p className="text-white font-medium text-sm mb-2">
                  {comp.event}
                </p>

                {/* Organizer & Year */}
                <div className="flex items-center gap-3 text-xs text-zinc-500">
                  <span className="flex items-center gap-1">
                    <MapPin size={10} />
                    {comp.organizer}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar size={10} />
                    {comp.year}
                  </span>
                </div>

                {/* Bottom gradient */}
                <div 
                  className="absolute bottom-0 left-0 h-0.5 w-full"
                  style={{ background: `linear-gradient(90deg, ${comp.color}, transparent)` }}
                />
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="max-w-4xl mx-auto text-center py-16 border-t border-zinc-800/50"
        >
          <p className="text-zinc-600 text-sm">
            The story continues...
          </p>
          <p className="text-[10px] uppercase tracking-[0.3em] text-zinc-700 mt-2">
            Click on any chapter to expand
          </p>
        </motion.div>
      </div>
    </main>
  );
}
