import { motion } from 'motion/react';

interface Testimonial {
  project: string;
  quote: string;
  signature: string;
  name: string;
  role: string;
  image: string;
}

export default function Testimonials() {
  const testimonials: Testimonial[] = [
    {
      project: "Dotty Southville, Malaysia – Social Media Management",
      quote: "Shehin optimized our social media profile and created content that reflected our brand professionally. His communication was excellent, and he consistently delivered quality work on time.",
      signature: "— Dotty Southville, Malaysia",
      name: "BASIM.PK",
      role: "Business Owner",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop"
    },
    {
      project: "Muzzamil – Personal Website",
      quote: "Shehin transformed my ideas into a modern, responsive website that truly represents my personal brand. The design is clean, fast, and professional. Working with him was smooth from start to finish.",
      signature: "— Muzzamil, Physiotherapist",
      name: "MUZZAMIL.PM",
      role: "Realtor",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop"
    },
    {
      project: "Rajadhani Furniture – Content Strategy",
      quote: "Shehin developed creative content strategies that aligned with our marketing goals. His ideas helped us present our products in a more engaging way and improve our online brand presence.",
      signature: "— Rajadhani Furniture",
      name: "FAHIM.KV",
      role: "Satisfied Client",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=400&auto=format&fit=crop"
    },
    {
      project: "Stoneland Clothing Store – Content & Ads",
      quote: "Working with Shehin was a great experience. His content strategy, social media management, and Meta Ads approach helped us strengthen our online presence. He consistently delivered creative ideas, maintained our brand identity, and was always professional and reliable throughout the project.",
      signature: "— Stoneland Clothing Store",
      name: "HAKEEM.C",
      role: "Regular Client",
      image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=400&auto=format&fit=crop"
    }
  ];

  return (
    <section id="testimonials" className="bg-bg py-24 select-none border-t border-stroke/30 relative overflow-hidden">
      {/* Soft atmospheric background glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[400px] h-[400px] bg-[#4E85BF] opacity-[0.03] blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] bg-[#89AACC] opacity-[0.02] blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-16">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-[11px] text-white/40 uppercase tracking-[0.3em] font-medium mb-3"
          >
            Client Voices
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl md:text-6xl font-display italic text-text-primary font-medium tracking-tight mb-4"
          >
            Endorsements
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-sm text-muted leading-relaxed max-w-lg"
          >
            Kind words from clients, partners, and collaborators showcasing impact across strategy, content, and design.
          </motion.p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
          {testimonials.map((t, idx) => (
            <motion.div
              key={idx}
              id={`testimonial-card-${idx}`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1], delay: idx * 0.1 }}
              className="group relative p-8 bg-surface/30 hover:bg-surface/50 border border-stroke/70 rounded-3xl transition-all duration-500 flex flex-col justify-between overflow-hidden shadow-xl"
            >
              {/* Corner Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              <div>
                {/* Project Header Tag */}
                <div className="mb-6 flex items-center justify-between">
                  <span className="text-[10px] font-sans font-medium uppercase tracking-[0.15em] text-white/40 bg-white/5 border border-white/5 rounded-full px-3 py-1">
                    {t.project.split(' – ')[1] || t.project.split(' - ')[1] || "Project"}
                  </span>
                  <span className="font-display italic text-xl text-white/10 select-none">“</span>
                </div>

                {/* Quote Text */}
                <p className="text-[17px] sm:text-lg md:text-[19px] font-display italic font-light text-text-primary leading-relaxed mb-6 group-hover:text-white transition-colors duration-300">
                  &ldquo;{t.quote}&rdquo;
                </p>

                {/* Inner Signature Block */}
                <p className="text-xs text-white/40 font-mono tracking-wider mb-6 italic">
                  {t.signature}
                </p>
              </div>

              {/* Card Divider */}
              <div className="w-full h-px bg-stroke group-hover:bg-gradient-to-r group-hover:from-[#89AACC] group-hover:to-[#4E85BF] transition-all duration-500 mb-6" />

              {/* Author Info Block */}
              <div className="flex items-center gap-4">
                {/* Author Avatar with referer policy override */}
                <div className="relative w-12 h-12 rounded-full overflow-hidden border border-stroke/80 group-hover:border-white/20 transition-colors duration-300">
                  <img
                    src={t.image}
                    alt={t.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                
                {/* Author Name and Position */}
                <div>
                  <h4 className="text-xs font-sans font-bold uppercase tracking-widest text-text-primary">
                    {t.name}
                  </h4>
                  <p className="text-[11px] text-muted font-display italic mt-0.5">
                    {t.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
