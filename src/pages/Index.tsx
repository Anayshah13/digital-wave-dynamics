import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Home, Calendar, Cpu, Users, Github, Mail } from 'lucide-react';
import BinaryLogo from '@/components/BinaryLogo';
import { FloatingDock } from '@/components/ui/floating-dock';
import AwardsSection from '@/components/AwardsSection';
import AnimatedWaves from '@/components/AnimatedWaves';
import { GridScan } from '@/components/GridScan';

const Index: React.FC = () => {
    const [logoFormed, setLogoFormed] = useState(false);
    const [startScan, setStartScan] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if (logoFormed) {
            const timer = setTimeout(() => setStartScan(true), 1500);
            return () => clearTimeout(timer);
        }
    }, [logoFormed]);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.playbackRate = 0.8;
        }
    }, []);

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
            {/* Hero Section - Sticky for parallax effect */}
            <section className="sticky top-0 z-0 h-[97vh] w-full overflow-hidden flex items-center justify-center font-mono select-none bg-black">
                {/* Dynamic Background with Glows */}
                {/* Video Background */}
                <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
                    <video
                        ref={videoRef}
                        autoPlay
                        loop
                        muted
                        playsInline
                        poster="/goat_holder.jpeg"
                        className="absolute inset-0 w-full h-full object-cover"
                    >
                        <source src="/goat.mp4" type="video/mp4" />
                    </video>
                    {/* Dark gradient overlay to ensure content visibility */}
                    <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent" />
                </div>

                {/* Grid Scan - Infinite scanning after logo formation with delay */}
                {startScan && (
                    <div className="absolute inset-0 z-[1] pointer-events-none">
                        <GridScan
                            linesColor="rgb(59, 162, 162)"
                            scanColor="#3b9da2" // Matching teal tone
                            enableContinuousScan={true}
                            // Increased scan duration to make it slower and steady
                            scanDuration={3.5}
                            gridScale={0.15}
                            className="w-full h-full bg-transparent"
                        />
                    </div>
                )}

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
                    desktopClassName="bg-transparent backdrop-blur-[40px] border border-white/20 h-20 gap-8 px-10 pb-4 shadow-2xl shadow-black/40"
                    mobileClassName="bg-transparent backdrop-blur-[40px] border border-white/20"
                />
            </motion.div>

            {/* Awards Section - Flows naturally after Hero */}
            <div className="relative z-20 drop-shadow-2xl">
                <AwardsSection />
            </div>
        </div>
    );
};

export default Index;
