import React from 'react';
import { motion } from 'framer-motion';

interface Award {
  year: string;
  title: string;
  description: string;
}

const awards: Award[] = [
  {
    year: "2014",
    title: "Best Student Chapter",
    description: "Awarded the Best student chapter at Trinity"
  },
  {
    year: "2017",
    title: "Most Active CSI Branch",
    description: "Won the award for Most Active CSI branch at the Annual Convention"
  },
  {
    year: "2019",
    title: "Longest Continuous SBC",
    description: "Won the Longest Continuous SBC at CSI's Annual Convention"
  },
  {
    year: "2019",
    title: "Best Accredited CSI Student Branch",
    description: "Won the award for Best Accredited CSI student branch at the Annual Convention"
  },
  {
    year: "2024",
    title: "Best HOD of the Year",
    description: "Dr. Vinaya Sawant (Branch Counsellor) was awarded \"Best HOD Of The Year 2024\" at the Industry Academia Conference 2024"
  }
];

const AwardCard: React.FC<{ award: Award; index: number }> = ({ award, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5, ease: "easeOut" }}
      whileHover={{ 
        scale: 1.12, 
        y: -20,
        rotateY: 5,
        rotateX: -5,
        transition: { duration: 0.3, ease: "easeOut" }
      }}
      className="glass-teal rounded-xl p-6 flex flex-col items-center text-center min-w-[180px] max-w-[200px] cursor-pointer group relative overflow-hidden"
      style={{ transformStyle: 'preserve-3d' }}
    >
      {/* Animated glow effect on hover */}
      <motion.div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: 'radial-gradient(circle at 50% 50%, hsl(186, 100%, 40%) 0%, transparent 70%)',
          filter: 'blur(20px)',
          transform: 'translateZ(-10px)'
        }}
      />
      
      {/* Shimmer effect */}
      <motion.div 
        className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-300"
        style={{
          background: 'linear-gradient(105deg, transparent 40%, hsl(186, 100%, 70%) 50%, transparent 60%)',
          transform: 'translateX(-100%)'
        }}
        whileHover={{
          transform: ['translateX(-100%)', 'translateX(100%)'],
          transition: { duration: 0.6, ease: "easeInOut" }
        }}
      />
      
      <motion.span 
        className="relative z-10 text-3xl md:text-4xl font-kalnia font-bold text-primary mb-3 group-hover:text-accent transition-colors duration-300"
        whileHover={{ scale: 1.15, textShadow: "0 0 20px hsl(186, 100%, 50%)" }}
      >
        {award.year}
      </motion.span>
      <h3 className="relative z-10 text-sm md:text-base font-kaisei font-medium text-foreground mb-2 group-hover:text-white transition-all duration-300">
        {award.title}
      </h3>
      <p className="relative z-10 text-xs font-kaisei text-muted-foreground leading-relaxed group-hover:text-foreground/80 transition-colors duration-300">
        {award.description}
      </p>
      
      {/* Border glow on hover */}
      <motion.div 
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          boxShadow: 'inset 0 0 20px hsl(186, 100%, 40%), 0 0 30px hsl(186, 100%, 30%)'
        }}
      />
    </motion.div>
  );
};

const AwardsSection: React.FC = () => {
  return (
    <section className="h-full w-full relative overflow-hidden flex flex-col items-center justify-center">
      {/* Background matching the wave colors */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary-dark via-primary-deep to-background" />
      
      {/* Subtle grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(to right, hsl(186, 100%, 50%) 1px, transparent 1px),
            linear-gradient(to bottom, hsl(186, 100%, 50%) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px'
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center px-6 py-16">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-kalnia text-5xl md:text-7xl lg:text-8xl font-bold text-foreground mb-12 text-glow tracking-wider"
        >
          AWARDS
        </motion.h1>

        <div className="flex flex-wrap justify-center gap-4 md:gap-6 max-w-6xl">
          {awards.map((award, index) => (
            <AwardCard key={`${award.year}-${index}`} award={award} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AwardsSection;