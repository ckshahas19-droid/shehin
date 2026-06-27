import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { projects } from '../data';
import { Project } from '../types';

interface SelectedWorksProps {
  onContactClick: () => void;
}

export default function SelectedWorks({ onContactClick }: SelectedWorksProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [redcardView, setRedcardView] = useState<'cover' | 'details'>('cover');

  useEffect(() => {
    if (selectedProject?.id !== 'redcard') {
      setRedcardView('cover');
    }
  }, [selectedProject]);

  return (
    <section id="work" className="bg-bg py-20 md:py-28 select-none border-t border-stroke/30">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 md:mb-16"
        >
          <div className="max-w-xl">
            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-[1px] bg-muted/50" />
              <span className="text-xs text-muted uppercase tracking-[0.3em]">
                Selected Work
              </span>
            </div>
            {/* Heading */}
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-normal font-sans tracking-tight text-text-primary mb-4">
              Featured <span className="font-display italic font-medium">projects</span>
            </h2>
            {/* Subtext */}
            <p className="text-sm md:text-base text-muted leading-relaxed">
              A selection of projects I&apos;ve worked on, from concept to launch. Crafting memorable interactive visual statements across different disciplines.
            </p>
          </div>

          {/* View All Work Button */}
          <button 
            onClick={onContactClick}
            className="hidden md:inline-flex items-center gap-2 group text-xs text-text-primary uppercase tracking-[0.15em] font-medium border border-stroke rounded-full px-6 py-3 bg-surface hover:bg-bg transition-all duration-300 relative overflow-hidden cursor-pointer"
          >
            {/* Hover state gradient ring outline */}
            <span className="absolute inset-0 rounded-full bg-transparent group-hover:bg-gradient-to-r group-hover:from-[#89AACC] group-hover:to-[#4E85BF] transition-all duration-300 -z-10" />
            <span className="absolute inset-[1px] bg-surface rounded-full -z-10 group-hover:bg-bg transition-all duration-300" />
            <span>View All Work</span>
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
          </button>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-6">
          {projects.map((project, idx) => {
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1], delay: idx * 0.1 }}
                onClick={() => setSelectedProject(project)}
                className={`group ${project.colSpan} relative bg-surface border border-stroke/70 rounded-3xl overflow-hidden cursor-pointer shadow-2xl`}
              >
                {/* Outer Aspect Ratio Box */}
                <div className={`${project.aspectRatio} relative overflow-hidden w-full h-full`}>
                  
                  {/* Background Image */}
                  <img
                    src={project.image}
                    alt={project.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />

                  {/* Halftone Overlay */}
                  <div className="absolute inset-0 halftone-overlay opacity-25 mix-blend-multiply pointer-events-none" />

                  {/* Dark Vignette Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent pointer-events-none" />

                  {/* Label on the card (bottom left) always visible */}
                  <div className="absolute bottom-5 left-5 md:bottom-6 md:left-6 z-10 transition-transform duration-500 group-hover:translate-y-[-4px]">
                    <span className="text-[10px] md:text-xs text-muted uppercase tracking-[0.2em] mb-1 block">
                      {project.category}
                    </span>
                    <h3 className="text-lg md:text-xl font-normal font-sans text-text-primary">
                      {project.title}
                    </h3>
                  </div>

                  {/* Premium Hover Lighbox/Overlay */}
                  <div className="absolute inset-0 bg-bg/50 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-500 z-20 flex items-center justify-center">
                    <div className="relative p-[1px] rounded-full overflow-hidden animate-gradient-shift bg-gradient-to-r from-[#89AACC] to-[#4E85BF] shadow-2xl scale-90 group-hover:scale-100 transition-transform duration-500">
                      <div className="bg-white text-black text-xs md:text-sm px-6 py-3 rounded-full font-semibold flex items-center gap-2">
                        <span>Case Study &mdash;</span>
                        <span className="font-display italic text-sm">{project.title}</span>
                      </div>
                    </div>
                  </div>

                </div>
              </motion.div>
            );
          })}
        </div>

        {/* View All button for mobile screens */}
        <div className="mt-8 flex justify-center md:hidden">
          <button 
            onClick={onContactClick}
            className="inline-flex items-center gap-2 text-xs text-text-primary uppercase tracking-[0.15em] font-medium border border-stroke rounded-full px-6 py-3.5 bg-surface hover:bg-bg transition-all duration-300 w-full justify-center"
          >
            <span>View All Work</span>
            <span>&rarr;</span>
          </button>
        </div>

      </div>

      {/* Case Study Lightbox / Presentation Deck Overlay */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[1000] bg-bg/95 backdrop-blur-xl overflow-y-auto px-4 py-8 md:p-12 cursor-default select-text"
            onClick={() => setSelectedProject(null)}
          >
            {/* Modal Inner Container */}
            <motion.div
              initial={{ scale: 0.95, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 30 }}
              transition={{ type: 'spring', damping: 28, stiffness: 180 }}
              className="relative max-w-[1100px] w-full mx-auto bg-surface border border-stroke/70 rounded-3xl overflow-hidden shadow-2xl cursor-default"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Top Custom Bar */}
              <div className="sticky top-0 bg-surface/90 backdrop-blur-md border-b border-stroke/70 px-6 py-4 flex items-center justify-between z-50">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500" />
                  <span className="text-xs text-muted ml-3 font-mono">Case Study // {selectedProject.title}</span>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="w-8 h-8 rounded-full bg-bg border border-stroke text-muted hover:text-white hover:border-white/20 transition-all flex items-center justify-center font-bold text-sm cursor-pointer"
                >
                  &times;
                </button>
              </div>

              {/* Layout Router depending on project.id */}
              {selectedProject.id === 'stoneland' ? (
                /* bespoke high-fidelity UI representation of the Stoneland Social Media Case Study */
                <div className="p-6 md:p-12 text-text-primary bg-[#0a0a0a] halftone">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                    
                    {/* Left Column: Brand Strategy Details */}
                    <div className="lg:col-span-5 flex flex-col justify-start">
                      <span className="text-xs text-muted uppercase tracking-[0.3em] font-medium mb-3">Project</span>
                      <h3 className="text-5xl md:text-6xl font-black tracking-tight mb-2 text-white font-sans">
                        STONELAND.
                      </h3>
                      <p className="text-xs text-accent uppercase tracking-[0.2em] font-semibold mb-8 border-b border-stroke/40 pb-4 accent-gradient-text">
                        Social Media Branding &amp; Content
                      </p>

                      <div className="mb-8">
                        <h4 className="text-xs text-white uppercase tracking-widest font-bold mb-3">About the Project</h4>
                        <p className="text-sm text-white/70 leading-relaxed font-light">
                          Developed the complete social media presence for Stoneland, a clothing store. This included branding, profile setup, content strategy, and reels creation to connect with the target audience and grow brand presence.
                        </p>
                      </div>

                      {/* Key highlights (Branding, Profile, Content) */}
                      <div className="flex flex-col gap-6 mb-8">
                        {/* Highlights 1 */}
                        <div className="flex gap-4 items-start">
                          <div className="w-10 h-10 rounded-full bg-surface/80 border border-stroke flex items-center justify-center shrink-0 text-white font-mono font-bold text-xs shadow-inner">
                            🎯
                          </div>
                          <div>
                            <h5 className="text-sm font-semibold uppercase tracking-wider text-white">Branding</h5>
                            <p className="text-xs text-white/50 leading-relaxed">
                              Created a bold and minimal logo to reflect the brand.
                            </p>
                          </div>
                        </div>

                        {/* Highlights 2 */}
                        <div className="flex gap-4 items-start">
                          <div className="w-10 h-10 rounded-full bg-surface/80 border border-stroke flex items-center justify-center shrink-0 text-white font-mono font-bold text-xs shadow-inner">
                            📱
                          </div>
                          <div>
                            <h5 className="text-sm font-semibold uppercase tracking-wider text-white">Profile Optimization</h5>
                            <p className="text-xs text-white/50 leading-relaxed">
                              Designed a clean and professional Instagram profile for brand impact.
                            </p>
                          </div>
                        </div>

                        {/* Highlights 3 */}
                        <div className="flex gap-4 items-start">
                          <div className="w-10 h-10 rounded-full bg-surface/80 border border-stroke flex items-center justify-center shrink-0 text-white font-mono font-bold text-xs shadow-inner">
                            🎬
                          </div>
                          <div>
                            <h5 className="text-sm font-semibold uppercase tracking-wider text-white">Content Creation</h5>
                            <p className="text-xs text-white/50 leading-relaxed">
                              Created engaging Reels to showcase style and street identity.
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Tools Used Section */}
                      <div className="border-t border-stroke/40 pt-6">
                        <h4 className="text-xs text-white/50 uppercase tracking-widest font-bold mb-4">Tools Used</h4>
                        <div className="flex items-center gap-3">
                          {/* Photoshop */}
                          <div className="flex flex-col items-center">
                            <div className="w-10 h-10 rounded-xl bg-blue-950/80 border border-blue-500/30 flex items-center justify-center font-bold text-blue-400 text-xs shadow-lg select-none">
                              Ps
                            </div>
                            <span className="text-[9px] text-muted mt-1">Photoshop</span>
                          </div>

                          {/* Illustrator */}
                          <div className="flex flex-col items-center">
                            <div className="w-10 h-10 rounded-xl bg-amber-950/80 border border-amber-500/30 flex items-center justify-center font-bold text-amber-400 text-xs shadow-lg select-none">
                              Ai
                            </div>
                            <span className="text-[9px] text-muted mt-1">Illustrator</span>
                          </div>

                          {/* Lightroom */}
                          <div className="flex flex-col items-center">
                            <div className="w-10 h-10 rounded-xl bg-cyan-950/80 border border-cyan-500/30 flex items-center justify-center font-bold text-cyan-400 text-xs shadow-lg select-none">
                              Lr
                            </div>
                            <span className="text-[9px] text-muted mt-1">Lightroom</span>
                          </div>

                          {/* CapCut */}
                          <div className="flex flex-col items-center">
                            <div className="w-10 h-10 rounded-xl bg-[#141414] border border-violet-500/30 flex items-center justify-center font-bold text-violet-400 text-xs shadow-lg select-none overflow-hidden relative">
                              <span className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 to-pink-500/10" />
                              <span className="relative z-10 text-[10px]">CapCut</span>
                            </div>
                            <span className="text-[9px] text-muted mt-1">CapCut</span>
                          </div>
                        </div>
                      </div>

                    </div>

                    {/* Right Column: High Fidelity Mockups Container (iPhone Instagram + Logo Board + Reel player) */}
                    <div className="lg:col-span-7 flex flex-col gap-8">
                      
                      {/* Subgrid: Instagram & Logo branding */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        
                        {/* Mockup A: Instagram Profile */}
                        <div className="bg-[#141414] border border-white/5 rounded-3xl p-4 overflow-hidden relative shadow-2xl flex flex-col">
                          
                          {/* Phone Header */}
                          <div className="flex items-center justify-between text-white/50 text-[10px] pb-3 mb-2 border-b border-white/5">
                            <span className="font-semibold text-white">12:54 📱</span>
                            <span className="text-[8px] bg-white/10 px-1.5 py-0.5 rounded-md">5G</span>
                          </div>

                          {/* IG User Bar */}
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-1">
                              <span className="text-xs font-bold text-white">stoneland._</span>
                              <span className="w-3 h-3 rounded-full bg-blue-500 text-[8px] flex items-center justify-center text-white scale-75">✓</span>
                            </div>
                            <div className="flex items-center gap-2 text-white/80">
                              <span>🔔</span>
                              <span className="font-bold">&bull;&bull;&bull;</span>
                            </div>
                          </div>

                          {/* Profile details */}
                          <div className="flex items-center gap-4 mb-4">
                            {/* Profile Circle with gradient border */}
                            <div className="w-16 h-16 rounded-full p-[2px] bg-gradient-to-r from-yellow-500 via-pink-500 to-purple-500 shrink-0">
                              <div className="w-full h-full bg-black rounded-full flex items-center justify-center border border-black overflow-hidden">
                                <span className="font-sans font-black text-[9px] text-white tracking-widest">STONELAND</span>
                              </div>
                            </div>

                            {/* Stats */}
                            <div className="flex-1 flex justify-around text-center">
                              <div>
                                <span className="block text-sm font-bold text-white">412</span>
                                <span className="text-[9px] text-white/40">posts</span>
                              </div>
                              <div>
                                <span className="block text-sm font-bold text-white">7,584</span>
                                <span className="text-[9px] text-white/40">followers</span>
                              </div>
                              <div>
                                <span className="block text-sm font-bold text-white">5</span>
                                <span className="text-[9px] text-white/40">following</span>
                              </div>
                            </div>
                          </div>

                          {/* Bio */}
                          <div className="text-[11px] text-white/80 mb-4 font-sans">
                            <p className="font-bold text-white">Stone Land</p>
                            <p className="text-white/50">Clothing store</p>
                            <p>Location 📍</p>
                            <p className="text-blue-400 font-medium cursor-pointer flex items-center gap-1 mt-0.5">
                              🔗 maps.app.goo.gl/fdwno6y...
                            </p>
                          </div>

                          {/* Buttons row */}
                          <div className="grid grid-cols-12 gap-1.5 mb-5 text-[11px] font-semibold">
                            <button className="col-span-5 py-1.5 bg-white/10 text-white rounded-lg hover:bg-white/15 transition">
                              Following
                            </button>
                            <button className="col-span-5 py-1.5 bg-white/10 text-white rounded-lg hover:bg-white/15 transition">
                              Message
                            </button>
                            <button className="col-span-2 py-1.5 bg-white/10 text-white rounded-lg hover:bg-white/15 transition flex items-center justify-center">
                              👤
                            </button>
                          </div>

                          {/* Feed Preview (Horizontal or 3 grid squares) */}
                          <span className="text-[10px] text-white/30 uppercase tracking-widest font-bold mb-2 block">
                            Recent Content Feed
                          </span>
                          <div className="grid grid-cols-3 gap-1">
                            {/* Feed 1 */}
                            <div className="aspect-square bg-zinc-800 rounded-md overflow-hidden relative group">
                              <img src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=400&auto=format&fit=crop" className="w-full h-full object-cover" />
                              <div className="absolute inset-0 bg-black/15" />
                            </div>
                            {/* Feed 2 */}
                            <div className="aspect-square bg-zinc-800 rounded-md overflow-hidden relative group">
                              <img src="https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=400&auto=format&fit=crop" className="w-full h-full object-cover" />
                              <div className="absolute inset-0 bg-black/15" />
                            </div>
                            {/* Feed 3 */}
                            <div className="aspect-square bg-zinc-800 rounded-md overflow-hidden relative group">
                              <img src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=400&auto=format&fit=crop" className="w-full h-full object-cover" />
                              <div className="absolute inset-0 bg-black/15" />
                            </div>
                          </div>

                        </div>

                        {/* Mockup B: Branding Cube & Circle logo board */}
                        <div className="bg-[#141414] border border-white/5 rounded-3xl p-6 flex flex-col justify-between items-center relative overflow-hidden group shadow-2xl">
                          <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/5 to-purple-500/5" />
                          <span className="text-[9px] uppercase tracking-[0.2em] text-white/30 font-bold self-start mb-6">
                            Branding System / Logo Design
                          </span>

                          {/* Outer Black Circular Badge */}
                          <div className="relative w-44 h-44 rounded-full bg-black flex flex-col items-center justify-center shadow-2xl border border-white/10 group-hover:scale-105 transition-transform duration-500 ease-out p-6 text-center">
                            {/* Glow accent */}
                            <div className="absolute inset-2 rounded-full bg-[#4E85BF] opacity-[0.05] blur-md" />
                            
                            {/* Abstract Minimal Logo Cube */}
                            <div className="w-12 h-12 border border-white/40 rounded-lg flex items-center justify-center relative mb-2 animate-pulse">
                              <div className="absolute inset-1.5 border border-white/20 rounded" />
                              <div className="w-[1.5px] h-full bg-white/30 absolute left-1/2 -translate-x-1/2" />
                              <div className="h-[1.5px] w-full bg-white/30 absolute top-1/2 -translate-y-1/2" />
                              <span className="text-[8px] font-bold text-white z-10">S</span>
                            </div>

                            {/* Logo typography */}
                            <span className="font-sans font-black tracking-widest text-[13px] text-white leading-none">
                              STONELAND
                            </span>
                            <span className="text-[6px] text-white/40 tracking-widest uppercase mt-1 leading-tight">
                              Clothing Store &amp; Shoe Store
                            </span>
                          </div>

                          <div className="w-full text-center mt-6">
                            <span className="text-[10px] text-white/40 tracking-widest font-mono uppercase block mb-1">
                              Minimal Geometric Seal
                            </span>
                            <span className="text-[9px] text-muted font-light">
                              Constructed on a golden ratio circle grid for ultimate scaling stability.
                            </span>
                          </div>

                        </div>

                      </div>

                      {/* Mockup C: Content Creation Reel Player */}
                      <div className="bg-[#141414] border border-white/5 rounded-3xl p-4 flex flex-col shadow-2xl relative overflow-hidden group">
                        <div className="flex items-center justify-between mb-3 text-xs">
                          <span className="text-[9px] text-white/30 uppercase tracking-[0.25em] font-bold">Content Creation / Reel Asset</span>
                          <span className="text-emerald-400 font-mono text-[9px] uppercase tracking-wider flex items-center gap-1 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Active Reel Asset
                          </span>
                        </div>

                        {/* Player Frame with thumbnail of cargo trucks & street model */}
                        <div className="aspect-[16/9] md:aspect-[21/9] bg-zinc-900 rounded-2xl relative overflow-hidden">
                          <img
                            src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=1000&auto=format&fit=crop"
                            alt="Stoneland reel content"
                            className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 transition-all duration-700 ease-out"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent pointer-events-none" />

                          {/* Top video author overlay */}
                          <div className="absolute top-4 left-4 flex items-center gap-2">
                            <div className="w-7 h-7 rounded-full bg-white/20 border border-white/20 flex items-center justify-center font-bold text-[8px] text-white overflow-hidden">
                              S
                            </div>
                            <div>
                              <p className="text-[11px] font-semibold text-white flex items-center gap-1 leading-none">
                                stoneland._ and manjerikaarofficial <span className="text-[8px] text-blue-400">✓</span>
                              </p>
                              <p className="text-[8px] text-white/60 leading-none">Original Audio</p>
                            </div>
                          </div>

                          {/* Central Pulsing Play Button */}
                          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 group-hover:bg-white/25 border border-white/20 rounded-full flex items-center justify-center backdrop-blur-md transition-all duration-300">
                            <span className="text-white text-xs translate-x-0.5">▶</span>
                          </div>

                          {/* Bottom description info */}
                          <div className="absolute bottom-4 left-4 right-4 text-white">
                            <p className="text-xs font-light line-clamp-1 mb-1 text-white/90">
                              Launching the &apos;26 Summer Street-Wear Collection. High-contrast film aesthetics.
                            </p>
                            <p className="text-[8px] text-[#89AACC] font-mono tracking-wider flex items-center gap-1.5">
                              🎵 stoneland._ &bull; Original Audio (feat. Manjerikaar)
                            </p>
                          </div>
                        </div>

                        <div className="mt-3 flex justify-between items-center text-[10px] text-white/40">
                          <span>Reels Campaign Performance</span>
                          <span className="font-mono text-white/60">42.5K Plays &bull; 4.8K Likes &bull; 98 Comments</span>
                        </div>
                      </div>

                    </div>

                  </div>
                </div>
              ) : selectedProject.id === 'muzzamil' ? (
                /* bespoke representation of the Muzzamil Physiotherapist Case Study */
                <div className="p-6 md:p-12 text-text-primary bg-[#080a10] halftone">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                    
                    {/* Left Column: Brand Strategy Details */}
                    <div className="lg:col-span-5 flex flex-col justify-start">
                      <span className="text-xs text-muted uppercase tracking-[0.3em] font-medium mb-3">Project</span>
                      <h3 className="text-5xl md:text-6xl font-black tracking-tight mb-2 text-white font-sans">
                        MUZZAMIL.
                      </h3>
                      <p className="text-xs text-[#4E85BF] uppercase tracking-[0.2em] font-semibold mb-8 border-b border-stroke/40 pb-4">
                        Web Design &amp; UI/UX Development
                      </p>

                      <div className="mb-8">
                        <h4 className="text-xs text-white uppercase tracking-widest font-bold mb-3">About the Project</h4>
                        <p className="text-sm text-white/70 leading-relaxed font-light">
                          Designed and developed a premium personal portfolio website for Muzzamil, a physiotherapist, realtor, and entrepreneur, to showcase his multi-faceted clinical expertise and professional journey in physical medicine.
                        </p>
                      </div>

                      <div className="flex flex-col gap-6 mb-8">
                        <div className="flex gap-4 items-start">
                          <div className="w-10 h-10 rounded-full bg-surface/80 border border-stroke flex items-center justify-center shrink-0 text-white font-mono font-bold text-xs shadow-inner">
                            💻
                          </div>
                          <div>
                            <h5 className="text-sm font-semibold uppercase tracking-wider text-white">Custom Web Architecture</h5>
                            <p className="text-xs text-white/50 leading-relaxed">
                              Engineered a clean, lightning-fast modern SPA interface optimized for clinical appointments.
                            </p>
                          </div>
                        </div>

                        <div className="flex gap-4 items-start">
                          <div className="w-10 h-10 rounded-full bg-surface/80 border border-stroke flex items-center justify-center shrink-0 text-white font-mono font-bold text-xs shadow-inner">
                            ⚡
                          </div>
                          <div>
                            <h5 className="text-sm font-semibold uppercase tracking-wider text-white">Conversion Funnel</h5>
                            <p className="text-xs text-white/50 leading-relaxed">
                              Implemented an interactive appointment scheduling system with clear call-to-actions.
                            </p>
                          </div>
                        </div>

                        <div className="flex gap-4 items-start">
                          <div className="w-10 h-10 rounded-full bg-surface/80 border border-stroke flex items-center justify-center shrink-0 text-white font-mono font-bold text-xs shadow-inner">
                            🔍
                          </div>
                          <div>
                            <h5 className="text-sm font-semibold uppercase tracking-wider text-white">Local SEO &amp; Copy</h5>
                            <p className="text-xs text-white/50 leading-relaxed">
                              Optimized copy focusing on high-intent localized search terms for pain management and recovery.
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Tools Used Section */}
                      <div className="border-t border-stroke/40 pt-6">
                        <h4 className="text-xs text-white/50 uppercase tracking-widest font-bold mb-4">Tools &amp; Technologies</h4>
                        <div className="flex flex-wrap gap-2">
                          {['WordPress', 'Elementor Pro', 'WooCommerce', 'TailwindCSS', 'JavaScript', 'SEO Suite'].map((tech) => (
                            <span key={tech} className="text-[10px] font-mono bg-white/5 border border-white/10 text-white/70 px-2.5 py-1 rounded-md">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Right Column: High Fidelity Mockup */}
                    <div className="lg:col-span-7 flex flex-col gap-6">
                      <div className="bg-[#12141c] border border-white/5 rounded-3xl p-6 relative overflow-hidden shadow-2xl flex flex-col">
                        <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/5 to-transparent pointer-events-none" />
                        
                        {/* Browser Frame */}
                        <div className="flex items-center gap-1.5 pb-4 mb-4 border-b border-white/5">
                          <span className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                          <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                          <span className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                          <span className="text-[10px] text-white/30 ml-4 font-mono">muzzamil_physio.com/portfolio</span>
                        </div>

                        {/* Laptop Layout Preview */}
                        <div className="bg-black/40 rounded-xl p-6 border border-white/5 flex flex-col gap-6">
                          <div className="flex justify-between items-center">
                            <span className="text-xs font-bold text-white tracking-widest uppercase">MUZZAMIL.</span>
                            <span className="text-[10px] text-[#4E85BF] uppercase tracking-wider font-semibold border border-[#4E85BF]/30 px-3 py-1 rounded-full">Book Appointment</span>
                          </div>

                          <div className="py-8 text-center max-w-md mx-auto">
                            <span className="text-[10px] text-[#89AACC] uppercase tracking-[0.3em] font-bold block mb-2">Physiotherapist</span>
                            <h4 className="text-3xl md:text-4xl font-black text-white tracking-tight leading-tight mb-4">
                              Movement is Medicine. Recovery is Real.
                            </h4>
                            <p className="text-xs text-white/50 leading-relaxed mb-6">
                              Helping you move better, feel stronger, and live pain-free. Book an expert session today.
                            </p>
                            <div className="flex justify-center gap-3">
                              <span className="bg-white text-black text-[11px] font-bold px-4 py-2 rounded-lg">Appointment</span>
                              <span className="border border-white/15 text-white text-[11px] font-medium px-4 py-2 rounded-lg">Know More</span>
                            </div>
                          </div>

                          {/* Stats Grid */}
                          <div className="grid grid-cols-4 gap-2 text-center pt-4 border-t border-white/5">
                            <div>
                              <span className="block text-lg font-black text-[#89AACC]">5+</span>
                              <span className="text-[8px] uppercase tracking-widest text-white/40 block">Years Exp</span>
                            </div>
                            <div>
                              <span className="block text-lg font-black text-[#89AACC]">1000+</span>
                              <span className="text-[8px] uppercase tracking-widest text-white/40 block">Patients</span>
                            </div>
                            <div>
                              <span className="block text-lg font-black text-[#89AACC]">98%</span>
                              <span className="text-[8px] uppercase tracking-widest text-white/40 block">Recovery</span>
                            </div>
                            <div>
                              <span className="block text-lg font-black text-[#89AACC]">3</span>
                              <span className="text-[8px] uppercase tracking-widest text-white/40 block">Expertise</span>
                            </div>
                          </div>
                        </div>

                        <div className="mt-4 flex justify-between items-center text-[10px] text-white/40">
                          <span>User Experience Rating</span>
                          <span>9.8/10 Custom Design Score</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : selectedProject.id === 'dotty-southville' ? (
                /* bespoke representation of the Dotty Southville Social Media Case Study */
                <div className="p-6 md:p-12 text-text-primary bg-[#0c0c0c] halftone">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                    
                    {/* Left Column: Brand Strategy Details */}
                    <div className="lg:col-span-5 flex flex-col justify-start">
                      <span className="text-xs text-muted uppercase tracking-[0.3em] font-medium mb-3">Project</span>
                      <h3 className="text-5xl md:text-6xl font-black tracking-tight mb-2 text-white font-sans">
                        DOTTY SOUTHVILLE
                      </h3>
                      <p className="text-xs text-amber-500 uppercase tracking-[0.2em] font-semibold mb-8 border-b border-stroke/40 pb-4">
                        Social Media &amp; Bio Optimization
                      </p>

                      <div className="mb-8">
                        <h4 className="text-xs text-white uppercase tracking-widest font-bold mb-3">About the Project</h4>
                        <p className="text-sm text-white/70 leading-relaxed font-light">
                          Managed Dotty Southville&apos;s Instagram presence and optimized their bio layout to project immense brand trust, streamline incoming customer service inquiries, and showcase hardware repair expertise.
                        </p>
                      </div>

                      <div className="flex flex-col gap-6 mb-8">
                        <div className="flex gap-4 items-start">
                          <div className="w-10 h-10 rounded-full bg-surface/80 border border-stroke flex items-center justify-center shrink-0 text-white font-mono font-bold text-xs shadow-inner">
                            🛠️
                          </div>
                          <div>
                            <h5 className="text-sm font-semibold uppercase tracking-wider text-white">Social Media Management</h5>
                            <p className="text-xs text-white/50 leading-relaxed">
                              Consistent daily posting, visual storytelling, and customer comment management.
                            </p>
                          </div>
                        </div>

                        <div className="flex gap-4 items-start">
                          <div className="w-10 h-10 rounded-full bg-surface/80 border border-stroke flex items-center justify-center shrink-0 text-white font-mono font-bold text-xs shadow-inner">
                            🎯
                          </div>
                          <div>
                            <h5 className="text-sm font-semibold uppercase tracking-wider text-white">Bio Optimization</h5>
                            <p className="text-xs text-white/50 leading-relaxed">
                              Formatted structured highlights focusing on core offerings: Mobiles, Laptops, and Printers.
                            </p>
                          </div>
                        </div>

                        <div className="flex gap-4 items-start">
                          <div className="w-10 h-10 rounded-full bg-surface/80 border border-stroke flex items-center justify-center shrink-0 text-white font-mono font-bold text-xs shadow-inner">
                            📈
                          </div>
                          <div>
                            <h5 className="text-sm font-semibold uppercase tracking-wider text-white">Local Trust Funnels</h5>
                            <p className="text-xs text-white/50 leading-relaxed">
                              Established direct WhatsApp links and maps routing to increase regional foot traffic.
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Tools Used Section */}
                      <div className="border-t border-stroke/40 pt-6">
                        <h4 className="text-xs text-white/50 uppercase tracking-widest font-bold mb-4">Tools Used</h4>
                        <div className="flex flex-wrap gap-2">
                          {['Meta Business Suite', 'Canva', 'CapCut', 'Instagram Analytics', 'Linktree'].map((tech) => (
                            <span key={tech} className="text-[10px] font-mono bg-white/5 border border-white/10 text-white/70 px-2.5 py-1 rounded-md">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Right Column: High Fidelity Mockup */}
                    <div className="lg:col-span-7 flex flex-col gap-6">
                      <div className="bg-[#141414] border border-white/5 rounded-3xl p-6 relative overflow-hidden shadow-2xl flex flex-col">
                        <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/5 to-transparent pointer-events-none" />
                        
                        {/* Phone Header */}
                        <div className="flex items-center justify-between text-white/50 text-[10px] pb-3 mb-2 border-b border-white/5">
                          <span className="font-semibold text-white">dotty_southville._</span>
                          <span className="text-[8px] bg-white/10 px-1.5 py-0.5 rounded-md">5G</span>
                        </div>

                        {/* Profile stats */}
                        <div className="flex items-center gap-4 my-4">
                          <div className="w-14 h-14 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-[10px] text-amber-400 font-bold tracking-tight">
                            DOTTY
                          </div>
                          <div className="flex-1 flex justify-around text-center">
                            <div>
                              <span className="block text-xs font-bold text-white">24</span>
                              <span className="text-[8px] text-white/40 uppercase">posts</span>
                            </div>
                            <div>
                              <span className="block text-xs font-bold text-white">39</span>
                              <span className="text-[8px] text-white/40 uppercase">followers</span>
                            </div>
                            <div>
                              <span className="block text-xs font-bold text-white">32</span>
                              <span className="text-[8px] text-white/40 uppercase">following</span>
                            </div>
                          </div>
                        </div>

                        {/* Bio formatted */}
                        <div className="text-xs text-white/80 space-y-1 mb-4 font-sans bg-black/40 p-4 rounded-xl border border-white/5">
                          <p className="font-bold text-white">Dotty Southville</p>
                          <p className="text-[10px] text-amber-400 font-medium">Product/Service</p>
                          <p>🛠️ REPAIRING SHOP</p>
                          <p>📱 HANDPHONE / LAPTOP / PRINTER</p>
                          <p>📍 Savanna Lifestyle Retail, Southville City, Selangor</p>
                        </div>

                        {/* Visual Content Sample Grid */}
                        <div className="grid grid-cols-2 gap-2">
                          <div className="aspect-[4/3] bg-zinc-800 rounded-lg overflow-hidden relative border border-white/5">
                            <div className="absolute inset-0 bg-gradient-to-tr from-black to-transparent z-10" />
                            <span className="absolute bottom-2 left-2 text-[8px] font-bold text-white bg-amber-500 px-1.5 py-0.5 rounded">WE ARE SELLING</span>
                            <img src="https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?q=80&w=400&auto=format&fit=crop" className="w-full h-full object-cover brightness-75" />
                          </div>
                          <div className="aspect-[4/3] bg-zinc-800 rounded-lg overflow-hidden relative border border-white/5">
                            <div className="absolute inset-0 bg-gradient-to-tr from-black to-transparent z-10" />
                            <span className="absolute bottom-2 left-2 text-[8px] font-bold text-white bg-[#4E85BF] px-1.5 py-0.5 rounded">EXPERT REPAIRS</span>
                            <img src="https://images.unsplash.com/photo-1581092921461-eab62e97a780?q=80&w=400&auto=format&fit=crop" className="w-full h-full object-cover brightness-75" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : selectedProject.id === 'redcard' ? (
                /* bespoke representation of the Redcard Shopify store Case Study with a cover page toggle */
                redcardView === 'cover' ? (
                  <div className="p-6 md:p-16 text-text-primary bg-[#080606] halftone relative overflow-hidden font-sans min-h-[650px] flex flex-col justify-between">
                    {/* Immersive background stadium image */}
                    <div className="absolute inset-0 z-0 opacity-[0.11] pointer-events-none mix-blend-luminosity">
                      <img 
                        src="https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=1200&auto=format&fit=crop" 
                        alt="Redcard Stadium Background" 
                        className="w-full h-full object-cover scale-105"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#080606] via-transparent to-[#080606]" />
                    </div>

                    {/* Subtle deep red ambient glows */}
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-600/5 rounded-full blur-[140px] pointer-events-none z-0" />
                    <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-red-800/10 rounded-full blur-[140px] pointer-events-none z-0" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-red-900/[0.03] rounded-full blur-[180px] pointer-events-none z-0" />

                    {/* Varsity background watermark */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-[0.02] pointer-events-none select-none overflow-hidden">
                      <span className="text-[18vw] font-black tracking-tighter text-red-600 uppercase font-sans">
                        REDCARD
                      </span>
                    </div>

                    {/* Header info */}
                    <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-white/5 pb-6 mb-8">
                      <div className="flex items-center gap-3">
                        <div className="inline-flex items-center gap-2 px-2.5 py-1 border border-red-600/30 bg-red-600/10 text-red-500 text-[9px] font-bold tracking-[0.2em] uppercase rounded-md">
                          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                          • PORTFOLIO DECK
                        </div>
                        <span className="text-white/30 text-xs font-mono">CASE ID: #002</span>
                      </div>
                      <div className="text-right font-mono text-[10px] text-white/40 tracking-widest uppercase">
                        SHOPIFY PLUS // 2024 RELEASE
                      </div>
                    </div>

                    {/* Main Grid: Content & Ticket stub */}
                    <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center my-auto">
                      {/* Left side: Typography */}
                      <div className="lg:col-span-7 flex flex-col justify-center space-y-6 text-left">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-red-500 text-xs uppercase tracking-[0.25em] font-extrabold">
                            <span>E-COMMERCE REVOLUTION</span>
                            <span className="w-4 h-[1px] bg-red-500/50" />
                          </div>
                          <h3 className="text-6xl md:text-8xl font-black tracking-tight leading-none uppercase text-white font-sans flex flex-col">
                            <span className="text-red-600">RED</span>
                            <span>CARD.</span>
                          </h3>
                        </div>
                        
                        <p className="text-base md:text-lg text-white/90 font-light leading-relaxed max-w-xl">
                          A masterclass in transforming nostalgic football passion into a high-converting digital stadium store. 
                        </p>

                        <p className="text-sm text-white/50 leading-relaxed font-light max-w-lg">
                          Designed, structured, and optimized to capture the vintage jersey drop wave. We fused editorial film overlays, stadium imagery, and bulletproof UX architecture to create a brand that doesn&apos;t just sell products—it delivers legacy.
                        </p>

                        {/* Pill features */}
                        <div className="flex flex-wrap gap-2.5 pt-2">
                          {['Liquid Customization', 'High-Octane CRO', 'Vintage Aesthetic', 'Drops Optimization'].map((pill) => (
                            <span key={pill} className="text-[10px] uppercase tracking-widest font-bold bg-white/5 border border-white/10 hover:border-red-500/20 text-white/70 px-3 py-1.5 rounded-md transition duration-300">
                              {pill}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Right side: High fidelity Ticket stub / VIP Matchday pass mock */}
                      <div className="lg:col-span-5 flex justify-center">
                        <div className="w-full max-w-xs md:max-w-sm bg-[#120a0a] border border-red-500/20 rounded-2xl p-5 relative overflow-hidden shadow-2xl flex flex-col group hover:border-red-500/40 transition duration-500">
                          {/* Half circle cuts at side to look like a ticket */}
                          <div className="absolute top-1/2 -left-3 w-6 h-6 rounded-full bg-[#080606] border-r border-red-500/20 z-20" />
                          <div className="absolute top-1/2 -right-3 w-6 h-6 rounded-full bg-[#080606] border-l border-red-500/20 z-20" />

                          {/* Top Ticket strip */}
                          <div className="flex justify-between items-center pb-4 border-b border-dashed border-red-500/20 mb-4">
                            <div className="flex flex-col">
                              <span className="text-[8px] text-white/40 uppercase tracking-widest leading-none">VIP ADMISSION</span>
                              <span className="text-xs font-black text-white font-mono mt-0.5">MATCHDAY PASS</span>
                            </div>
                            <div className="text-right">
                              <span className="text-[10px] font-bold text-red-500 font-mono tracking-tighter">NO. 80927-RC</span>
                            </div>
                          </div>

                          {/* Ticket Image Body */}
                          <div className="aspect-[1.5] rounded-xl bg-zinc-900 border border-white/5 relative overflow-hidden mb-4">
                            <img 
                              src="https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=400&auto=format&fit=crop" 
                              className="absolute inset-0 w-full h-full object-cover brightness-[0.45] transition-transform duration-700 group-hover:scale-105"
                              referrerPolicy="no-referrer"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent pointer-events-none" />
                            <div className="absolute inset-0 bg-red-600/10 mix-blend-color-dodge pointer-events-none" />

                            {/* Stamp banner */}
                            <div className="absolute top-3 right-3 bg-red-600 text-white text-[8px] font-black px-2 py-0.5 rounded tracking-widest uppercase rotate-3 shadow-md">
                              VERIFIED MATCH
                            </div>

                            {/* Ticket Text */}
                            <div className="absolute bottom-3 left-3 text-left">
                              <span className="text-[7px] text-red-500 font-black tracking-widest uppercase block mb-0.5">THE ARENA</span>
                              <h4 className="text-sm font-black text-white leading-none uppercase tracking-tight">REDCARD SHOPIFY PLATFORM</h4>
                            </div>
                          </div>

                          {/* Ticket Stats */}
                          <div className="grid grid-cols-3 gap-2 text-center text-white/90 border-b border-dashed border-red-500/20 pb-4 mb-4">
                            <div className="bg-white/[0.02] border border-white/5 rounded-lg p-2">
                              <span className="text-[7px] text-white/40 block uppercase tracking-widest">GATE</span>
                              <span className="text-[10px] font-mono font-bold text-white mt-0.5 block">02</span>
                            </div>
                            <div className="bg-white/[0.02] border border-white/5 rounded-lg p-2">
                              <span className="text-[7px] text-white/40 block uppercase tracking-widest">ROW</span>
                              <span className="text-[10px] font-mono font-bold text-white mt-0.5 block">SHPFY</span>
                            </div>
                            <div className="bg-white/[0.02] border border-white/5 rounded-lg p-2">
                              <span className="text-[7px] text-white/40 block uppercase tracking-widest">SEAT</span>
                              <span className="text-[10px] font-mono font-bold text-red-500 mt-0.5 block">VIP</span>
                            </div>
                          </div>

                          {/* Barcode representation */}
                          <div className="flex flex-col items-center justify-center space-y-1">
                            <div className="flex justify-between w-full h-8 opacity-60">
                              {[1, 3, 1, 2, 4, 1, 2, 3, 1, 4, 2, 1, 3, 2, 1, 4, 1, 2, 1, 3].map((width, idx) => (
                                <div key={idx} className="bg-white h-full" style={{ width: `${width}px` }} />
                              ))}
                            </div>
                            <span className="text-[8px] font-mono text-white/30 tracking-[0.2em] uppercase">
                              *SHOPIFY-REDCARD-DROP*
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Footer / CTA section */}
                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 border-t border-white/5 pt-8 mt-12">
                      {/* Stat snapshots */}
                      <div className="flex gap-6 items-center text-left">
                        <div>
                          <span className="text-2xl font-black text-red-500 block leading-none font-sans">+42%</span>
                          <span className="text-[8px] text-white/40 uppercase tracking-widest mt-1 block">Conversions</span>
                        </div>
                        <div className="h-6 w-[1px] bg-white/10" />
                        <div>
                          <span className="text-2xl font-black text-red-500 block leading-none font-sans">2.4x</span>
                          <span className="text-[8px] text-white/40 uppercase tracking-widest mt-1 block">Sales Boost</span>
                        </div>
                      </div>

                      {/* Explore button */}
                      <button
                        onClick={() => setRedcardView('details')}
                        className="group flex items-center gap-3 bg-red-600 hover:bg-red-700 text-white font-extrabold text-xs uppercase tracking-[0.2em] px-8 py-4 rounded-xl transition duration-300 shadow-lg shadow-red-900/30 cursor-pointer"
                      >
                        <span>EXPLORE CASE STUDY</span>
                        <span className="inline-block transition-transform duration-300 group-hover:translate-x-1.5">&rarr;</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="p-6 md:p-12 text-text-primary bg-[#080606] halftone relative overflow-hidden font-sans">
                    {/* Immersive background stadium image */}
                    <div className="absolute inset-0 z-0 opacity-[0.06] pointer-events-none mix-blend-luminosity">
                      <img 
                        src="https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=1200&auto=format&fit=crop" 
                        alt="Redcard Stadium Background" 
                        className="w-full h-full object-cover scale-105"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#080606] via-transparent to-[#080606]" />
                    </div>

                    {/* Subtle deep red ambient glow */}
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-600/5 rounded-full blur-[140px] pointer-events-none z-0" />
                    <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-red-800/5 rounded-full blur-[140px] pointer-events-none z-0" />

                    {/* Header Banner */}
                    <div className="border-b border-white/10 pb-8 mb-10">
                      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                        <div>
                          {/* RED EYEBROW LABEL */}
                          <div className="inline-flex items-center gap-2 px-3 py-1 border border-red-600/30 bg-red-600/10 text-red-500 text-[10px] font-bold tracking-[0.2em] uppercase rounded-md mb-4">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                            • PROJECT
                          </div>
                          <h3 className="text-5xl md:text-8xl font-black tracking-tight mb-3 leading-none flex items-center">
                            <span className="text-red-600">RED</span>
                            <span className="text-white">CARD</span>
                          </h3>
                          <p className="text-xs md:text-sm text-white/90 uppercase tracking-[0.25em] font-extrabold leading-relaxed">
                            SHOPIFY STORE DESIGN &amp; CONTENT STRATEGY
                          </p>
                          <p className="text-sm text-white/70 leading-relaxed font-light mt-4 max-w-3xl">
                            Designed and developed a high-converting Shopify store for Redcard, a retro football jersey brand inspired by legends.
                          </p>
                        </div>

                        {/* Back to cover button */}
                        <button
                          onClick={() => setRedcardView('cover')}
                          className="flex items-center gap-2 px-4 py-2 border border-white/10 hover:border-red-500/30 hover:text-red-500 bg-white/5 rounded-lg text-xs font-bold text-white/80 transition-all cursor-pointer"
                        >
                          <span>&larr;</span>
                          <span>VIEW COVER PAGE</span>
                        </button>
                      </div>
                    </div>

                    {/* TWO COLUMN GRID: WHAT I DID & HIGH FIDELITY LAPTOP/PHONE MOCKUPS */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-12">
                      
                      {/* LEFT COLUMN: WHAT I DID */}
                      <div className="lg:col-span-5 flex flex-col justify-start">
                        <h4 className="text-sm text-white uppercase tracking-[0.2em] font-extrabold mb-6 flex items-center gap-2 border-b border-white/10 pb-3">
                          <span className="w-1.5 h-4 bg-red-600 block rounded-sm" />
                          WHAT I DID
                        </h4>

                        <div className="flex flex-col gap-5">
                          {[
                            {
                              title: 'SHOPIFY DEVELOPMENT',
                              desc: 'Built a responsive, fast and user-friendly Shopify store from scratch with a clean UI/UX to ensure a seamless shopping experience.',
                              icon: (
                                <svg className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                </svg>
                              )
                            },
                            {
                              title: 'UI/UX DESIGN',
                              desc: 'Designed custom sections, product pages, collection layouts and branding elements to reflect the retro vibe.',
                              icon: (
                                <svg className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                </svg>
                              )
                            },
                            {
                              title: 'CONTENT STRATEGY',
                              desc: 'Planned and structured content that speaks to the audience, highlights product value, and builds brand trust.',
                              icon: (
                                <svg className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                              )
                            },
                            {
                              title: 'SOCIAL MEDIA CONTENT',
                              desc: 'Created engaging posts, reels and campaigns to drive traffic and boost brand visibility.',
                              icon: (
                                <svg className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                                </svg>
                              )
                            },
                            {
                              title: 'CONVERSION OPTIMIZATION',
                              desc: 'Focused on CTA placement, trust badges, reviews and offers to maximize conversions and average order value.',
                              icon: (
                                <svg className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                </svg>
                              )
                            }
                          ].map((item, idx) => (
                            <div key={idx} className="flex gap-4 items-start bg-white/[0.01] border border-white/5 hover:border-red-500/20 p-4 rounded-xl transition duration-300">
                              <div className="w-10 h-10 rounded-full bg-red-600/10 flex items-center justify-center shrink-0 border border-red-500/20 shadow-inner">
                                {item.icon}
                              </div>
                              <div>
                                <h5 className="text-xs font-bold text-white tracking-wider uppercase mb-1">{item.title}</h5>
                                <p className="text-[11px] text-white/50 leading-relaxed font-light">{item.desc}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* RIGHT COLUMN: HIGH FIDELITY DEVS MOCKUPS */}
                      <div className="lg:col-span-7 flex flex-col gap-6">
                        
                        {/* Laptop Screen CSS representation */}
                        <div className="relative">
                          <div className="bg-[#141212] border border-zinc-700/60 rounded-t-2xl p-2 md:p-3 shadow-2xl relative overflow-hidden flex flex-col">
                            
                            {/* Inner Screen Content */}
                            <div className="bg-black rounded-lg overflow-hidden border border-white/5 flex flex-col relative aspect-[16/10]">
                              
                              {/* Announcement bar */}
                              <div className="bg-black text-white text-[7px] md:text-[9px] uppercase tracking-widest font-black py-1 text-center border-b border-white/5">
                                USE CODE : SAVE60 | BUY 2 GET FLAT 60 OFF
                              </div>

                              {/* Navigation Bar */}
                              <div className="flex justify-between items-center px-4 py-2 bg-black/60 backdrop-blur-sm border-b border-white/5 z-10">
                                {/* Hamburger Menu icon */}
                                <div className="flex flex-col gap-1 cursor-pointer">
                                  <span className="w-4.5 h-[1.5px] bg-white rounded-full" />
                                  <span className="w-4.5 h-[1.5px] bg-white rounded-full" />
                                  <span className="w-4.5 h-[1.5px] bg-white rounded-full" />
                                </div>
                                
                                {/* Logo */}
                                <span className="text-xs md:text-sm font-black text-white tracking-widest uppercase">
                                  REDCARD.
                                </span>

                                {/* Action icons */}
                                <div className="flex items-center gap-3 text-white/80 text-xs">
                                  <span>🔍</span>
                                  <span>🛒</span>
                                </div>
                              </div>

                              {/* Hero Banner Section */}
                              <div className="relative flex-1 flex flex-col justify-center items-start px-6 md:px-10 overflow-hidden">
                                <img 
                                  src="https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=800&auto=format&fit=crop" 
                                  className="absolute inset-0 w-full h-full object-cover brightness-[0.45]"
                                  referrerPolicy="no-referrer"
                                />
                                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent pointer-events-none" />
                                
                                {/* Models Overlay Graphic */}
                                <div className="absolute right-4 bottom-0 top-6 w-1/2 opacity-80 pointer-events-none hidden md:flex items-end justify-center">
                                  <div className="relative w-full h-full flex items-end justify-end gap-1.5 pb-2">
                                    {/* Left model */}
                                    <div className="w-1/3 h-[90%] bg-zinc-800 rounded-t-lg overflow-hidden border border-white/10 relative">
                                      <img src="https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=300&auto=format&fit=crop" className="w-full h-full object-cover" />
                                    </div>
                                    {/* Center model */}
                                    <div className="w-1/3 h-[100%] bg-zinc-700 rounded-t-lg overflow-hidden border border-red-500/30 relative">
                                      <img src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=300&auto=format&fit=crop" className="w-full h-full object-cover" />
                                    </div>
                                    {/* Right model */}
                                    <div className="w-1/3 h-[85%] bg-zinc-800 rounded-t-lg overflow-hidden border border-white/10 relative">
                                      <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop" className="w-full h-full object-cover" />
                                    </div>
                                  </div>
                                </div>

                                <div className="relative z-10 text-left max-w-[280px] md:max-w-[340px] space-y-1 md:space-y-2">
                                  <h5 className="text-red-600 text-[10px] md:text-xs font-black tracking-widest uppercase">
                                    THAT DROP&apos;S STORY ISN&apos;T OVER YET.
                                  </h5>
                                  <p className="text-white text-[18px] md:text-[24px] font-black tracking-tight leading-none uppercase">
                                    THAT DROP&apos;S STORY ISN&apos;T OVER YET.
                                  </p>
                                  <p className="text-white/60 text-[9px] md:text-[11px] tracking-wide font-light">
                                    Retro is not a trend. It&apos;s a feeling.
                                  </p>
                                  <button className="bg-red-600 hover:bg-red-700 text-white font-extrabold text-[8px] md:text-[10px] uppercase tracking-widest px-4 py-2 rounded transition">
                                    SHOP NOW
                                  </button>
                                </div>
                              </div>

                              {/* Badges bar */}
                              <div className="bg-white/5 border-t border-b border-white/5 py-1.5 px-4 flex justify-around items-center gap-1">
                                {/* Badge 1 */}
                                <div className="flex items-center gap-1 text-[7px] md:text-[9px] text-white/80">
                                  <span className="text-emerald-400">🌿</span>
                                  <div>
                                    <strong className="block text-white">969</strong>
                                    <span className="text-white/40 block font-light text-[6px]">VERIFIED REVIEWS</span>
                                  </div>
                                </div>
                                {/* Badge 2 */}
                                <div className="flex items-center gap-1 text-[7px] md:text-[9px] text-white/80 border-l border-white/10 pl-2">
                                  <span className="text-yellow-400">⭐</span>
                                  <div>
                                    <strong className="block text-white">TOP 1%</strong>
                                    <span className="text-white/40 block font-light text-[6px]">TRENDING STORE</span>
                                  </div>
                                </div>
                                {/* Badge 3 */}
                                <div className="flex items-center gap-1 text-[7px] md:text-[9px] text-white/80 border-l border-white/10 pl-2">
                                  <span className="text-red-400">🏆</span>
                                  <div>
                                    <strong className="block text-white">TOP 5%</strong>
                                    <span className="text-white/40 block font-light text-[6px]">STORE</span>
                                  </div>
                                </div>
                              </div>

                              {/* Best sellers bar */}
                              <div className="bg-black/90 p-2 border-t border-white/5 flex flex-col gap-1 overflow-hidden">
                                <span className="text-[7px] md:text-[9px] text-white/50 tracking-wider font-extrabold uppercase px-1">BEST SELLERS</span>
                                <div className="grid grid-cols-3 gap-1">
                                  <div className="bg-white/5 rounded p-1 flex items-center gap-1 border border-white/5">
                                    <div className="w-5 h-5 rounded bg-zinc-900 overflow-hidden shrink-0">
                                      <img src="https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=100&auto=format&fit=crop" className="w-full h-full object-cover" />
                                    </div>
                                    <div className="overflow-hidden">
                                      <span className="text-[5px] text-white/80 block truncate leading-none">Milan Retro &apos;07</span>
                                      <span className="text-[5px] text-red-400 block font-mono">₹ 439.00</span>
                                    </div>
                                  </div>
                                  <div className="bg-white/5 rounded p-1 flex items-center gap-1 border border-white/5">
                                    <div className="w-5 h-5 rounded bg-zinc-900 overflow-hidden shrink-0">
                                      <img src="https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?q=80&w=100&auto=format&fit=crop" className="w-full h-full object-cover" />
                                    </div>
                                    <div className="overflow-hidden">
                                      <span className="text-[5px] text-white/80 block truncate leading-none">Madrid Special</span>
                                      <span className="text-[5px] text-red-400 block font-mono">₹ 439.00</span>
                                    </div>
                                  </div>
                                  <div className="bg-white/5 rounded p-1 flex items-center gap-1 border border-white/5 text-left">
                                    <div className="w-5 h-5 rounded bg-zinc-900 overflow-hidden shrink-0">
                                      <img src="https://images.unsplash.com/photo-1518002171953-a080ee81be44?q=80&w=100&auto=format&fit=crop" className="w-full h-full object-cover" />
                                    </div>
                                    <div className="overflow-hidden">
                                      <span className="text-[5px] text-white/80 block truncate leading-none">Inter Vintage</span>
                                      <span className="text-[5px] text-red-400 block font-mono">₹ 439.00</span>
                                    </div>
                                  </div>
                                </div>
                              </div>

                            </div>
                          </div>
                          {/* Laptop Bezel Base */}
                          <div className="bg-zinc-800 h-2.5 rounded-b-xl border-t border-zinc-700 relative z-20">
                            <div className="w-12 h-1 bg-zinc-600 rounded-full mx-auto mt-[2px]" />
                          </div>

                          {/* HIGH FIDELITY MOBILE PHONE OVERLAY (At bottom right) */}
                          <div className="absolute right-4 md:right-8 -bottom-6 w-32 md:w-44 bg-[#0a0a0a] border border-zinc-700/60 rounded-[28px] p-1.5 shadow-2xl z-30 flex flex-col overflow-hidden">
                            {/* Inner Screen Mobile */}
                            <div className="bg-black rounded-[22px] overflow-hidden border border-white/5 flex flex-col h-full min-h-[190px] relative">
                              {/* Notch */}
                              <div className="absolute top-1 left-1/2 -translate-x-1/2 w-14 h-2.5 bg-black rounded-full z-20 flex items-center justify-center">
                                <span className="w-1 h-1 rounded-full bg-white/25" />
                              </div>

                              {/* Mobile announcement bar */}
                              <div className="bg-black text-white text-[5px] uppercase tracking-widest font-black py-0.5 text-center pt-2 border-b border-white/5">
                                USE CODE : SAVE60 | FLAT 60 OFF
                              </div>

                              {/* Mobile Nav Bar */}
                              <div className="flex justify-between items-center px-2 py-1 bg-black/60 border-b border-white/5">
                                <span className="text-[6px] text-white font-black">☰</span>
                                <span className="text-[8px] font-black text-white tracking-widest uppercase">RC.</span>
                                <span className="text-[6px] text-white">🛒</span>
                              </div>

                              {/* Mobile Hero */}
                              <div className="relative flex-1 flex flex-col justify-center items-start p-3 overflow-hidden">
                                <img 
                                  src="https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=400&auto=format&fit=crop" 
                                  className="absolute inset-0 w-full h-full object-cover brightness-[0.45]"
                                  referrerPolicy="no-referrer"
                                />
                                <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent pointer-events-none" />
                                <div className="relative z-10 text-left space-y-0.5">
                                  <span className="text-[5px] text-red-500 font-extrabold uppercase tracking-wide block">THAT DROP&apos;S STORY ISN&apos;T OVER YET.</span>
                                  <h5 className="text-[10px] font-black text-white leading-tight uppercase">THAT DROP&apos;S STORY ISN&apos;T OVER YET.</h5>
                                  <button className="bg-red-600 text-white font-extrabold text-[5px] uppercase tracking-wider px-2 py-0.5 rounded">SHOP NOW</button>
                                </div>
                              </div>

                              {/* Mobile Badges Row */}
                              <div className="bg-zinc-950 border-t border-white/5 py-1 px-2 flex justify-around items-center">
                                <div className="flex items-center gap-0.5 text-[5px] text-white/80">
                                  <span>🌿</span>
                                  <span className="text-[4px] text-white/50 uppercase">969 reviews</span>
                                </div>
                                <div className="flex items-center gap-0.5 text-[5px] text-white/80 border-l border-white/10 pl-1">
                                  <span>🏆</span>
                                  <span className="text-[4px] text-white/50 uppercase">Top 1%</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* DARK HORIZONTAL METRICS ROW */}
                        <div className="bg-[#120e0e] border border-white/10 rounded-2xl p-4 mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                          {[
                            { lbl: 'HIGHER CONVERSIONS', icon: '🛒' },
                            { lbl: 'INCREASED SITE ENGAGEMENT', icon: '👁️' },
                            { lbl: 'GROWING CUSTOMER BASE', icon: '👤' },
                            { lbl: 'BOOSTED SALES & REVENUE', icon: '📈' }
                          ].map((metric, idx) => (
                            <div key={idx} className="flex flex-col items-center gap-1.5 justify-center py-2 border-r border-white/5 last:border-0 md:even:border-r">
                              <div className="text-lg">{metric.icon}</div>
                              <span className="text-[8px] md:text-[9px] text-white/80 tracking-widest font-black uppercase leading-tight max-w-[120px]">
                                {metric.lbl}
                              </span>
                            </div>
                          ))}
                        </div>

                      </div>
                    </div>

                    {/* BOTTOM CARDS GRID: 4 columns */}
                    <div className="mb-12">
                      <h4 className="text-sm text-white uppercase tracking-[0.2em] font-extrabold mb-6 flex items-center gap-2 border-b border-white/5 pb-3">
                        <span className="w-1.5 h-4 bg-red-600 block rounded-sm" />
                        CASE STUDY FOCUS MODULES
                      </h4>

                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        {/* CARD 1: STORE DESIGN */}
                        <div className="bg-zinc-950/80 border border-white/10 rounded-2xl overflow-hidden shadow-lg hover:border-red-500/20 transition duration-300 flex flex-col justify-between">
                          <div className="p-3 bg-black/60 border-b border-white/5 text-[9px] text-white/70 font-extrabold uppercase tracking-widest">
                            STORE DESIGN
                          </div>
                          <div className="p-4 flex-1 flex flex-col justify-center">
                            {/* Mini Layout Mockup */}
                            <div className="aspect-[4/3] bg-zinc-900 rounded-lg overflow-hidden border border-white/5 relative flex flex-col justify-end p-2.5">
                              <img src="https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=200&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover brightness-[0.4]" />
                              <div className="relative z-10 text-left space-y-0.5">
                                <span className="text-[5px] text-red-500 font-bold block leading-none">RED DROP SPECIAL</span>
                                <h5 className="text-[8px] text-white font-extrabold leading-tight">THAT DROP&apos;S STORY ISN&apos;T OVER YET.</h5>
                                <div className="w-6 h-1.5 bg-red-600 rounded-[1px]" />
                              </div>
                            </div>
                          </div>
                          <div className="p-4 bg-black/40 border-t border-white/5 text-[11px] text-white/50 leading-relaxed font-light text-left">
                            Clean, minimal and conversion focused design with a strong brand identity.
                          </div>
                        </div>

                        {/* CARD 2: COLLECTIONS */}
                        <div className="bg-zinc-950/80 border border-white/10 rounded-2xl overflow-hidden shadow-lg hover:border-red-500/20 transition duration-300 flex flex-col justify-between">
                          <div className="p-3 bg-black/60 border-b border-white/5 text-[9px] text-white/70 font-extrabold uppercase tracking-widest">
                            COLLECTIONS
                          </div>
                          <div className="p-4 flex-1 flex flex-col justify-center">
                            {/* Collections Grid Visual */}
                            <div className="grid grid-cols-2 gap-1.5">
                              <div className="aspect-[4/3] bg-zinc-900 rounded-md overflow-hidden relative border border-white/5 flex flex-col justify-end p-1.5">
                                <img src="https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=150&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover brightness-50" />
                                <span className="relative text-[6px] text-white font-extrabold tracking-wider leading-none uppercase truncate">Retro Jerseys</span>
                              </div>
                              <div className="aspect-[4/3] bg-zinc-900 rounded-md overflow-hidden relative border border-white/5 flex flex-col justify-end p-1.5">
                                <img src="https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=150&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover brightness-50" />
                                <span className="relative text-[6px] text-white font-extrabold tracking-wider leading-none uppercase truncate">Oversized Tees</span>
                              </div>
                              <div className="aspect-[4/3] bg-zinc-900 rounded-md overflow-hidden relative border border-white/5 flex flex-col justify-end p-1.5">
                                <img src="https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=150&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover brightness-50" />
                                <span className="relative text-[6px] text-white font-extrabold tracking-wider leading-none uppercase truncate">Retro Hoodies</span>
                              </div>
                              <div className="aspect-[4/3] bg-zinc-900 rounded-md overflow-hidden relative border border-white/5 flex flex-col justify-end p-1.5">
                                <img src="https://images.unsplash.com/photo-1534215754734-18e55d13ce35?q=80&w=150&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover brightness-50" />
                                <span className="relative text-[6px] text-white font-extrabold tracking-wider leading-none uppercase truncate">Accessories</span>
                              </div>
                            </div>
                          </div>
                          <div className="p-4 bg-black/40 border-t border-white/5 text-[11px] text-white/50 leading-relaxed font-light text-left">
                            Well-structured collections to improve navigation and product discovery.
                          </div>
                        </div>

                        {/* CARD 3: PRODUCT PAGES */}
                        <div className="bg-zinc-950/80 border border-white/10 rounded-2xl overflow-hidden shadow-lg hover:border-red-500/20 transition duration-300 flex flex-col justify-between">
                          <div className="p-3 bg-black/60 border-b border-white/5 text-[9px] text-white/70 font-extrabold uppercase tracking-widest">
                            PRODUCT PAGES
                          </div>
                          <div className="p-4 flex-1 flex flex-col justify-center">
                            {/* AC Milan detailed product sheet */}
                            <div className="bg-[#121010] rounded-lg p-2.5 border border-white/5 text-left text-[6px] space-y-1">
                              <span className="text-[5px] text-red-500 uppercase tracking-widest font-black leading-none block">AC MILAN 2007 FINAL UCL (EMBROIDERY)</span>
                              <div className="flex gap-2 items-start pt-1">
                                <div className="w-10 h-10 rounded bg-zinc-900 overflow-hidden shrink-0">
                                  <img src="https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=100&auto=format&fit=crop" className="w-full h-full object-cover" />
                                </div>
                                <div className="space-y-0.5 leading-none flex-1">
                                  <span className="text-[6px] text-[#dfa84a] font-bold block">₹ 439.00</span>
                                  <div className="flex gap-0.5 pt-0.5">
                                    {['S', 'M', 'L', 'XL'].map((s) => (
                                      <span key={s} className="w-3.5 h-3 bg-white/5 hover:bg-red-600 hover:text-white rounded flex items-center justify-center font-mono text-[4px] cursor-pointer text-white">{s}</span>
                                    ))}
                                  </div>
                                  <div className="pt-1 space-y-0.5">
                                    <button className="w-full py-0.5 bg-red-600 hover:bg-red-700 text-white font-extrabold text-[4px] rounded uppercase transition">ADD TO CART</button>
                                    <button className="w-full py-0.5 bg-black hover:bg-zinc-900 text-white font-extrabold text-[4px] border border-white/10 rounded uppercase transition">BUY IT NOW</button>
                                  </div>
                                </div>
                              </div>
                              <ul className="text-[4px] text-white/40 space-y-0.5 pt-1 border-t border-white/5">
                                <li>• Premium Embroidery</li>
                                <li>• High Quality Fabric</li>
                                <li>• Oversized Fit</li>
                                <li>• Limited Stock</li>
                              </ul>
                            </div>
                          </div>
                          <div className="p-4 bg-black/40 border-t border-white/5 text-[11px] text-white/50 leading-relaxed font-light text-left">
                            Optimized product pages with clear information and strong CTAs.
                          </div>
                        </div>

                        {/* CARD 4: TRUST & REVIEWS */}
                        <div className="bg-zinc-950/80 border border-white/10 rounded-2xl overflow-hidden shadow-lg hover:border-red-500/20 transition duration-300 flex flex-col justify-between">
                          <div className="p-3 bg-black/60 border-b border-white/5 text-[9px] text-white/70 font-extrabold uppercase tracking-widest">
                            TRUST &amp; REVIEWS
                          </div>
                          <div className="p-4 flex-1 flex flex-col justify-center">
                            {/* Trust Widget representation */}
                            <div className="bg-white/5 rounded-lg p-3 text-center border border-white/5 space-y-2">
                              <div className="space-y-1">
                                <span className="text-[6px] text-white font-extrabold uppercase block">SIGN UP AND SAVE</span>
                                <div className="flex gap-1 justify-center max-w-[140px] mx-auto">
                                  <input type="text" placeholder="Enter your email" className="bg-white/5 text-[5px] px-1.5 py-0.5 rounded border border-white/10 text-white w-2/3" disabled />
                                  <button className="bg-zinc-700 text-[5px] font-extrabold text-white px-1.5 py-0.5 rounded uppercase leading-none">Subscribe</button>
                                </div>
                              </div>
                              <div className="space-y-0.5 pt-1.5 border-t border-white/5">
                                <span className="text-[5px] text-[#dfa84a] block font-mono">⭐⭐⭐⭐⭐ 969 reviews</span>
                                <div className="flex gap-1 justify-around text-[4px] text-white/40 pt-1">
                                  <span className="flex flex-col items-center"><strong>969</strong> Verified</span>
                                  <span className="flex flex-col items-center"><strong>152</strong> Countries</span>
                                  <span className="flex flex-col items-center"><strong>Secured</strong> Checkout</span>
                                </div>
                              </div>
                              <div className="text-[4px] text-emerald-400 font-bold flex items-center justify-center gap-0.5 pt-1 border-t border-white/5">
                                Verified by <span className="text-white font-black">Judge.me</span> reviews
                              </div>
                            </div>
                          </div>
                          <div className="p-4 bg-black/40 border-t border-white/5 text-[11px] text-white/50 leading-relaxed font-light text-left">
                            Integrated reviews, badges and offers to build trust and increase conversions.
                          </div>
                        </div>

                      </div>
                    </div>

                    {/* TIMELINE PROCESS & TOOLS USED */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 border-t border-white/10 pt-10">
                      
                      {/* LEFT SIDE: MY PROCESS TIMELINE */}
                      <div className="lg:col-span-8 flex flex-col">
                        <h4 className="text-xs text-white/45 uppercase tracking-widest font-bold mb-6 flex items-center gap-1.5">
                          <span className="w-1.5 h-3 bg-red-600 block rounded-[1px]" />
                          MY PROCESS
                        </h4>
                        <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-none">
                          {[
                            { title: 'RESEARCH', desc: 'Audience & Competitors', icon: '📅' },
                            { title: 'PLANNING', desc: 'Structure & Content Strategy', icon: '📝' },
                            { title: 'DESIGN', desc: 'UI/UX & Branding', icon: '🎨' },
                            { title: 'DEVELOPMENT', desc: 'Shopify Store Development', icon: '💻' },
                            { title: 'LAUNCH', desc: 'Testing & Optimization', icon: '🚀' }
                          ].map((proc, i) => (
                            <div key={i} className="flex items-center gap-2 shrink-0">
                              <div className="bg-[#121010] border border-white/5 rounded-xl p-3 text-left w-36 relative">
                                <span className="text-[14px] block mb-1.5">{proc.icon}</span>
                                <span className="block text-[9px] font-black tracking-widest text-red-500 uppercase leading-none mb-1">{proc.title}</span>
                                <span className="block text-[8px] text-white/40 leading-tight font-light">{proc.desc}</span>
                              </div>
                              {i < 4 && (
                                <span className="text-zinc-600 text-xs font-mono shrink-0 px-1">&rarr;</span>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* RIGHT SIDE: TOOLS USED */}
                      <div className="lg:col-span-4 flex flex-col">
                        <h4 className="text-xs text-white/45 uppercase tracking-widest font-bold mb-6 flex items-center gap-1.5">
                          <span className="w-1.5 h-3 bg-red-600 block rounded-[1px]" />
                          TOOLS USED
                        </h4>
                        
                        <div className="grid grid-cols-4 gap-3">
                          {/* SHOPIFY */}
                          <div className="bg-[#141212] border border-white/5 hover:border-emerald-500/20 p-3 rounded-2xl flex flex-col items-center justify-center text-center transition group">
                            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-1 border border-emerald-500/20 shadow-md">
                              <svg className="w-5 h-5 text-emerald-400 group-hover:scale-110 transition duration-300" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M19 6.5h-3v-1A2.5 2.5 0 0013.5 3h-3A2.5 2.5 0 008 5.5v1H5c-1.1 0-2 .9-2 2l1.5 11.5c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2L21 8.5c0-1.1-.9-2-2-2zM9.5 5.5c0-.82.68-1.5 1.5-1.5h3c.82 0 1.5.68 1.5 1.5v1h-6v-1zM12 18c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z" />
                              </svg>
                            </div>
                            <span className="text-[8px] font-bold text-white tracking-widest uppercase">SHOPIFY</span>
                          </div>

                          {/* FIGMA */}
                          <div className="bg-[#141212] border border-white/5 hover:border-[#F24E1E]/20 p-3 rounded-2xl flex flex-col items-center justify-center text-center transition group">
                            <div className="w-9 h-9 rounded-xl bg-[#F24E1E]/10 flex items-center justify-center mb-1 border border-[#F24E1E]/20 shadow-md">
                              <svg className="w-5 h-5 group-hover:scale-110 transition duration-300" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2C9.24 2 7 4.24 7 7c0 1.74.89 3.28 2.24 4.18C7.89 12.08 7 13.62 7 15.36 7 18.12 9.24 20.36 12 20.36c2.76 0 5-2.24 5-5 0-1.74-.89-3.28-2.24-4.18C16.11 10.28 17 8.74 17 7c0-2.76-2.24-5-5-5zm-3 5c0-1.66 1.34-3 3-3s3 1.34 3 3-1.34 3-3 3-3-1.34-3-3z" />
                              </svg>
                            </div>
                            <span className="text-[8px] font-bold text-white tracking-widest uppercase">FIGMA</span>
                          </div>

                          {/* PHOTOSHOP */}
                          <div className="bg-[#141212] border border-white/5 hover:border-blue-500/20 p-3 rounded-2xl flex flex-col items-center justify-center text-center transition group">
                            <div className="w-9 h-9 rounded-xl bg-blue-500/10 flex items-center justify-center mb-1 border border-blue-500/20 shadow-md">
                              <span className="text-blue-400 font-extrabold font-mono text-sm tracking-tighter group-hover:scale-110 transition duration-300">Ps</span>
                            </div>
                            <span className="text-[8px] font-bold text-white tracking-widest uppercase">PHOTOSHOP</span>
                          </div>

                          {/* CANVA */}
                          <div className="bg-[#141212] border border-white/5 hover:border-teal-500/20 p-3 rounded-2xl flex flex-col items-center justify-center text-center transition group">
                            <div className="w-9 h-9 rounded-xl bg-teal-500/10 flex items-center justify-center mb-1 border border-teal-500/20 shadow-md">
                              <span className="text-teal-400 font-black text-xs group-hover:scale-110 transition duration-300">Canva</span>
                            </div>
                            <span className="text-[8px] font-bold text-white tracking-widest uppercase">CANVA</span>
                          </div>
                        </div>

                      </div>
                    </div>

                    {/* BOTTOM FOOTNOTE STATEMENT */}
                    <div className="mt-10 border-t border-white/5 pt-6 text-center">
                      <div className="bg-[#120e0e] border border-red-500/10 rounded-2xl p-5 relative max-w-4xl mx-auto flex items-center justify-center">
                        <div className="text-3xl text-red-600 font-black absolute top-1.5 left-4 leading-none opacity-35 select-none">
                          “
                        </div>
                        <p className="text-xs md:text-sm text-white/80 italic leading-relaxed pl-6 relative z-10 font-light">
                          This project helped Redcard build a strong online presence, connect with football lovers, and turn passion into performance.
                        </p>
                      </div>
                    </div>

                  </div>
                )
              ) : selectedProject.id === 'rajadhani' ? (
                /* bespoke representation of the Rajadhani Furniture Case Study */
                <div className="p-6 md:p-12 text-text-primary bg-[#0c0a09] halftone relative overflow-hidden font-sans">
                  {/* Subtle warm ambient lighting */}
                  <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-600/5 rounded-full blur-[120px] pointer-events-none" />
                  <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[120px] pointer-events-none" />

                  {/* Header Banner */}
                  <div className="border-b border-white/10 pb-8 mb-10">
                    <div className="flex flex-col gap-6">
                      <div>
                        {/* RED EYEBROW LABEL */}
                        <div className="inline-flex items-center gap-2 px-3 py-1 border border-red-600/30 bg-red-600/10 text-red-500 text-[10px] font-bold tracking-[0.2em] uppercase rounded-md mb-4">
                          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                          Social Media Management
                        </div>
                        <h3 className="text-4xl md:text-7xl font-black tracking-tight mb-3 leading-none flex flex-wrap items-center gap-x-4">
                          <span className="text-red-600">RAJADHANI</span>
                          <span className="text-white">FURNITURE</span>
                        </h3>
                        <p className="text-xs md:text-sm text-[#dfa84a] uppercase tracking-[0.25em] font-semibold leading-relaxed">
                          Content Strategy That Built Brand Trust and Local Reach
                        </p>
                      </div>

                      {/* THE GOAL Section */}
                      <div className="max-w-3xl bg-white/[0.02] border border-white/5 rounded-2xl p-6 mt-2">
                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0 text-amber-500">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                              <circle cx="12" cy="12" r="10" />
                              <circle cx="12" cy="12" r="6" />
                              <circle cx="12" cy="12" r="2" />
                            </svg>
                          </div>
                          <div>
                            <h4 className="text-xs text-white uppercase tracking-widest font-bold mb-1.5">THE GOAL</h4>
                            <p className="text-sm text-white/70 leading-relaxed font-light">
                              To build a strong local brand presence, increase in-store visits and inquiries, and position <strong className="text-white font-medium">Rajadhani Furniture</strong> as the go-to destination for quality furniture in Manjeri.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 3 HIGH FIDELITY MOBILE SCREENS */}
                  <div className="mb-12">
                    <div className="flex items-center justify-between mb-6">
                      <span className="text-xs text-[#dfa84a] uppercase tracking-[0.2em] font-semibold">Live Social Architecture</span>
                      <span className="text-[10px] text-white/40 font-mono">Instagram Active Campaign Feed</span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {/* PHONE 1: Profile View */}
                      <div className="bg-[#12100e] border border-white/10 rounded-[38px] p-3.5 relative shadow-2xl flex flex-col group overflow-hidden">
                        {/* Notch */}
                        <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-28 h-4 bg-black rounded-full z-20 flex items-center justify-between px-4">
                          <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
                          <div className="w-10 h-1 bg-white/10 rounded-full" />
                        </div>
                        
                        {/* Inner screen border */}
                        <div className="bg-black rounded-[28px] p-4 pt-6 border border-white/5 flex flex-col h-full min-h-[460px]">
                          {/* Top Status Info */}
                          <div className="flex justify-between items-center text-[10px] text-white/60 mb-3 font-mono">
                            <span>12:23</span>
                            <div className="flex items-center gap-1">
                              <span>📶</span>
                              <span>🔋</span>
                            </div>
                          </div>

                          {/* IG Header */}
                          <div className="flex items-center justify-between mb-4 pb-2 border-b border-white/5">
                            <span className="text-white font-bold text-xs flex items-center gap-1">
                              ← rajadhani_furniture
                            </span>
                            <div className="flex gap-3 text-white/80">
                              <span>🔍</span>
                              <span>⋮</span>
                            </div>
                          </div>

                          {/* Profile Details Grid */}
                          <div className="flex items-center gap-3 mb-4">
                            {/* Profile Pic circular with Red Malayalam Text */}
                            <div className="w-12 h-12 rounded-full ring-2 ring-red-600 p-0.5 bg-black flex items-center justify-center shrink-0">
                              <div className="w-full h-full rounded-full bg-[#1c0808] flex items-center justify-center text-[8px] font-black text-red-500 leading-tight text-center">
                                രാജധാനി
                              </div>
                            </div>
                            {/* Stats */}
                            <div className="flex-1 flex justify-between text-center">
                              <div>
                                <span className="block text-xs font-bold text-white">357</span>
                                <span className="text-[8px] text-white/40 uppercase">posts</span>
                              </div>
                              <div>
                                <span className="block text-xs font-bold text-white">1,204</span>
                                <span className="text-[8px] text-white/40 uppercase">followers</span>
                              </div>
                              <div>
                                <span className="block text-xs font-bold text-white">189</span>
                                <span className="text-[8px] text-white/40 uppercase">following</span>
                              </div>
                            </div>
                          </div>

                          {/* Bio */}
                          <div className="text-[10px] text-white/80 space-y-0.5 mb-4 font-sans leading-tight">
                            <p className="font-bold text-white">Rajadhani Furniture</p>
                            <p className="text-white/40 text-[9px] mb-1">Furniture</p>
                            <p>👊 Upgrade your interiors with our extensive home and office furniture, available at the finest prices around.</p>
                            <p className="text-amber-500">📍 Manjeri</p>
                            <p className="text-white/70">📞 +91 9778013285</p>
                            <p className="text-blue-400 font-medium cursor-pointer">🔗 g.co/kgs/ABJ6MUV</p>
                          </div>

                          {/* Buttons row */}
                          <div className="grid grid-cols-12 gap-1 mb-4 text-[9px] font-bold">
                            <button className="col-span-5 py-1 bg-white/10 hover:bg-white/15 text-white rounded-md transition">
                              Following ▾
                            </button>
                            <button className="col-span-5 py-1 bg-white/10 hover:bg-white/15 text-white rounded-md transition">
                              Message
                            </button>
                            <button className="col-span-2 py-1 bg-white/10 hover:bg-white/15 text-white rounded-md transition flex items-center justify-center">
                              👤﹢
                            </button>
                          </div>

                          {/* Highlights Row */}
                          <div className="flex gap-2.5 overflow-x-auto pb-3 mb-4 scrollbar-none">
                            {[
                              { label: 'furniture', icon: '🛋️' },
                              { label: 'Sofa fest', icon: '🎟️' },
                              { label: 'Rajadhani', icon: '🏰' },
                              { label: 'offers', icon: '🏷️' }
                            ].map((hl) => (
                              <div key={hl.label} className="flex flex-col items-center gap-1 shrink-0">
                                <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-xs">
                                  {hl.icon}
                                </div>
                                <span className="text-[8px] text-white/60 tracking-tight">{hl.label}</span>
                              </div>
                            ))}
                          </div>

                          {/* Feed Grid Preview */}
                          <div className="grid grid-cols-3 gap-1 pt-2 border-t border-white/5">
                            <div className="aspect-square bg-zinc-900 rounded overflow-hidden">
                              <img src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=300&auto=format&fit=crop" className="w-full h-full object-cover" />
                            </div>
                            <div className="aspect-square bg-zinc-900 rounded overflow-hidden">
                              <img src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=300&auto=format&fit=crop" className="w-full h-full object-cover" />
                            </div>
                            <div className="aspect-square bg-zinc-900 rounded overflow-hidden">
                              <img src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=300&auto=format&fit=crop" className="w-full h-full object-cover" />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* PHONE 2: Reel Video View (Always Kings) */}
                      <div className="bg-[#12100e] border border-white/10 rounded-[38px] p-3.5 relative shadow-2xl flex flex-col group overflow-hidden">
                        {/* Notch */}
                        <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-28 h-4 bg-black rounded-full z-20 flex items-center justify-between px-4">
                          <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
                          <div className="w-10 h-1 bg-white/10 rounded-full" />
                        </div>
                        
                        {/* Inner screen border */}
                        <div className="bg-black rounded-[28px] p-0.5 border border-white/5 flex flex-col h-full min-h-[460px] overflow-hidden relative">
                          {/* Background Yellow Billboard Video Mockup */}
                          <div className="absolute inset-0 bg-[#ffd43f]/10 flex flex-col justify-between p-4 pt-8">
                            
                            {/* Header Status Bar overlay */}
                            <div className="flex justify-between items-center text-[10px] text-white/80 font-mono z-10">
                              <span className="flex items-center gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                                rajadhani_furniture
                              </span>
                              <span>12:23</span>
                            </div>

                            {/* Billboard Visual Frame */}
                            <div className="my-auto bg-[#ffd43f] rounded-xl p-4 border border-black/20 text-center shadow-lg relative overflow-hidden flex flex-col items-center justify-center aspect-[4/5]">
                              {/* Grid Background */}
                              <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px]" />
                              
                              <span className="text-[10px] tracking-widest text-[#d61e24] font-black uppercase mb-1">രാജധാനി</span>
                              <h5 className="text-xl md:text-2xl font-black text-[#d61e24] tracking-tight leading-tight mb-2">
                                എന്നും രാജാക്കന്മാർ
                              </h5>
                              <p className="text-[8px] text-black/60 font-medium max-w-[140px] uppercase tracking-wide">
                                Premium Wood Furniture Collection
                              </p>
                              
                              <div className="mt-4 w-12 h-[1px] bg-red-600/30" />
                              <span className="text-[9px] text-[#d61e24] font-bold mt-2">MANJERI</span>
                            </div>

                            {/* Audio / Engagement overlays on screen bottom */}
                            <div className="z-10 bg-black/40 backdrop-blur-sm p-3 rounded-xl border border-white/10 text-left">
                              <p className="text-[9px] text-white/50 leading-none mb-1">Liked by _rinshad_ali_ and others</p>
                              <p className="text-[10px] font-bold text-white mb-1">
                                rajadhani_furniture <span className="font-light text-white/80">എന്നും രാജാക്കന്മാർ! 👑 Visit our showroom in Manjeri!</span>
                              </p>
                              <span className="text-[8px] text-amber-500 flex items-center gap-1 font-mono">
                                🎵 Original Audio • Rajadhani Special
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* PHONE 3: Reel Video View (Quality furniture) */}
                      <div className="bg-[#12100e] border border-white/10 rounded-[38px] p-3.5 relative shadow-2xl flex flex-col group overflow-hidden">
                        {/* Notch */}
                        <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-28 h-4 bg-black rounded-full z-20 flex items-center justify-between px-4">
                          <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
                          <div className="w-10 h-1 bg-white/10 rounded-full" />
                        </div>
                        
                        {/* Inner screen border */}
                        <div className="bg-black rounded-[28px] p-0.5 border border-white/5 flex flex-col h-full min-h-[460px] overflow-hidden relative">
                          {/* Background Yellow Billboard Video Mockup */}
                          <div className="absolute inset-0 bg-[#ffd43f]/10 flex flex-col justify-between p-4 pt-8">
                            
                            {/* Header Status Bar overlay */}
                            <div className="flex justify-between items-center text-[10px] text-white/80 font-mono z-10">
                              <span className="flex items-center gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                                rajadhani_furniture
                              </span>
                              <span>12:23</span>
                            </div>

                            {/* Billboard Visual Frame */}
                            <div className="my-auto bg-[#e52521] rounded-xl p-4 border border-black/20 text-center shadow-lg relative overflow-hidden flex flex-col items-center justify-center aspect-[4/5]">
                              {/* Grid Background */}
                              <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px]" />
                              
                              <h5 className="text-xl md:text-2xl font-black text-white tracking-tight leading-tight mb-2">
                                രാജധാനി
                              </h5>
                              <p className="text-[10px] text-yellow-300 font-bold max-w-[140px] uppercase tracking-widest leading-none mb-2">
                                ഫർണിച്ചർ
                              </p>
                              <span className="text-[8px] text-white/70 font-mono uppercase tracking-widest">
                                Quality Furniture, Better Living
                              </span>
                            </div>

                            {/* Audio / Engagement overlays on screen bottom */}
                            <div className="z-10 bg-black/40 backdrop-blur-sm p-3 rounded-xl border border-white/10 text-left">
                              <p className="text-[9px] text-white/50 leading-none mb-1">Liked by nishad_pk and others</p>
                              <p className="text-[10px] font-bold text-white mb-1">
                                rajadhani_furniture <span className="font-light text-white/80">Quality furniture, better living. Modern custom woodwork directly from our factory!</span>
                              </p>
                              <span className="text-[8px] text-amber-500 flex items-center gap-1 font-mono">
                                🎵 Original Audio • Rajadhani Factory
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* TWO COLUMN GRID: WHAT I DID & KEY RESULTS */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
                    {/* LEFT COLUMN: WHAT I DID */}
                    <div className="lg:col-span-6 flex flex-col justify-start">
                      <h4 className="text-lg text-white uppercase tracking-[0.25em] font-extrabold mb-6 flex items-center gap-2 border-b border-white/10 pb-3">
                        <span className="w-1.5 h-5 bg-amber-500 block rounded-sm" />
                        WHAT I DID
                      </h4>

                      <div className="flex flex-col gap-6">
                        {[
                          {
                            title: 'Content Strategy & Planning',
                            desc: 'Planned a content calendar around offers, festivals, new arrivals, and lifestyle inspirations.',
                            icon: (
                              <svg className="w-5 h-5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                            )
                          },
                          {
                            title: 'Engaging Visual Content',
                            desc: 'Created eye-catching posts, reels, and stories to highlight products and showroom.',
                            icon: (
                              <svg className="w-5 h-5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                <circle cx="12" cy="13" r="4" />
                              </svg>
                            )
                          },
                          {
                            title: 'Community Engagement',
                            desc: 'Replied to DMs & comments, ran polls, Q&As, and story interactions.',
                            icon: (
                              <svg className="w-5 h-5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                              </svg>
                            )
                          },
                          {
                            title: 'Local Reach & Promotions',
                            desc: 'Focused on location-based targeting, offers, and collaborations to drive local traffic.',
                            icon: (
                              <svg className="w-5 h-5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                              </svg>
                            )
                          },
                          {
                            title: 'Performance Tracking',
                            desc: 'Monitored insights, optimized content, and improved results continuously.',
                            icon: (
                              <svg className="w-5 h-5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                              </svg>
                            )
                          }
                        ].map((item, idx) => (
                          <div key={idx} className="flex gap-4 items-start bg-white/[0.01] border border-white/5 hover:border-amber-500/20 p-4 rounded-xl transition duration-300">
                            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0 border border-white/10 shadow-inner">
                              {item.icon}
                            </div>
                            <div>
                              <h5 className="text-sm font-bold text-white tracking-wide uppercase mb-1">{item.title}</h5>
                              <p className="text-xs text-white/60 leading-relaxed font-light">{item.desc}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* RIGHT COLUMN: KEY RESULTS */}
                    <div className="lg:col-span-6 flex flex-col justify-start">
                      <h4 className="text-lg text-white uppercase tracking-[0.25em] font-extrabold mb-6 flex items-center gap-2 border-b border-white/10 pb-3">
                        <span className="w-1.5 h-5 bg-red-600 block rounded-sm" />
                        KEY RESULTS
                      </h4>

                      {/* Results Grid */}
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        {[
                          {
                            val: '+250%',
                            lbl: 'Increase in Profile Visits',
                            color: 'text-amber-500',
                            icon: (
                              <svg className="w-5 h-5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                              </svg>
                            )
                          },
                          {
                            val: '+180%',
                            lbl: 'Increase in Engagement',
                            color: 'text-amber-500',
                            icon: (
                              <svg className="w-5 h-5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                              </svg>
                            )
                          },
                          {
                            val: '+300%',
                            lbl: 'Increase in Inquiries',
                            color: 'text-amber-500',
                            icon: (
                              <svg className="w-5 h-5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                              </svg>
                            )
                          },
                          {
                            val: 'Higher',
                            lbl: 'In-Store Footfall',
                            color: 'text-red-500',
                            icon: (
                              <svg className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <circle cx="12" cy="11" r="3" />
                              </svg>
                            )
                          }
                        ].map((stat, idx) => (
                          <div key={idx} className="bg-white/[0.02] border border-white/5 p-5 rounded-2xl relative overflow-hidden group hover:border-amber-500/20 transition duration-300">
                            <div className="flex justify-between items-start mb-3">
                              <span className={`text-2xl md:text-3xl font-black ${stat.color} tracking-tight`}>
                                {stat.val}
                              </span>
                              <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center shrink-0 border border-white/5">
                                {stat.icon}
                              </div>
                            </div>
                            <span className="text-[10px] md:text-xs text-white/50 uppercase tracking-widest font-bold block leading-relaxed">
                              {stat.lbl}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Quote Box */}
                      <div className="bg-[#120e0a] border border-amber-500/10 rounded-2xl p-6 relative">
                        {/* Red Quotes Icon */}
                        <div className="text-4xl text-red-600 font-black absolute top-3 left-4 leading-none opacity-40 select-none">
                          “
                        </div>
                        <p className="text-xs md:text-sm text-white/80 italic leading-relaxed pl-6 relative z-10 font-light">
                          Consistent content, local focus, and customer engagement helped Rajadhani Furniture become a trusted name in Manjeri.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* CONTENT MIX SECTION */}
                  <div className="mb-12 bg-white/[0.01] border border-white/5 p-6 rounded-3xl">
                    <h4 className="text-sm text-white uppercase tracking-[0.2em] font-extrabold mb-6 flex items-center gap-2 border-b border-white/5 pb-3">
                      <span className="w-1.5 h-4 bg-amber-500 block rounded-sm" />
                      CONTENT MIX DISTRIBUTION
                    </h4>

                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
                      {[
                        { title: 'Product Highlights', pct: '40%', desc: 'Sofa, Dining sets & Beds', icon: '🛋️', color: 'bg-red-600' },
                        { title: 'Offers & Promos', pct: '20%', desc: 'Festival sales & discounts', icon: '🏷️', color: 'bg-amber-500' },
                        { title: 'Lifestyle & Inspiration', pct: '20%', desc: 'Room setups & style guides', icon: '🏠', color: 'bg-amber-500' },
                        { title: 'Reels & Videos', pct: '10%', desc: 'Factory tours & raw shots', icon: '🎬', color: 'bg-zinc-600' },
                        { title: 'Engagement Content', pct: '10%', desc: 'Comments, polls & replies', icon: '🤝', color: 'bg-zinc-600' }
                      ].map((mix, idx) => (
                        <div key={idx} className="bg-black/30 border border-white/5 p-4 rounded-xl text-center flex flex-col justify-between">
                          <div className="text-2xl mb-1.5">{mix.icon}</div>
                          <div>
                            <span className="block text-xl font-black text-white tracking-tight mb-1">{mix.pct}</span>
                            <span className="block text-[9px] uppercase tracking-wider text-white/60 font-bold mb-1 leading-tight">{mix.title}</span>
                            <p className="text-[8px] text-white/40 leading-normal font-light">{mix.desc}</p>
                          </div>
                          {/* Colored bar preview */}
                          <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden mt-3">
                            <div className={`${mix.color} h-full`} style={{ width: mix.pct }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CONTENT SAMPLES GRAPHICS */}
                  <div className="mb-12">
                    <h4 className="text-sm text-white uppercase tracking-[0.2em] font-extrabold mb-6 flex items-center gap-2 border-b border-white/5 pb-3">
                      <span className="w-1.5 h-4 bg-amber-500 block rounded-sm" />
                      CAMPAIGN CONTENT SAMPLES
                    </h4>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {/* CARD 1: Sofa Fest */}
                      <div className="bg-zinc-950 border border-white/10 rounded-2xl overflow-hidden relative shadow-lg group">
                        <div className="aspect-[3/4] relative overflow-hidden">
                          <img src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=400&auto=format&fit=crop" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                          <div className="absolute inset-0 p-4 flex flex-col justify-between">
                            <div className="bg-black/60 backdrop-blur-md border border-white/15 rounded-md px-2 py-1 self-start text-[8px] uppercase tracking-widest font-black text-amber-500">
                              Sofa Fest
                            </div>
                            <div className="text-left">
                              <span className="text-[8px] text-red-500 uppercase tracking-widest font-bold block">Special Offer</span>
                              <h5 className="text-sm font-black text-white leading-tight">UP TO 25% OFF</h5>
                              <p className="text-[8px] text-white/60">Limited stock wooden custom models</p>
                            </div>
                          </div>
                        </div>
                        <div className="p-3 bg-black/40 text-center text-[10px] text-white/50 uppercase tracking-widest font-mono border-t border-white/5">
                          Sofa Fest Banner
                        </div>
                      </div>

                      {/* CARD 2: New Arrival */}
                      <div className="bg-zinc-950 border border-white/10 rounded-2xl overflow-hidden relative shadow-lg group">
                        <div className="aspect-[3/4] relative overflow-hidden">
                          <img src="https://images.unsplash.com/photo-1616594039964-ae9021a400a0?q=80&w=400&auto=format&fit=crop" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                          <div className="absolute inset-0 p-4 flex flex-col justify-between">
                            <div className="bg-black/60 backdrop-blur-md border border-white/15 rounded-md px-2 py-1 self-start text-[8px] uppercase tracking-widest font-black text-white">
                              New Arrival
                            </div>
                            <div className="text-left">
                              <span className="text-[8px] text-amber-500 uppercase tracking-widest font-bold block">Modern Comfort</span>
                              <h5 className="text-sm font-black text-white leading-tight">TIMELESS STYLE</h5>
                              <p className="text-[8px] text-white/60">Premium wood bed collection</p>
                            </div>
                          </div>
                        </div>
                        <div className="p-3 bg-black/40 text-center text-[10px] text-white/50 uppercase tracking-widest font-mono border-t border-white/5">
                          New Arrival Setup
                        </div>
                      </div>

                      {/* CARD 3: Dining Sets */}
                      <div className="bg-zinc-950 border border-white/10 rounded-2xl overflow-hidden relative shadow-lg group">
                        <div className="aspect-[3/4] relative overflow-hidden">
                          <img src="https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?q=80&w=400&auto=format&fit=crop" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                          <div className="absolute inset-0 p-4 flex flex-col justify-between">
                            <div className="bg-black/60 backdrop-blur-md border border-white/15 rounded-md px-2 py-1 self-start text-[8px] uppercase tracking-widest font-black text-amber-500">
                              Dining Specials
                            </div>
                            <div className="text-left">
                              <span className="text-[8px] text-red-500 uppercase tracking-widest font-bold block">Family Living</span>
                              <h5 className="text-sm font-black text-white leading-tight">DINING TABLES</h5>
                              <p className="text-[8px] text-white/60">That bring families together</p>
                            </div>
                          </div>
                        </div>
                        <div className="p-3 bg-black/40 text-center text-[10px] text-white/50 uppercase tracking-widest font-mono border-t border-white/5">
                          Dining Set Showcase
                        </div>
                      </div>

                      {/* CARD 4: Transform Space */}
                      <div className="bg-zinc-950 border border-white/10 rounded-2xl overflow-hidden relative shadow-lg group">
                        <div className="aspect-[3/4] relative overflow-hidden">
                          <img src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=400&auto=format&fit=crop" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                          <div className="absolute inset-0 p-4 flex flex-col justify-between">
                            <div className="bg-black/60 backdrop-blur-md border border-white/15 rounded-md px-2 py-1 self-start text-[8px] uppercase tracking-widest font-black text-white">
                              Space Makeover
                            </div>
                            <div className="text-left">
                              <span className="text-[8px] text-amber-500 uppercase tracking-widest font-bold block">Exclusive Quality</span>
                              <h5 className="text-sm font-black text-white leading-tight">TRANSFORM SPACE</h5>
                              <p className="text-[8px] text-white/60">Beautiful bespoke customized fittings</p>
                            </div>
                          </div>
                        </div>
                        <div className="p-3 bg-black/40 text-center text-[10px] text-white/50 uppercase tracking-widest font-mono border-t border-white/5">
                          Design Consult Banner
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* BOTTOM SECTIONS: OUR APPROACH & TOOLS USED */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 border-t border-white/10 pt-10">
                    {/* LEFT SIDE: OUR APPROACH */}
                    <div className="lg:col-span-5 flex flex-col">
                      <h4 className="text-xs text-white/45 uppercase tracking-widest font-bold mb-4">OUR APPROACH</h4>
                      <ul className="space-y-3">
                        {[
                          'Understand audience & local market',
                          'Create value-driven, engaging content',
                          'Maintain consistent posting & branding',
                          'Build trust through engagement',
                          'Drive inquiries to conversions'
                        ].map((approach, i) => (
                          <li key={i} className="flex items-center gap-2.5 text-xs text-white/80">
                            <span className="w-4 h-4 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-[9px] text-emerald-400 shrink-0 font-bold">
                              ✓
                            </span>
                            {approach}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* RIGHT SIDE: TOOLS USED */}
                    <div className="lg:col-span-7 flex flex-col justify-between">
                      <div>
                        <h4 className="text-xs text-white/45 uppercase tracking-widest font-bold mb-5">TOOLS USED</h4>
                        
                        {/* 5 custom styled tools badges/logos */}
                        <div className="flex flex-wrap gap-4 items-center">
                          {[
                            { name: 'Meta Business Suite', icon: '♾️', bg: 'bg-blue-600/10 border-blue-500/30 text-blue-400' },
                            { name: 'Canva', icon: '🎨', bg: 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400' },
                            { name: 'CapCut', icon: '🎬', bg: 'bg-zinc-800 border-zinc-700 text-white' },
                            { name: 'InShot', icon: '🎞️', bg: 'bg-pink-600/10 border-pink-500/30 text-pink-400' },
                            { name: 'Google Business', icon: '🏪', bg: 'bg-blue-500/10 border-blue-500/30 text-blue-500' }
                          ].map((tool, i) => (
                            <div key={i} className={`flex items-center gap-2 px-3 py-2 border ${tool.bg} rounded-xl text-xs font-medium`}>
                              <span className="text-sm shrink-0">{tool.icon}</span>
                              <span className="tracking-wide">{tool.name}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Malayalam Brand Title Block & Footer details */}
                      <div className="mt-8 pt-6 border-t border-white/5 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                        <div className="text-left">
                          {/* Malayalam Typography Brand Logo */}
                          <div className="flex flex-col mb-2">
                            <span className="text-3xl font-black text-red-600 tracking-tight leading-none">രാജധാനി</span>
                            <span className="text-[11px] font-bold tracking-[0.4em] text-white uppercase ml-1">ഫർണിച്ചർ</span>
                          </div>
                        </div>

                        {/* Direct Contacts Info */}
                        <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-[11px] text-white/50">
                          <span className="flex items-center gap-1">
                            📍 Manjeri, Kerala
                          </span>
                          <span className="flex items-center gap-1">
                            📞 +91 9778013285
                          </span>
                          <span className="flex items-center gap-1">
                            🌐 www.rajadhanifurniture.in
                          </span>
                        </div>
                      </div>

                    </div>
                  </div>

                </div>
              ) : selectedProject.id === 'vascolands' ? (
                /* bespoke representation of the Vascolands Kennel Case Study */
                <div className="p-6 md:p-12 text-text-primary bg-[#080b09] halftone">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                    
                    {/* Left Column: Brand Strategy Details */}
                    <div className="lg:col-span-5 flex flex-col justify-start">
                      <span className="text-xs text-muted uppercase tracking-[0.3em] font-medium mb-3">Project</span>
                      <h3 className="text-5xl md:text-6xl font-black tracking-tight mb-2 text-white font-sans">
                        VASCOLANDS
                      </h3>
                      <p className="text-xs text-emerald-500 uppercase tracking-[0.2em] font-semibold mb-8 border-b border-stroke/40 pb-4">
                        Social Media Management &amp; Content Creation
                      </p>

                      <div className="mb-8">
                        <h4 className="text-xs text-white uppercase tracking-widest font-bold mb-3">About the Project</h4>
                        <p className="text-sm text-white/70 leading-relaxed font-light">
                          Constructed organic social media management pipelines for Vascolands Kennel, a trusted dog breeder in Malappuram, Kerala. Built strong trust with pet lovers through authentic daily care, training schedules, and breed showcases.
                        </p>
                      </div>

                      <div className="flex flex-col gap-6 mb-8">
                        <div className="flex gap-4 items-start">
                          <div className="w-10 h-10 rounded-full bg-surface/80 border border-stroke flex items-center justify-center shrink-0 text-white font-mono font-bold text-xs shadow-inner">
                            🐾
                          </div>
                          <div>
                            <h5 className="text-sm font-semibold uppercase tracking-wider text-white">Trust &amp; Transparency Content</h5>
                            <p className="text-xs text-white/50 leading-relaxed">
                              Highlighted dog health checks, play fields, premium nutrition, and certified breeder compliance.
                            </p>
                          </div>
                        </div>

                        <div className="flex gap-4 items-start">
                          <div className="w-10 h-10 rounded-full bg-surface/80 border border-stroke flex items-center justify-center shrink-0 text-white font-mono font-bold text-xs shadow-inner">
                            🎬
                          </div>
                          <div>
                            <h5 className="text-sm font-semibold uppercase tracking-wider text-white">Engaging Reels</h5>
                            <p className="text-xs text-white/50 leading-relaxed">
                              Produced short, heartwarming reels displaying puppy milestones, breed tips, and training results.
                            </p>
                          </div>
                        </div>

                        <div className="flex gap-4 items-start">
                          <div className="w-10 h-10 rounded-full bg-surface/80 border border-stroke flex items-center justify-center shrink-0 text-white font-mono font-bold text-xs shadow-inner">
                            📱
                          </div>
                          <div>
                            <h5 className="text-sm font-semibold uppercase tracking-wider text-white">Community Engagement</h5>
                            <p className="text-xs text-white/50 leading-relaxed">
                              Managed interactive stories, answering puppy care questions and driving adoption bookings.
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Tools Used Section */}
                      <div className="border-t border-stroke/40 pt-6">
                        <h4 className="text-xs text-white/50 uppercase tracking-widest font-bold mb-4">Tools &amp; Tech</h4>
                        <div className="flex flex-wrap gap-2">
                          {['Photoshop', 'Illustrator', 'Lightroom Mobile', 'CapCut Pro', 'Canva'].map((tech) => (
                            <span key={tech} className="text-[10px] font-mono bg-white/5 border border-white/10 text-white/70 px-2.5 py-1 rounded-md">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Right Column: High Fidelity Mockup */}
                    <div className="lg:col-span-7 flex flex-col gap-6">
                      <div className="bg-[#0f1210] border border-white/5 rounded-3xl p-6 relative overflow-hidden shadow-2xl flex flex-col">
                        <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/5 to-transparent pointer-events-none" />
                        
                        <div className="flex items-center justify-between text-white/50 text-[10px] pb-3 mb-2 border-b border-white/5">
                          <span className="font-semibold text-white">vascolands_kennel</span>
                          <span className="text-[8px] bg-white/10 px-1.5 py-0.5 rounded-md">1:00 🌐</span>
                        </div>

                        {/* IG Header stats */}
                        <div className="flex items-center gap-4 my-3">
                          <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-[18px]">
                            🐕
                          </div>
                          <div className="flex-1 flex justify-around text-center">
                            <div>
                              <span className="block text-xs font-bold text-white">110</span>
                              <span className="text-[8px] text-white/40 uppercase">posts</span>
                            </div>
                            <div>
                              <span className="block text-xs font-bold text-white">7,184</span>
                              <span className="text-[8px] text-white/40 uppercase">followers</span>
                            </div>
                            <div>
                              <span className="block text-xs font-bold text-white">220</span>
                              <span className="text-[8px] text-white/40 uppercase">following</span>
                            </div>
                          </div>
                        </div>

                        {/* Dog bio */}
                        <div className="text-[11px] text-white/80 space-y-0.5 bg-black/40 p-4 rounded-xl border border-white/5">
                          <p className="font-bold text-white">Vascolands Kennel</p>
                          <p className="text-[9px] text-emerald-400 font-medium">Dog Breeder</p>
                          <p>📍 Malappuram, Kerala 🇮🇳</p>
                          <p>🐕 Specializing in premium breeds, training &amp; daily care.</p>
                          <p className="text-blue-400 mt-1 cursor-pointer">🔗 wa.me/7012508785</p>
                        </div>

                        {/* Cute puppy grid display */}
                        <div className="grid grid-cols-3 gap-1 pt-2">
                          <div className="aspect-square rounded overflow-hidden">
                            <img src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=400&auto=format&fit=crop" className="w-full h-full object-cover" />
                          </div>
                          <div className="aspect-square rounded overflow-hidden">
                            <img src="https://images.unsplash.com/photo-1517849845537-4d257902454a?q=80&w=400&auto=format&fit=crop" className="w-full h-full object-cover" />
                          </div>
                          <div className="aspect-square rounded overflow-hidden">
                            <img src="https://images.unsplash.com/photo-1552053831-71594a27632d?q=80&w=400&auto=format&fit=crop" className="w-full h-full object-cover" />
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>
                </div>
              ) : selectedProject.id === 'clayy-kids' ? (
                /* bespoke representation of the Clayy Kids Couture Case Study */
                <div className="p-6 md:p-12 text-text-primary bg-[#08080c] halftone">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                    
                    {/* Left Column: Brand Strategy Details */}
                    <div className="lg:col-span-5 flex flex-col justify-start">
                      <span className="text-xs text-muted uppercase tracking-[0.3em] font-medium mb-3">Project</span>
                      <h3 className="text-5xl md:text-6xl font-black tracking-tight mb-2 text-white font-sans">
                        CLAYY KIDS
                      </h3>
                      <p className="text-xs text-violet-500 uppercase tracking-[0.2em] font-semibold mb-8 border-b border-stroke/40 pb-4">
                        Kids Fashion Brand SMM &amp; Identity
                      </p>

                      <div className="mb-8">
                        <h4 className="text-xs text-white uppercase tracking-widest font-bold mb-3">About the Project</h4>
                        <p className="text-sm text-white/70 leading-relaxed font-light">
                          Constructed the high-end social media lookbook and content strategy for Clayy Kids Couture, establishing a premium, cohesive, and modern kids luxury streetwear identity.
                        </p>
                      </div>

                      <div className="flex flex-col gap-6 mb-8">
                        <div className="flex gap-4 items-start">
                          <div className="w-10 h-10 rounded-full bg-surface/80 border border-stroke flex items-center justify-center shrink-0 text-white font-mono font-bold text-xs shadow-inner">
                            👗
                          </div>
                          <div>
                            <h5 className="text-sm font-semibold uppercase tracking-wider text-white">Consistent Aesthetics</h5>
                            <p className="text-xs text-white/50 leading-relaxed">
                              Planned structured grids displaying modern kids apparel against clean street and concrete backgrounds.
                            </p>
                          </div>
                        </div>

                        <div className="flex gap-4 items-start">
                          <div className="w-10 h-10 rounded-full bg-surface/80 border border-stroke flex items-center justify-center shrink-0 text-white font-mono font-bold text-xs shadow-inner">
                            🎬
                          </div>
                          <div>
                            <h5 className="text-sm font-semibold uppercase tracking-wider text-white">Creative Reel Direction</h5>
                            <p className="text-xs text-white/50 leading-relaxed">
                              Directed upbeat reels showcasing kids street style, playful attitudes, and material premium textures.
                            </p>
                          </div>
                        </div>

                        <div className="flex gap-4 items-start">
                          <div className="w-10 h-10 rounded-full bg-surface/80 border border-stroke flex items-center justify-center shrink-0 text-white font-mono font-bold text-xs shadow-inner">
                            🤝
                          </div>
                          <div>
                            <h5 className="text-sm font-semibold uppercase tracking-wider text-white">Product Promising Launch</h5>
                            <p className="text-xs text-white/50 leading-relaxed">
                              Created cohesive product launch calendars with specific discount events and shop links.
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Tools Used Section */}
                      <div className="border-t border-stroke/40 pt-6">
                        <h4 className="text-xs text-white/50 uppercase tracking-widest font-bold mb-4">Design Tools</h4>
                        <div className="flex flex-wrap gap-2">
                          {['Meta Suite', 'CapCut Pro', 'Lightroom Mobile', 'Canva Premium', 'Adobe Express'].map((tech) => (
                            <span key={tech} className="text-[10px] font-mono bg-white/5 border border-white/10 text-white/70 px-2.5 py-1 rounded-md">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Right Column: High Fidelity Mockup */}
                    <div className="lg:col-span-7 flex flex-col gap-6">
                      <div className="bg-[#121216] border border-white/5 rounded-3xl p-6 relative overflow-hidden shadow-2xl flex flex-col">
                        <div className="absolute inset-0 bg-gradient-to-tr from-violet-500/5 to-transparent pointer-events-none" />
                        
                        <div className="flex items-center justify-between text-white/50 text-[10px] pb-3 mb-2 border-b border-white/5">
                          <span className="font-semibold text-white">clayykidscouture</span>
                          <span className="text-[8px] bg-violet-500/20 text-violet-300 px-2 py-0.5 rounded-full">Premium Fashion</span>
                        </div>

                        {/* Testimonial Quote Panel */}
                        <div className="bg-black/30 p-4 rounded-xl border border-white/5 mb-4">
                          <span className="text-2xl text-violet-400 font-serif leading-none block mb-1">“</span>
                          <p className="text-xs text-white/80 italic leading-relaxed">
                            Every post, every reel, every story is crafted to reflect the style, quality, and vibe of Clayy Kids Couture.
                          </p>
                          <span className="block text-[9px] text-white/40 uppercase tracking-widest mt-2 font-mono">&mdash; Brand Manager, Clayy Kids</span>
                        </div>

                        {/* Kid fashion visual showcase */}
                        <div className="aspect-[16/10] bg-zinc-900 rounded-xl relative overflow-hidden border border-white/5">
                          <img src="https://images.unsplash.com/photo-1519457431-44ccd64a579b?q=80&w=600&auto=format&fit=crop" className="w-full h-full object-cover" />
                        </div>

                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                /* standard premium presentation for other case studies */
                <div className="p-6 md:p-12 text-text-primary">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-8">
                    <div>
                      <span className="text-xs text-muted uppercase tracking-[0.2em]">{selectedProject.category}</span>
                      <h3 className="text-4xl font-display italic font-medium text-text-primary mt-1 mb-4">{selectedProject.title}</h3>
                      <p className="text-sm text-muted leading-relaxed mb-6">
                        This digital masterpiece represents a custom conceptualization built for our exclusive client roster. We worked on end-to-end strategy, brand identity integration, interactive prototypes, and production delivery to provide a seamless high-impact presentation.
                      </p>
                      
                      <div className="flex flex-col gap-4">
                        <div className="flex gap-3">
                          <span className="text-emerald-400 font-bold">&bull;</span>
                          <span className="text-xs text-text-primary font-medium">Responsive viewport optimization with high performance loading</span>
                        </div>
                        <div className="flex gap-3">
                          <span className="text-emerald-400 font-bold">&bull;</span>
                          <span className="text-xs text-text-primary font-medium">Custom animations via GSAP and Framer Motion</span>
                        </div>
                        <div className="flex gap-3">
                          <span className="text-emerald-400 font-bold">&bull;</span>
                          <span className="text-xs text-text-primary font-medium">Robust and pristine responsive design grids</span>
                        </div>
                      </div>
                    </div>

                    <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-stroke bg-surface relative">
                      <img src={selectedProject.image} alt={selectedProject.title} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 halftone-overlay opacity-15" />
                    </div>
                  </div>
                </div>
              )}

              {/* Bottom Sticky CTA bar */}
              <div className="border-t border-stroke/70 p-6 bg-surface/90 backdrop-blur-md flex justify-end gap-3 z-50">
                <button
                  onClick={() => setSelectedProject(null)}
                  className="text-xs uppercase tracking-widest font-semibold border border-stroke px-6 py-3 rounded-full bg-bg hover:bg-surface transition"
                >
                  Close Case Study
                </button>
                <button
                  onClick={() => {
                    setSelectedProject(null);
                    onContactClick();
                  }}
                  className="text-xs uppercase tracking-widest font-semibold bg-white text-black px-6 py-3 rounded-full hover:bg-white/90 transition"
                >
                  Enquire about this project &rarr;
                </button>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

