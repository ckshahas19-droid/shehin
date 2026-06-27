import { motion } from 'motion/react';

export default function Stats() {
  const statsData = [
    { value: '1+', label: 'Years Experience', desc: 'Crafting premium brand experiences & modern digital channels.' },
    { value: '10+', label: 'Projects Done', desc: 'Launched successfully across marketing and content niches.' },
    { value: '100%', label: 'Commitment', desc: 'Accelerating business growth with creative and dynamic digital solutions.' },
  ];

  return (
    <section id="stats" className="bg-bg py-24 select-none border-t border-stroke/30">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          {statsData.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1], delay: idx * 0.15 }}
              className="group relative p-8 bg-surface/30 hover:bg-surface/50 border border-stroke/70 rounded-3xl transition-all duration-500 flex flex-col justify-between overflow-hidden shadow-xl"
            >
              {/* Corner Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              <div>
                {/* Stat Big value */}
                <span className="block text-5xl md:text-6xl font-display italic text-text-primary mb-3 font-semibold group-hover:accent-gradient-text transition-colors duration-300">
                  {stat.value}
                </span>

                {/* Divider line with gradient highlight on hover */}
                <div className="w-full h-px bg-stroke group-hover:bg-gradient-to-r group-hover:from-[#89AACC] group-hover:to-[#4E85BF] transition-all duration-500 mb-4" />

                {/* Stat label */}
                <h3 className="text-sm font-sans font-medium uppercase tracking-[0.2em] text-text-primary mb-2">
                  {stat.label}
                </h3>
              </div>

              {/* Stat description */}
              <p className="text-xs text-muted leading-relaxed">
                {stat.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
