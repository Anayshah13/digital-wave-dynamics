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

  const sizeTransform = useTransform(distance, [-100, 0, 100], [40, 56, 40]);
  const size = useSpring(sizeTransform, { mass: 0.1, stiffness: 220, damping: 22 });

  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <motion.div
      ref={ref}
      style={{ width: size, height: size }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative flex items-center justify-center rounded-full glass border-primary/20 text-muted-foreground hover:text-foreground hover:border-primary/50 transition-all shadow-md cursor-pointer"
    >
      <AnimatePresence>
        {isHovered && (
          <motion.span 
            initial={{ opacity: 0, y: 10, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.9 }}
            transition={{ duration: 0.15 }}
            className="absolute -top-12 left-1/2 -translate-x-1/2 rounded-lg glass-strong px-3 py-1.5 text-xs font-medium text-foreground whitespace-nowrap z-50"
          >
            {title}
          </motion.span>
        )}
      </AnimatePresence>
      <motion.div 
        whileHover={{ y: -6 }}
        transition={{ duration: 0.2 }}
        className="h-5 w-5 md:h-6 md:w-6"
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
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1.5, duration: 0.6, ease: "easeOut" }}
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className="mx-auto flex h-14 md:h-16 items-end gap-2 md:gap-3 rounded-2xl glass-strong px-4 md:px-6 pb-2 md:pb-3 shadow-xl"
    >
      {items.map((item) => (
        <DockIcon key={item.title} mouseX={mouseX} {...item} />
      ))}
    </motion.div>
  );
};

export default FloatingDock;
