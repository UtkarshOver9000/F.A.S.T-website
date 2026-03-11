import React, { useCallback } from 'react';
import { motion } from 'framer-motion';
import Particles from "react-tsparticles";
import { loadSlim } from "@tsparticles/slim";

export const HeroSection = () => {
  const particlesInit = useCallback(async engine => {
    await loadSlim(engine);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-24 pb-12 overflow-hidden bg-[#0a0c10]">
      {/* Background Particles (AIML networking effect) */}
      <div className="absolute inset-0 z-0">
        <Particles
          id="tsparticles"
          init={particlesInit}
          options={{
            background: { color: { value: "transparent" } },
            fpsLimit: 120,
            interactivity: {
              events: {
                onHover: { enable: true, mode: "grab" },
                resize: true,
              },
              modes: {
                grab: { distance: 140, links: { opacity: 0.5 } }
              },
            },
            particles: {
              color: { value: "#76B900" },
              links: {
                color: "#76B900",
                distance: 150,
                enable: true,
                opacity: 0.2,
                width: 1,
              },
              move: {
                direction: "none",
                enable: true,
                outModes: { default: "bounce" },
                random: false,
                speed: 1,
                straight: false,
              },
              number: { density: { enable: true, area: 800 }, value: 60 },
              opacity: { value: 0.3 },
              shape: { type: "circle" },
              size: { value: { min: 1, max: 3 } },
            },
            detectRetina: true,
          }}
        />
      </div>

      <div className="section w-full max-w-4xl mx-auto flex flex-col items-center text-center z-10">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-block px-4 py-1.5 rounded-full border border-[#76B900]/30 bg-[#76B900]/10 text-[#76B900] font-bold text-xs tracking-widest uppercase mb-8"
        >
          <span className="mr-2 border-r border-[#76B900]/30 pr-2">DATA SCIENCE & BUSINESS SYSTEMS</span>
          NVIDIA Student Developer Community
        </motion.div>

        {/* Scaled Logo Placeholder for Hero (Match Mockup) */}
        <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ duration: 0.8, delay: 0.2 }}
           className="w-48 md:w-80 mb-8"
        >
          <img src="/logo.png" alt="FAST Logo" className="w-full h-auto drop-shadow-[0_0_30px_rgba(118,185,0,0.5)]" 
               onError={(e) => { e.target.style.display='none'; e.target.nextSibling.style.display='block'; }}/>
           <h1 style={{display: 'none'}} className="text-7xl md:text-[9rem] font-black text-transparent bg-clip-text bg-gradient-to-br from-[#76B900] to-[#a6ff00] tracking-tighter drop-shadow-[0_0_40px_rgba(118,185,0,0.3)]">
             F.A.S.T.
           </h1>
        </motion.div>

        <motion.p 
          className="text-lg md:text-xl text-gray-300 max-w-2xl mb-12 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          We are the premier tech community bridging the gap between cutting-edge Artificial Intelligence, Data Science, and modern Business Systems.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <a href="#about" className="inline-flex items-center gap-2 bg-gradient-to-r from-[#76B900] to-[#5d9100] hover:scale-105 text-black px-8 py-4 rounded-md font-bold transition-all shadow-lg shadow-[#76B900]/20">
            Discover FAST ↓
          </a>
        </motion.div>
      </div>
    </section>
  );
};
