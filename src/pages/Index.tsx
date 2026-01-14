import React, { useRef, useState } from 'react';
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
    offset: ["start start", "end end"]
  });

  // Transform for the awards section sliding up from within the waves
  const awardsY = useTransform(scrollYProgress, [0.1, 0.6], ["100%", "0%"]);
  const awardsOpacity = useTransform(scrollYProgress, [0.1, 0.4], [0, 1]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);

  return (
    <div ref={containerRef} className="relative w-full h-[200vh] overflow-hidden">
      {/* Hero Section - Full screen, sticky */}
      <motion.section 
        style={{ opacity: heroOpacity }}
        className="h-screen w-full bg-black overflow-hidden flex items-center justify-center relative font-mono select-none sticky top-0"
      >
        {/* Simplified background - black to teal gradient with grid */}
        <div className="absolute inset-0 pointer-events-none z-0">
          {/* Base gradient from black to teal */}
          <div 
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(135deg, hsl(0, 0%, 0%) 0%, hsl(0, 0%, 0%) 40%, hsl(186, 100%, 8%) 70%, hsl(186, 100%, 15%) 100%)'
            }}
          />
          
          {/* Grid pattern overlay */}
          <div 
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: `
                linear-gradient(to right, hsl(186, 100%, 50%) 1px, transparent 1px),
                linear-gradient(to bottom, hsl(186, 100%, 50%) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px'
            }}
          />
          
          {/* Subtle teal glow on right */}
          <div 
            className="absolute top-0 right-0 w-[60%] h-full opacity-20"
            style={{
              background: 'radial-gradient(ellipse at 80% 50%, hsl(186, 100%, 30%), transparent 60%)'
            }}
          />
        </div>

        {/* Binary Logo Canvas */}
        <BinaryLogo onLogoFormed={() => setLogoFormed(true)} />
        
        {/* Animated Waves - extends down to blend with awards */}
        <AnimatedWaves />

        {/* Floating Dock */}
        <motion.div 
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: logoFormed ? 0 : 100, opacity: logoFormed ? 1 : 0 }}
          transition={{ delay: 0.5, duration: 0.6, ease: "easeOut" }}
          className="absolute bottom-[15%] left-0 right-0 z-40 flex justify-center pointer-events-auto px-4"
        >
          <FloatingDock />
        </motion.div>
      </motion.section>

      {/* Awards Section - Slides up from within the waves */}
      <motion.div 
        style={{ y: awardsY, opacity: awardsOpacity }}
        className="fixed bottom-0 left-0 right-0 z-50 h-screen"
      >
        <AwardsSection />
      </motion.div>
    </div>
  );
};

export default Index;