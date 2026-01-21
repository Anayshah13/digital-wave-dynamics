import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { Home, Calendar, Cpu, Users, Mail, Github } from 'lucide-react';

interface DockItemProps {
  title: string;
  icon: React.ReactNode;
  href: string;
  mouseX: ReturnType<typeof useMotionValue<number>>;
}

const DockIcon: React.FC<DockItemProps> = ({ mouseX, title, icon }) => {
  const ref = useRef<HTMLDivElement>(null);

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const sizeTransform = useTransform(distance, [-120, 0, 120], [38, 52, 38]);
  const size = useSpring(sizeTransform, { mass: 0.08, stiffness: 180, damping: 18 });

  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <motion.div
      ref={ref}
      style={{ width: size, height: size }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative flex items-center justify-center rounded-full bg-white/3 backdrop-blur-2xl border border-white/8 text-white/50 hover:text-white hover:bg-white/8 hover:border-white/20 transition-all duration-300 cursor-pointer"
    >
      <AnimatePresence>
        {isHovered && (
          <motion.span
            initial={{ opacity: 0, y: 8, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute -top-10 left-1/2 -translate-x-1/2 rounded-lg bg-black/60 backdrop-blur-xl border border-white/10 px-3 py-1.5 text-[10px] font-medium text-white/90 whitespace-nowrap z-50"
          >
            {title}
          </motion.span>
        )}
      </AnimatePresence>
      <motion.div
        animate={{ y: isHovered ? -4 : 0 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="h-4 w-4 md:h-5 md:w-5"
      >
        {icon}
      </motion.div>
    </motion.div>
  );
};

interface FloatingDockProps {
  onNavigate?: (section: string) => void;
}

const FloatingDock: React.FC<FloatingDockProps> = ({ onNavigate }) => {
  const mouseX = useMotionValue(Infinity);

  const items = [
    { title: "Home", icon: <Home className="h-full w-full" />, href: "#home" },
    { title: "Events", icon: <Calendar className="h-full w-full" />, href: "#events" },
    { title: "Projects", icon: <Cpu className="h-full w-full" />, href: "#projects" },
    { title: "Team", icon: <Users className="h-full w-full" />, href: "#team" },
    { title: "GitHub", icon: <Github className="h-full w-full" />, href: "#github" },
    { title: "Contact", icon: <Mail className="h-full w-full" />, href: "#contact" },
  ];

  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className="mx-auto flex h-14 md:h-16 items-end gap-3 md:gap-4 rounded-full bg-black/20 backdrop-blur-2xl border border-white/6 px-8 md:px-10 pb-2 md:pb-2.5 shadow-2xl shadow-black/20"
    >
      {items.map((item) => (
        <DockIcon key={item.title} mouseX={mouseX} {...item} />
      ))}
    </motion.div>
  );
};

export default FloatingDock;