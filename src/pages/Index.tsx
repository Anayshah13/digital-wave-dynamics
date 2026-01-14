import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import BinaryLogo from '@/components/BinaryLogo';
import AnimatedWaves from '@/components/AnimatedWaves';
import FloatingDock from '@/components/FloatingDock';
import AwardsSection from '@/components/AwardsSection';

const Index: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [logoFormed, setLogoFormed] = useState(false);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Transform for the awards section sliding up
  const awardsY = useTransform(scrollYProgress, [0, 0.5], ["100vh", "0vh"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0.3]);

  return (
    <div ref={containerRef} className="relative w-full">
      {/* Hero Section - Full screen */}
      <motion.section 
        style={{ opacity: heroOpacity }}
        className="h-screen w-full bg-black overflow-hidden flex items-center justify-center relative font-mono select-none sticky top-0"
      >
        {/* Background gradient - black left, teal elements right */}
        <div className="absolute inset-0 pointer-events-none z-0">
          {/* Base pure black */}
          <div className="absolute inset-0 bg-black" />
          
          {/* Right side teal gradient - more visible */}
          <div 
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to right, transparent 0%, transparent 50%, rgba(0, 45, 55, 0.4) 75%, rgba(0, 70, 85, 0.5) 100%)'
            }}
          />
          
          {/* Central black overlay to keep left side dark */}
          <div 
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,0.98) 30%, rgba(0,0,0,0.7) 50%, transparent 70%)'
            }}
          />
          
          {/* Multiple radial glows on the right */}
          <div 
            className="absolute top-0 right-0 w-[70%] h-full opacity-25"
            style={{
              background: 'radial-gradient(ellipse at 90% 30%, hsl(186, 100%, 30%), transparent 50%)'
            }}
          />
          <div 
            className="absolute bottom-0 right-0 w-[50%] h-[60%] opacity-20"
            style={{
              background: 'radial-gradient(ellipse at 80% 80%, hsl(175, 80%, 25%), transparent 60%)'
            }}
          />
          
          {/* Grid pattern on right side */}
          <div 
            className="absolute top-0 right-0 w-1/2 h-full opacity-[0.03]"
            style={{
              backgroundImage: `
                linear-gradient(to right, hsl(186, 100%, 50%) 1px, transparent 1px),
                linear-gradient(to bottom, hsl(186, 100%, 50%) 1px, transparent 1px)
              `,
              backgroundSize: '40px 40px'
            }}
          />
          
          {/* Floating glow orbs */}
          <div 
            className="absolute top-20 right-32 w-80 h-80 opacity-15 blur-[100px] animate-pulse-glow"
            style={{ background: 'hsl(186, 100%, 40%)' }}
          />
          <div 
            className="absolute bottom-1/4 right-1/4 w-64 h-64 opacity-10 blur-[80px]"
            style={{ background: 'hsl(175, 80%, 35%)' }}
          />
          <div 
            className="absolute top-1/2 right-10 w-40 h-40 opacity-20 blur-[60px]"
            style={{ background: 'hsl(186, 100%, 50%)' }}
          />
          
          {/* Diagonal lines pattern on right */}
          <div 
            className="absolute top-0 right-0 w-1/3 h-full opacity-[0.02]"
            style={{
              backgroundImage: 'repeating-linear-gradient(45deg, hsl(186, 100%, 50%) 0, hsl(186, 100%, 50%) 1px, transparent 1px, transparent 20px)'
            }}
          />
        </div>

        {/* Binary Logo Canvas */}
        <BinaryLogo onLogoFormed={() => setLogoFormed(true)} />
        
        {/* Animated Waves */}
        <AnimatedWaves />

        {/* Floating Dock */}
        <div className="absolute bottom-[12%] left-0 right-0 z-40 flex justify-center pointer-events-auto px-4">
          <FloatingDock />
        </div>

        {/* Scroll indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: logoFormed ? 1 : 0 }}
          transition={{ delay: 2, duration: 0.5 }}
          className="absolute bottom-4 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center gap-2"
        >
          <span className="text-muted-foreground text-xs font-kaisei tracking-wider">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            className="w-5 h-8 rounded-full border-2 border-muted-foreground/50 flex items-start justify-center p-1"
          >
            <motion.div 
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              className="w-1 h-2 bg-primary rounded-full" 
            />
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Awards Section - Slides up to cover hero */}
      <motion.div 
        style={{ y: awardsY }}
        className="relative z-20 bg-background"
      >
        <AwardsSection />
      </motion.div>

      {/* Spacer for scroll */}
      <div className="h-screen" />
    </div>
  );
};

export default Index;
