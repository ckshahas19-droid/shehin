import { useEffect, useState } from 'react';
import gsap from 'gsap';
import LoadingScreen from './components/LoadingScreen';
import Navbar from './components/Navbar';
import HlsVideo from './components/HlsVideo';
import SelectedWorks from './components/SelectedWorks';
import Explorations from './components/Explorations';
import Stats from './components/Stats';
import Footer from './components/Footer';

const ROLES = ["Ads Expert", "Digital Marketer", "Content Strategist", "Scholar"];
const VIDEO_SOURCE = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260418_063509_7d167302-4fd4-480b-8260-18ab572333d4.mp4';

export default function App() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [roleIndex, setRoleIndex] = useState<number>(0);
  const [activeSection, setActiveSection] = useState<string>('hero');

  // Cycle through hero roles every 2 seconds after loading is finished
  useEffect(() => {
    if (isLoading) return;
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % ROLES.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [isLoading]);

  // Track active section via IntersectionObserver for Navbar indicator
  useEffect(() => {
    if (isLoading) return;

    const sections = ['hero', 'work', 'explorations', 'contact'];
    const observerOptions = {
      root: null,
      rootMargin: '-35% 0px -40% 0px', // Matches the prominent viewport viewing field
      threshold: 0,
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, [isLoading]);

  // GSAP Entrance animations once loading screen is completed
  useEffect(() => {
    if (isLoading) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // First reveal name
      tl.to('.name-reveal', {
        opacity: 1,
        y: 0,
        duration: 1.2,
        delay: 0.2,
      });

      // Stagger elements with blur
      tl.to('.blur-in', {
        opacity: 1,
        filter: 'blur(0px)',
        y: 0,
        duration: 1.0,
        stagger: 0.15,
      }, '-=0.9'); // overlap
    });

    return () => {
      ctx.revert();
    };
  }, [isLoading]);

  const handleNavigate = (sectionId: string) => {
    const target = document.getElementById(sectionId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveSection(sectionId);
    }
  };

  return (
    <div className="min-h-screen bg-bg text-text-primary selection:bg-accent selection:text-bg font-body antialiased relative">
      {/* 1. Interactive Loading Screen Overlay */}
      {isLoading && (
        <LoadingScreen onComplete={() => setIsLoading(false)} />
      )}

      {/* 2. Floating Pill Navbar */}
      {!isLoading && (
        <Navbar activeSection={activeSection} onNavigate={handleNavigate} />
      )}

      {/* 3. Section 2: Hero Section */}
      <section
        id="hero"
        className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-bg"
      >
        {/* Streaming background video */}
        <HlsVideo src={VIDEO_SOURCE} className="opacity-30" />

        {/* Ambient video-overlay layer */}
        <div className="absolute inset-0 video-overlay z-[2] pointer-events-none" />

        {/* Halftone Overlay layer for extra atmosphere */}
        <div className="absolute inset-0 halftone opacity-30 z-[1] pointer-events-none" />

        {/* Simulated Soft Video Glow behind the text */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[140px] sm:w-[600px] sm:h-[300px] md:w-[800px] md:h-[400px] bg-[#4E85BF] opacity-[0.08] blur-[80px] md:blur-[120px] rounded-full z-[1] pointer-events-none animate-pulse duration-5000" />

        {/* Bottom vertical fade */}
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-bg to-transparent pointer-events-none z-[3]" />

        {/* Hero Central Content */}
        <div className="relative z-10 text-center px-6 max-w-5xl select-none flex flex-col items-center">
          
          {/* Eyebrow */}
          <p className="text-[10px] sm:text-xs text-white/40 uppercase tracking-[0.4em] mb-8 blur-in font-medium">
            Collection &apos;26
          </p>

          {/* Name Reveal with premium theme styling */}
          <h1 className="text-7xl md:text-[110px] lg:text-[140px] font-display italic leading-[0.8] tracking-tight text-white mb-8 name-reveal font-medium">
            Shehin V
          </h1>

          {/* Cycling Role description */}
          <div className="text-base sm:text-lg md:text-xl text-white/90 mb-4 blur-in font-sans font-light">
            A{' '}
            <span
              key={roleIndex}
              className="font-display italic text-xl sm:text-2xl md:text-3xl text-text-primary animate-role-fade-in inline-block px-1 font-medium text-white"
            >
              {ROLES[roleIndex]}
            </span>{' '}
            lives in Kerala.
          </div>

          {/* Core Description */}
          <p className="text-xs sm:text-sm text-white/40 max-w-md mb-12 blur-in leading-relaxed">
            Accelerating Business Growth Through Digital Innovation and Strategic Storytelling.
          </p>

          {/* CTA buttons */}
          <div className="inline-flex flex-wrap gap-4 blur-in justify-center">
            {/* "See Works" button */}
            <button
              onClick={() => handleNavigate('work')}
              className="group relative inline-flex items-center justify-center p-[2.5px] rounded-full overflow-hidden transition-all duration-300 hover:scale-105 active:scale-98 cursor-pointer"
            >
              <span className="absolute inset-0 bg-stroke group-hover:bg-gradient-to-r group-hover:from-[#89AACC] group-hover:to-[#4E85BF] transition-all duration-300 rounded-full animate-gradient-shift bg-size-200" />
              <span className="relative bg-white text-black font-medium text-sm px-8 py-4 rounded-full transition-all duration-300">
                See Works
              </span>
            </button>

            {/* "View Resume" button */}
            <a
              href="https://docs.google.com/document/d/12yC9sRgKbDgDXlsPNWQv7MwWrbkzFxFoA6lv6j-J3Co/edit?tab=t.0"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center justify-center p-[2.5px] rounded-full overflow-hidden transition-all duration-300 hover:scale-105 active:scale-98 cursor-pointer"
            >
              <span className="absolute inset-0 bg-white/10 group-hover:bg-gradient-to-r group-hover:from-[#89AACC] group-hover:to-[#4E85BF] transition-all duration-300 rounded-full animate-gradient-shift bg-size-200" />
              <span className="relative bg-[#0d0d0d]/80 text-white border border-white/10 group-hover:border-transparent font-medium text-sm px-8 py-4 rounded-full backdrop-blur-xs transition-all duration-300">
                Resume <span className="inline-block ml-1 text-xs text-white/60 group-hover:text-white transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
              </span>
            </a>

            {/* "Reach out..." button */}
            <button
              onClick={() => handleNavigate('contact')}
              className="group relative inline-flex items-center justify-center p-[2.5px] rounded-full overflow-hidden transition-all duration-300 hover:scale-105 active:scale-98 cursor-pointer"
            >
              <span className="absolute inset-0 bg-transparent group-hover:bg-gradient-to-r group-hover:from-[#89AACC] group-hover:to-[#4E85BF] transition-all duration-300 rounded-full animate-gradient-shift bg-size-200" />
              <span className="relative bg-black/20 text-white border border-white/10 group-hover:border-transparent font-medium text-sm px-8 py-4 rounded-full backdrop-blur-xs transition-all duration-300">
                Reach out...
              </span>
            </button>
          </div>

        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 pointer-events-none z-10 select-none">
          <span className="text-[10px] text-white/30 uppercase tracking-[0.2em] font-medium font-sans">Scroll</span>
          <div className="w-[1px] h-12 bg-white/10 relative overflow-hidden rounded-full">
            <div className="absolute top-0 left-0 w-full h-1/3 accent-gradient animate-scroll-down rounded-full shadow-[0_0_4px_rgba(137,170,204,0.6)]" />
          </div>
        </div>
      </section>

      {/* 4. Section 3: Selected Works */}
      {!isLoading && (
        <SelectedWorks onContactClick={() => handleNavigate('contact')} />
      )}

      {/* 5. Section 5: Explorations Parallax Gallery */}
      {!isLoading && (
        <Explorations />
      )}

      {/* 7. Section 6: Stats */}
      {!isLoading && (
        <Stats />
      )}

      {/* 8. Section 7: Contact / Footer */}
      {!isLoading && (
        <Footer />
      )}
    </div>
  );
}
