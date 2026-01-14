import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Home, Calendar, Cpu, Users, Github, Mail } from 'lucide-react';
import BinaryLogo from '@/components/BinaryLogo';
import { FloatingDock } from '@/components/ui/floating-dock';
import AwardsSection from '@/components/AwardsSection';
import AnimatedWaves from '@/components/AnimatedWaves';

const Index: React.FC = () => {
    const [logoFormed, setLogoFormed] = useState(false);

    // Nav items with larger icons relative to container if needed, but styling is handled by container classes
    const navItems = [
        { title: "Home", icon: <Home className="h-full w-full text-neutral-300 dark:text-neutral-200" />, href: "#home" },
        { title: "Events", icon: <Calendar className="h-full w-full text-neutral-300 dark:text-neutral-200" />, href: "#events" },
        { title: "Projects", icon: <Cpu className="h-full w-full text-neutral-300 dark:text-neutral-200" />, href: "#projects" },
        { title: "Team", icon: <Users className="h-full w-full text-neutral-300 dark:text-neutral-200" />, href: "#team" },
        { title: "GitHub", icon: <Github className="h-full w-full text-neutral-300 dark:text-neutral-200" />, href: "#github" },
        { title: "Contact", icon: <Mail className="h-full w-full text-neutral-300 dark:text-neutral-200" />, href: "#contact" },
    ];

    return (
        <div className="relative w-full bg-black min-h-screen">
            {/* Hero Section - 97% viewport height as requested */}
            <section className="relative h-[97vh] w-full overflow-hidden flex items-center justify-center font-mono select-none bg-black">
                {/* Dynamic Background with Glows */}
                <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
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

                    {/* Dynamic right side glow */}
                    <motion.div
                        animate={{
                            scale: [1, 1.1, 1],
                            opacity: [0.02, 0.05, 0.02],
                        }}
                        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute top-[-10%] right-[-30%] w-[30%] h-[150%]"
                        style={{
                            background: 'radial-gradient(ellipse at center, hsla(186, 97%, 12%, 1.00), transparent 70%)',
                            filter: 'blur(60px)',
                        }}
                    />

                    {/* Second dynamic orb for movement */}
                    <motion.div
                        animate={{
                            x: [0, -50, 0],
                            y: [0, 50, 0],
                            opacity: [0.1, 0.2, 0.1],
                        }}
                        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute bottom-[20%] right-[10%] w-[500px] h-[500px] rounded-full"
                        style={{
                            background: 'radial-gradient(circle at center, hsl(186, 100%, 40%), transparent 70%)',
                            filter: 'blur(80px)',
                        }}
                    />
                </div>

                {/* Binary Logo Canvas */}
                <div className="absolute inset-0 z-10">
                    <BinaryLogo onLogoFormed={() => setLogoFormed(true)} />
                </div>

                {/* Lighter Waves integrated into Hero */}
                <AnimatedWaves />
            </section>

            {/* Floating Dock - Fixed to bottom of viewport (Sticky) */}
            <motion.div
                initial={{ y: 200, opacity: 0 }}
                animate={{ y: logoFormed ? 0 : 200, opacity: logoFormed ? 1 : 0 }}
                transition={{ delay: 0.5, duration: 0.6, ease: "easeOut" }}
                className="fixed bottom-8 left-0 right-0 z-50 flex justify-center pointer-events-auto px-4"
            >
                <FloatingDock
                    items={navItems}
                    desktopClassName="bg-transparent backdrop-blur-[40px] border border-white/20 h-20 gap-4 pb-4 shadow-2xl shadow-black/40"
                    mobileClassName="bg-transparent backdrop-blur-[40px] border border-white/20"
                />
            </motion.div>

            {/* Awards Section - Flows naturally after Hero */}
            <div className="relative z-20">
                <AwardsSection />
            </div>
        </div>
    );
};

export default Index;
