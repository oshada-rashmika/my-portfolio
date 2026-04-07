"use client";
import dynamic from "next/dynamic";

// Lazy load easter egg components for better performance
const RickRoll = dynamic(() => import("./RickRoll"), { ssr: false });
const RightClickTrap = dynamic(() => import("./RightClickTrap"), { ssr: false });
const VoiceCommands = dynamic(() => import("./VoiceCommands"), { ssr: false });

export default function EasterEggs() {
  return (
    <>
      <RickRoll />
      <RightClickTrap />
      <VoiceCommands />
    </>
  );
}
