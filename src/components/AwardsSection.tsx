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
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ 
        scale: 1.05, 
        y: -10,
        boxShadow: "0 20px 40px rgba(0, 161, 181, 0.3)"
      }}
      className="glass-teal rounded-xl p-6 flex flex-col items-center text-center min-w-[180px] max-w-[200px] cursor-pointer transition-all duration-300 group"
    >
      <motion.span 
        className="text-3xl md:text-4xl font-kalnia font-bold text-primary mb-3 group-hover:text-accent transition-colors"
        whileHover={{ scale: 1.1 }}
      >
        {award.year}
      </motion.span>
      <h3 className="text-sm md:text-base font-kaisei font-medium text-foreground mb-2 group-hover:text-glow-subtle transition-all">
        {award.title}
      </h3>
      <p className="text-xs font-kaisei text-muted-foreground leading-relaxed group-hover:text-secondary-foreground transition-colors">
        {award.description}
      </p>
    </motion.div>
  );
};

const AwardsSection: React.FC = () => {
  return (
    <section className="min-h-screen w-full relative overflow-hidden">
      {/* Background with waves continuation */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary-dark/50 to-primary-deep/80" />
      
      {/* Decorative waves at top */}
      <div className="absolute top-0 left-0 right-0 h-32 pointer-events-none">
        <svg 
          className="w-full h-full" 
          preserveAspectRatio="none" 
          viewBox="0 0 1440 100" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <motion.path
            animate={{ 
              d: [
                "M0,50L60,55C120,60,240,70,360,72C480,74,600,68,720,60C840,52,960,42,1080,42C1200,42,1320,52,1380,57L1440,62L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z",
                "M0,60L60,52C120,44,240,28,360,30C480,32,600,52,720,62C840,72,960,72,1080,65C1200,58,1320,44,1380,37L1440,30L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z",
                "M0,50L60,55C120,60,240,70,360,72C480,74,600,68,720,60C840,52,960,42,1080,42C1200,42,1320,52,1380,57L1440,62L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
              ]
            }}
            transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
            fill="#00a1b5"
            opacity="0.4"
          />
          <motion.path
            animate={{ 
              d: [
                "M0,30L60,35C120,40,240,50,360,52C480,54,600,48,720,42C840,36,960,30,1080,32C1200,34,1320,44,1380,49L1440,54L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z",
                "M0,40L60,34C120,28,240,16,360,20C480,24,600,44,720,52C840,60,960,56,1080,48C1200,40,1320,28,1380,22L1440,16L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z",
                "M0,30L60,35C120,40,240,50,360,52C480,54,600,48,720,42C840,36,960,30,1080,32C1200,34,1320,44,1380,49L1440,54L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
              ]
            }}
            transition={{ repeat: Infinity, duration: 6, ease: "easeInOut", delay: 0.5 }}
            fill="#006575"
            opacity="0.6"
          />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 py-20">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-kalnia text-5xl md:text-7xl lg:text-8xl font-bold text-foreground mb-16 text-glow tracking-wider"
        >
          AWARDS
        </motion.h1>

        <div className="flex flex-wrap justify-center gap-4 md:gap-6 max-w-6xl">
          {awards.map((award, index) => (
            <AwardCard key={`${award.year}-${index}`} award={award} index={index} />
          ))}
        </div>
      </div>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  );
};

export default AwardsSection;
