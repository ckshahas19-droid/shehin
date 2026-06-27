import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import HlsVideo from './HlsVideo';

export default function Footer() {
  const marqueeRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const marquee = marqueeRef.current;
    if (!marquee) return;

    const ctx = gsap.context(() => {
      // Animate the marquee inner track continuously
      gsap.to(marquee, {
        xPercent: -50,
        duration: 35,
        ease: 'none',
        repeat: -1,
      });
    }, marquee);

    return () => ctx.revert();
  }, []);

  const socialLinks = [
    { name: 'WhatsApp', url: 'https://wa.me/919895283664' },
    { name: 'LinkedIn', url: 'https://linkedin.com' },
    { name: 'Instagram', url: 'https://www.instagram.com/shehin.njj?igsh=MTYyb2M0OXA2YWVicw==' },
  ];

  const VIDEO_SOURCE = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260418_063509_7d167302-4fd4-480b-8260-18ab572333d4.mp4';

  return (
    <footer id="contact" className="relative bg-bg pt-24 md:pt-36 pb-12 overflow-hidden select-none border-t border-stroke/30">
      
      {/* Background flipped video with 60% overlay */}
      <HlsVideo src={VIDEO_SOURCE} className="opacity-15 mix-blend-screen" flipY={true} />
      <div className="absolute inset-0 bg-black/70 mix-blend-multiply pointer-events-none" />

      <div className="relative z-10 w-full flex flex-col items-center">
        
        {/* GSAP Marquee Track */}
        <div className="w-full overflow-hidden border-y border-stroke/50 bg-surface/30 backdrop-blur-xs py-5 md:py-7 mb-16 md:mb-24">
          <div className="flex whitespace-nowrap">
            <div ref={marqueeRef} className="flex gap-4 pr-4 text-3xl md:text-5xl lg:text-6xl font-display italic font-bold tracking-[0.1em] text-text-primary/15 uppercase">
              {/* Box 1 */}
              <div className="flex shrink-0 items-center gap-4">
                <span>Building the Future &bull; </span>
                <span>Building the Future &bull; </span>
                <span>Building the Future &bull; </span>
                <span>Building the Future &bull; </span>
                <span>Building the Future &bull; </span>
                <span>Building the Future &bull; </span>
                <span>Building the Future &bull; </span>
                <span>Building the Future &bull; </span>
                <span>Building the Future &bull; </span>
                <span>Building the Future &bull; </span>
              </div>
              {/* Box 2 (Required for seamless scrolling) */}
              <div className="flex shrink-0 items-center gap-4">
                <span>Building the Future &bull; </span>
                <span>Building the Future &bull; </span>
                <span>Building the Future &bull; </span>
                <span>Building the Future &bull; </span>
                <span>Building the Future &bull; </span>
                <span>Building the Future &bull; </span>
                <span>Building the Future &bull; </span>
                <span>Building the Future &bull; </span>
                <span>Building the Future &bull; </span>
                <span>Building the Future &bull; </span>
              </div>
            </div>
          </div>
        </div>

        {/* Big Central CTA Section */}
        <div className="flex flex-col items-center text-center px-6 max-w-2xl mb-20 md:mb-28">
          <span className="text-xs text-muted uppercase tracking-[0.3em] mb-4">
            START A CONVERSATION
          </span>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-sans font-light tracking-tight text-text-primary mb-8 leading-tight">
            Let&apos;s grow your brand <span className="font-display italic font-medium">together</span>
          </h2>

          {/* Email button with gradient hover border ring */}
          <a
            href="mailto:shehinv355@gmail.com"
            className="group relative inline-flex items-center justify-center p-[2px] rounded-full overflow-hidden transition-transform duration-300 hover:scale-105 active:scale-98 cursor-pointer mb-8"
          >
            {/* Ambient glowing gradient border */}
            <span className="absolute inset-0 bg-stroke group-hover:bg-gradient-to-r group-hover:from-[#89AACC] group-hover:to-[#4E85BF] transition-all duration-500 animate-gradient-shift bg-size-200" />
            
            {/* Inner fill button */}
            <span className="relative flex items-center gap-3 bg-surface text-text-primary hover:text-white px-8 py-4 rounded-full font-medium text-sm sm:text-base transition-colors duration-300">
              shehinv355@gmail.com
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">&rarr;</span>
            </span>
          </a>

          {/* Phone and Web Details */}
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 text-sm text-muted font-sans tracking-wide">
            <a 
              href="tel:+919895283664" 
              className="hover:text-text-primary transition-colors duration-300 flex items-center gap-2"
            >
              <span className="opacity-60 text-xs uppercase tracking-widest font-mono">Phone:</span>
              <span className="font-medium text-text-primary/95">+91 9895 283 664</span>
            </a>
            <span className="hidden sm:inline text-stroke/60">|</span>
            <a 
              href="https://shehinv.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-text-primary transition-colors duration-300 flex items-center gap-2"
            >
              <span className="opacity-60 text-xs uppercase tracking-widest font-mono">Web:</span>
              <span className="font-medium text-text-primary/95">shehinv.com</span>
            </a>
          </div>
        </div>

        {/* Footer Bar (Socials + Availability + Copyright) */}
        <div className="w-full max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
          <div className="w-full h-px bg-stroke/60 mb-8" />
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-4 text-xs">
            
            {/* Left: Social Links */}
            <div className="flex items-center gap-5 md:gap-6 flex-wrap justify-center">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted hover:text-text-primary transition-colors duration-300 font-medium"
                >
                  {social.name}
                </a>
              ))}
            </div>

            {/* Center: Pulsing Dot & Availability */}
            <div className="flex items-center gap-2.5 bg-surface/60 border border-stroke/70 rounded-full px-4 py-2 shadow-inner">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-muted text-[11px] uppercase tracking-wider font-semibold">
                Available for remote projects
              </span>
            </div>

            {/* Right: Copyright */}
            <div className="text-muted font-mono text-[10px] md:text-[11px]">
              &copy; {new Date().getFullYear()} &bull; SHEHIN V &bull; KERALA, IN
            </div>

          </div>
        </div>

      </div>
    </footer>
  );
}
