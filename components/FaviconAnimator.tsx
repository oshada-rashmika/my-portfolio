"use client";
import { useEffect } from "react";

export default function FaviconAnimator() {
  useEffect(() => {
    // ===============================================
    // 1. FAVICON ANIMATION (Sprite Sheet) - UNCHANGED
    // ===============================================
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.src = '/assets/tab-sprite.png'; 

    let faviconInterval: NodeJS.Timeout;
    let currentFrame = 0;

    img.onload = () => {
      const frameSize = img.height; 
      const totalFrames = Math.floor(img.width / frameSize);
      canvas.width = 32;
      canvas.height = 32;

      faviconInterval = setInterval(() => {
        if (!ctx) return;
        ctx.clearRect(0, 0, 32, 32);
        ctx.drawImage(
          img, 
          currentFrame * frameSize, 0, frameSize, frameSize, 
          0, 0, 32, 32
        );

        let link = document.querySelector("link[rel*='icon']") as HTMLLinkElement;
        if (!link) {
          link = document.createElement('link');
          link.rel = 'shortcut icon';
          document.head.appendChild(link);
        }
        link.type = 'image/png';
        link.href = canvas.toDataURL('image/png');

        currentFrame = (currentFrame + 1) % totalFrames;
      }, 200); // Reduced from 100ms to 200ms for better performance
    };

    // ===============================================
    // 2. TITLE ANIMATION (Typewriter Effect)
    // ===============================================
    const phrases = [
      "Oshada Rashmika", 
      "Agentic AI", 
      "Autonomous Systems", 
      "FullStack Dev"
    ];
    
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeTimeout: NodeJS.Timeout;

    const typeLoop = () => {
      const currentPhrase = phrases[phraseIndex];
      
      // Determine the text to show based on current character index
      const displayText = currentPhrase.substring(0, charIndex);
      
      // Update Title with a cursor '|'
      document.title = `${displayText}|`;

      // Determine typing speed - slightly slower for performance
      let typeSpeed = 120; // Typing speed (was 100)

      if (isDeleting) {
        typeSpeed = 60; // Deleting speed (was 50)
        charIndex--;
      } else {
        charIndex++;
      }

      // LOGIC: Check state transitions
      
      // 1. Finished Typing the entire phrase
      if (!isDeleting && charIndex === currentPhrase.length + 1) {
        isDeleting = true;
        typeSpeed = 2500; // Wait 2.5 seconds before deleting
      } 
      
      // 2. Finished Deleting the phrase
      else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typeSpeed = 600; // Short pause before typing next one
      }

      // Loop
      typeTimeout = setTimeout(typeLoop, typeSpeed);
    };

    // Start the loop
    typeLoop();

    // ===============================================
    // CLEANUP
    // ===============================================
    return () => {
      clearInterval(faviconInterval);
      clearTimeout(typeTimeout);
    };
  }, []);

  return null;
}