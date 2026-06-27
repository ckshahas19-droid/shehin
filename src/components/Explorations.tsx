import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { explorations } from '../data';
import { ExplorationItem } from '../types';

gsap.registerPlugin(ScrollTrigger);

export default function Explorations() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const col1Ref = useRef<HTMLDivElement | null>(null);
  const col2Ref = useRef<HTMLDivElement | null>(null);
  const [selectedItem, setSelectedItem] = useState<ExplorationItem | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const col1 = col1Ref.current;
    const col2 = col2Ref.current;

    if (!section || !col1 || !col2) return;

    // Standard GSAP Parallax: Column 1 moves upwards relative to scroll, Column 2 moves downwards or stays slow
    const ctx = gsap.context(() => {
      gsap.fromTo(
        col1,
        { y: '5%' },
        {
          y: '-15%',
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        }
      );

      gsap.fromTo(
        col2,
        { y: '-15%' },
        {
          y: '5%',
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        }
      );
    }, section);

    return () => {
      ctx.revert();
    };
  }, []);

  const col1Items = explorations.filter((item) => item.col === 1);
  const col2Items = explorations.filter((item) => item.col === 2);

  return (
    <section
      ref={sectionRef}
      id="explorations"
      className="relative min-h-[220vh] bg-bg w-full overflow-visible select-none py-10"
    >
      {/* Layer 1: Pinned Center Sticky Container (z-10) */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center items-center text-center z-10 pointer-events-none px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="max-w-xl flex flex-col items-center pointer-events-auto bg-bg/40 backdrop-blur-sm p-8 rounded-3xl border border-stroke/20 shadow-2xl"
        >
          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-3">
            <span className="w-8 h-[1px] bg-muted/50" />
            <span className="text-xs text-muted uppercase tracking-[0.3em]">
              Explorations
            </span>
            <span className="w-8 h-[1px] bg-muted/50" />
          </div>

          {/* Heading */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-normal font-sans tracking-tight text-text-primary mb-3">
            Visual <span className="font-display italic font-medium">playground</span>
          </h2>

          {/* Subtext */}
          <p className="text-sm text-muted leading-relaxed mb-6 max-w-sm">
            Self-initiated projects, visual mockups, and typographic compositions where code meets fine art.
          </p>

          {/* Instagram CTA Button */}
          <a
            href="https://www.instagram.com/shehin.njj?igsh=MTYyb2M0OXA2YWVicw=="
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 group text-[11px] text-text-primary uppercase tracking-[0.2em] font-medium border border-stroke rounded-full px-5 py-2.5 bg-surface hover:bg-bg transition-all duration-300 relative overflow-hidden"
          >
            <span className="absolute inset-0 rounded-full bg-transparent group-hover:bg-gradient-to-r group-hover:from-[#89AACC] group-hover:to-[#4E85BF] transition-all duration-300 -z-10" />
            <span className="absolute inset-[1px] bg-surface rounded-full -z-10 group-hover:bg-bg transition-all duration-300" />
            <span>Visit Instagram</span>
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
          </a>
        </motion.div>
      </div>

      {/* Layer 2: Parallax Columns (z-20, absolute overlay/flow) */}
      <div className="absolute inset-x-0 top-12 z-20 pointer-events-none">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 grid grid-cols-2 gap-8 md:gap-32 lg:gap-40 h-full">
          
          {/* Column 1 (Scrolls upward) */}
          <div ref={col1Ref} className="flex flex-col gap-16 md:gap-32 pt-24">
            {col1Items.map((item) => (
              <div key={item.id} className="flex justify-center">
                <div
                  className={`relative group aspect-square w-full max-w-[280px] md:max-w-[320px] rounded-2xl overflow-hidden border border-stroke/70 bg-surface shadow-2xl transition-transform duration-500 cursor-pointer pointer-events-auto ${item.rotation}`}
                  onClick={() => setSelectedItem(item)}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover grayscale brightness-90 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300 pointer-events-none" />
                  
                  {/* Subtle info label on card bottom */}
                  <div className="absolute bottom-4 left-4 right-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    <p className="font-display italic text-base text-text-primary mb-0.5">
                      {item.title}
                    </p>
                    <p className="text-[9px] text-muted tracking-widest uppercase">
                      Expand Lightbox &bull; ↗
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Column 2 (Scrolls lagging/downward) */}
          <div ref={col2Ref} className="flex flex-col gap-16 md:gap-32 pt-12">
            {col2Items.map((item) => (
              <div key={item.id} className="flex justify-center">
                <div
                  className={`relative group aspect-square w-full max-w-[280px] md:max-w-[320px] rounded-2xl overflow-hidden border border-stroke/70 bg-surface shadow-2xl transition-transform duration-500 cursor-pointer pointer-events-auto ${item.rotation}`}
                  onClick={() => setSelectedItem(item)}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover grayscale brightness-90 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300 pointer-events-none" />
                  
                  {/* Subtle info label on card bottom */}
                  <div className="absolute bottom-4 left-4 right-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    <p className="font-display italic text-base text-text-primary mb-0.5">
                      {item.title}
                    </p>
                    <p className="text-[9px] text-muted tracking-widest uppercase">
                      Expand Lightbox &bull; ↗
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* High-Fidelity Lightbox Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[1000] flex items-center justify-center bg-bg/95 backdrop-blur-xl p-4 cursor-zoom-out"
            onClick={() => setSelectedItem(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative max-w-2xl w-full flex flex-col items-center gap-4 cursor-default"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-surface border border-stroke text-muted hover:text-text-primary hover:border-white/30 transition-all flex items-center justify-center font-bold text-sm cursor-pointer z-50 shadow-md shadow-black"
              >
                &times;
              </button>

              {/* Lightbox image with gradient frame */}
              <div className="relative p-[1px] bg-gradient-to-b from-white/10 to-transparent rounded-2xl overflow-hidden shadow-2xl max-h-[70vh] aspect-square w-full">
                <img
                  src={selectedItem.image}
                  alt={selectedItem.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover rounded-2xl"
                />
              </div>

              {/* Lightbox Details */}
              <div className="text-center mt-3 max-w-md px-4">
                <span className="text-[10px] uppercase tracking-widest text-muted block mb-1">
                  Creative Exploration / Design
                </span>
                <h3 className="text-2xl md:text-3xl font-display italic text-text-primary">
                  {selectedItem.title}
                </h3>
                <p className="text-xs text-muted leading-relaxed mt-2">
                  Part of a series studying lighting, shadow-play, and concrete structural rhythms. Crafted to explore organic geometries.
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
