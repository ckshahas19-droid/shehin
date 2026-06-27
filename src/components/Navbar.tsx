import { useEffect, useState } from 'react';
import { motion } from 'motion/react';

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export default function Navbar({ activeSection, onNavigate }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [logoHovered, setLogoHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { name: 'Home', id: 'hero', external: false },
    { name: 'Work', id: 'work', external: false },
    { name: 'Explorations', id: 'explorations', external: false },
    { name: 'Resume', id: 'https://docs.google.com/document/d/12yC9sRgKbDgDXlsPNWQv7MwWrbkzFxFoA6lv6j-J3Co/edit?tab=t.0', external: true }
  ];

  return (
    <nav
      id="main-navbar"
      className="absolute top-0 left-0 right-0 z-20 flex justify-center pt-6 px-6 md:px-10"
    >
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1], delay: 0.2 }}
        className={`inline-flex items-center rounded-full border border-white/10 bg-surface/90 px-3 py-2 transition-all duration-300 ${
          scrolled ? 'shadow-lg shadow-black/40 backdrop-blur-lg scale-95 border-white/15' : 'backdrop-blur-md'
        }`}
      >
        {/* 1. Logo */}
        <div
          id="logo-container"
          className="relative cursor-pointer flex items-center justify-center p-1"
          onMouseEnter={() => setLogoHovered(true)}
          onMouseLeave={() => setLogoHovered(false)}
          onClick={() => onNavigate('hero')}
        >
          <motion.div
            animate={{ scale: logoHovered ? 1.1 : 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 15 }}
            className="w-9 h-9 rounded-full flex items-center justify-center relative overflow-hidden"
          >
            {/* Logo Ring with reversing gradient */}
            <div
              className="absolute inset-0 rounded-full transition-transform duration-700 ease-in-out accent-gradient"
              style={{
                transform: logoHovered ? 'rotate(180deg)' : 'rotate(0deg)',
              }}
            />
            {/* Inner background and initials */}
            <div className="absolute inset-[2px] bg-bg rounded-full flex items-center justify-center">
              <span className="font-display italic text-text-primary text-[14px] leading-none font-semibold tracking-wide">
                SV
              </span>
            </div>
          </motion.div>
        </div>

        {/* 2. Divider */}
        <div className="w-px h-5 bg-stroke/60 mx-2 hidden sm:block" />

        {/* 3. Nav Links */}
        <div className="flex items-center gap-1 sm:gap-2">
          {links.map((link) => {
            if (link.external) {
              return (
                <a
                  key={link.id}
                  href={link.id}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs sm:text-sm rounded-full px-3 sm:px-4 py-1.5 sm:py-2 transition-all duration-300 text-muted hover:text-text-primary hover:bg-stroke/40 font-medium inline-flex items-center gap-0.5"
                >
                  {link.name}
                  <span className="text-[9px] opacity-60">↗</span>
                </a>
              );
            }
            const isActive = activeSection === link.id;
            return (
              <button
                key={link.id}
                onClick={() => onNavigate(link.id)}
                className={`text-xs sm:text-sm rounded-full px-3 sm:px-4 py-1.5 sm:py-2 transition-all duration-300 relative font-medium ${
                  isActive
                    ? 'text-text-primary bg-stroke/80'
                    : 'text-muted hover:text-text-primary hover:bg-stroke/40'
                }`}
              >
                {link.name}
              </button>
            );
          })}
        </div>

        {/* 4. Divider */}
        <div className="w-px h-5 bg-stroke/60 mx-2" />

        {/* 5. "Say hi" button */}
        <button
          onClick={() => onNavigate('contact')}
          className="relative group text-xs sm:text-sm rounded-full px-3 sm:px-4 py-1.5 sm:py-2 overflow-hidden flex items-center gap-1 cursor-pointer"
        >
          {/* Accent gradient border visible on hover */}
          <span className="absolute inset-0 rounded-full bg-transparent group-hover:bg-gradient-to-r group-hover:from-[#89AACC] group-hover:to-[#4E85BF] transition-all duration-300" />
          
          {/* Inner content container */}
          <span className="absolute inset-[1px] bg-surface rounded-full z-0 group-hover:bg-surface/90 transition-all duration-300" />
          
          {/* Label and Arrow */}
          <span className="relative z-10 flex items-center gap-1 text-text-primary font-medium">
            Say hi <span className="inline-block transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
          </span>
        </button>
      </motion.div>
    </nav>
  );
}
