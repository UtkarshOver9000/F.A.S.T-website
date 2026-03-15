import React from 'react';
import { motion } from 'framer-motion';
import { ConstellationBackground } from '../ui/ConstellationBackground';

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-24 pb-12 overflow-hidden bg-[#0a0a0a]">
      {/* Moving Glow Constellations */}
      <ConstellationBackground />

      <div className="section w-full max-w-5xl mx-auto flex flex-col items-center text-center z-10 px-4">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="inline-block px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-[#a6ff00] font-bold text-[0.65rem] md:text-xs tracking-[0.3em] uppercase mb-8 shadow-[0_0_20px_rgba(166,255,0,0.1)]"
        >
          <span className="mr-2 border-r border-white/20 pr-3">SRMIST x NVIDIA</span>
          Student Developer Community
        </motion.div>

        {/* Scaled Logo Placeholder for Hero */}
        <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8, delay: 0.2 }}
           className="w-48 md:w-80 mb-8 relative"
        >
          <img src="/assets/fast-logo.png" alt="FAST Logo" className="w-full h-auto drop-shadow-[0_0_30px_rgba(255,255,255,0.2)]" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent z-10 h-1/4 bottom-0" />
        </motion.div>

        <motion.h1 
          className="text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tighter mb-8 max-w-4xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          Pioneering the <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a6ff00] to-white">AI Revolution.</span>
        </motion.h1>

        <motion.p 
          className="text-lg md:text-xl text-gray-400 max-w-2xl mb-12 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          We equip students with cutting-edge AI skills, focusing on Generative AI, Agentic Systems, and AGI, backed by world-class industry mentorship.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <a href="#about" className="group relative inline-flex items-center gap-2 bg-white text-black px-10 py-5 rounded-full font-black transition-all hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(255,255,255,0.15)]">
            Explore F.A.S.T.
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              →
            </motion.span>
          </a>
          <a href="#team" className="inline-flex items-center gap-2 bg-black/40 backdrop-blur-md border border-white/20 text-white px-10 py-5 rounded-full font-black transition-all hover:bg-white/10 hover:border-white/40">
            Meet the Team
          </a>
        </motion.div>
      </div>

      {/* Subtle bottom gradient */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#0a0a0a] to-transparent pointer-events-none" />
    </section>
  );
};
