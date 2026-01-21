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
                scale: 1.05,
                y: -10,
                transition: { duration: 0.3, ease: "easeOut" }
            }}
            className="rounded-3xl p-6 flex flex-col items-center text-center h-full min-h-[420px] cursor-pointer group relative overflow-hidden backdrop-blur-[2px] border border-white/10 bg-[#0A2A35]/10 shadow-xl transition-all duration-500 hover:bg-[#0A2A35]/30 hover:border-white/20"
        >
            {/* Internal Glow - Always Visible */}
            <motion.div
                className="absolute inset-0 opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                    boxShadow: 'inset 0 0 50px rgba(86, 161, 178, 0.15)'
                }}
            />

            {/* Animated glow spot - Always Visible */}
            <motion.div
                className="absolute inset-0 opacity-30 transition-opacity duration-500"
                style={{
                    background: 'radial-gradient(circle at 50% -20%, rgba(255, 255, 255, 0.1) 0%, transparent 60%)',
                }}
            />

            <motion.span
                className="relative z-10 text-4xl lg:text-5xl font-techy font-bold text-[#56A1B2] mb-6 tracking-wide group-hover:text-white transition-colors duration-300 drop-shadow-lg"
                style={{ textShadow: '0 4px 20px rgba(86, 161, 178, 0.3)' }}
                whileHover={{ scale: 1.05 }}
            >
                {award.year}
            </motion.span>
            <h3 className="relative z-10 text-lg lg:text-xl font-kaisei font-bold text-white mb-2 tracking-wide group-hover:text-accent transition-all duration-300 w-full leading-tight">
                {award.title}
            </h3>

            {/* Separator Line */}
            <div className="w-20 h-px bg-white/20 my-4 relative z-10"></div>

            <p className="relative z-10 text-lg lg:text-xl font-kaisei text-white/70 leading-relaxed group-hover:text-white/90 transition-colors duration-300">
                {award.description}
            </p>
        </motion.div>
    );
};

const AwardsSection: React.FC = () => {
    return (
        <section
            className="relative w-full flex flex-col items-center justify-start pt-28 pb-20"
            style={{
                background: 'linear-gradient(180deg, #040708 0%, #184752 100%)'
            }}
        >

            {/* Darkest Wave connecting to Hero - TOP LAYER - SIGNIFICANTLY Increased Amplitude */}
            <div className="absolute top-0 left-0 right-0 w-full h-[150px] -translate-y-[95%] z-50 overflow-hidden pointer-events-none leading-0">
                <svg
                    className="w-full h-full"
                    preserveAspectRatio="none"
                    viewBox="0 0 1440 320"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <defs>
                        <pattern id="white-dots" x="0" y="0" width="19" height="40" patternUnits="userSpaceOnUse">
                            <circle cx="1" cy="1" r="1" fill="#ffffff" fillOpacity="0.4" />
                        </pattern>
                    </defs>

                    {/* Single Darkest Wave Base - Heavy Amplitude */}
                    <motion.path
                        animate={{
                            d: [
                                "M0,256L48,261.3C96,266.7,192,277.3,288,266.7C384,256,480,213.3,576,202.7C672,192,768,224,864,245.3C960,266.7,1056,298.7,1152,288C1248,277.3,1344,224,1392,213.3L1440,202.7L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
                                "M0,288L48,272C96,256,192,224,288,234.7C384,245.3,480,298.7,576,288C672,277.3,768,224,864,213.3C960,202.7,1056,256,1152,266.7C1248,277.3,1344,256,1392,234.7L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
                                "M0,224L48,234.7C96,245.3,192,277.3,288,266.7C384,256,480,202.7,576,192C672,181.3,768,213.3,864,234.7C960,256,1056,288,1152,277.3C1248,266.7,1344,213.3,1392,192L1440,181.3L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                            ]
                        }}
                        transition={{ repeat: Infinity, duration: 8, ease: "easeIn" }}
                        fill="#040708"
                    />

                    {/* Dots Overlay mapped to the same Wave Path */}
                    <motion.path
                        animate={{
                            d: [
                                "M0,256L48,261.3C96,266.7,192,277.3,288,266.7C384,256,480,213.3,576,202.7C672,192,768,224,864,245.3C960,266.7,1056,298.7,1152,288C1248,277.3,1344,224,1392,213.3L1440,202.7L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
                                "M0,288L48,272C96,256,192,224,288,234.7C384,245.3,480,298.7,576,288C672,277.3,768,224,864,213.3C960,202.7,1056,256,1152,266.7C1248,277.3,1344,256,1392,234.7L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
                                "M0,224L48,234.7C96,245.3,192,277.3,288,266.7C384,256,480,202.7,576,192C672,181.3,768,213.3,864,234.7C960,256,1056,288,1152,277.3C1248,266.7,1344,213.3,1392,192L1440,181.3L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                            ]
                        }}
                        transition={{ repeat: Infinity, duration: 8, ease: "easeIn" }}
                        fill="url(#white-dots)"
                    />
                </svg>
            </div>

            {/* Main Section White Dotted pattern background */}
            <div
                className="absolute inset-0 opacity-[0.3]"
                style={{
                    backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)',
                    backgroundSize: '24px 24px'
                }}
            />

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center justify-center px-6 w-full max-w-[1800px] mx-auto">
                <motion.h1
                    initial={{ opacity: 0, y: -30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="font-kalnia text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-20 text-glow tracking-wider text-center"
                >
                    AWARDS
                </motion.h1>

                {/* Updated grid container to fit 5 items in a row on large screens */}
                <div className="grid grid-cols-1 md:grid-cols-5 gap-6 lg:gap-8 w-full px-4 items-stretch">
                    {awards.map((award, index) => (
                        <AwardCard key={`${award.year}-${index}`} award={award} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default AwardsSection;
