import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

export const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Events', href: '#events' },
    { name: 'Team', href: '#team' },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-[#050505]/80 backdrop-blur-md border-b border-white/10 py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-[1400px] mx-auto px-6 flex justify-between items-center">
        <a href="#" className="flex items-center gap-3 group">
          <img src="/assets/fast-logo.png" alt="FAST" className="w-10 h-10 object-contain transition-transform group-hover:scale-110" />
          <span className="font-heading font-black text-2xl tracking-tighter text-white group-hover:text-[#a6ff00] transition-colors">
            F.A.S.T
          </span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a key={link.name} href={link.href} className="text-sm font-bold tracking-widest uppercase text-gray-400 hover:text-[#a6ff00] transition-colors">
              {link.name}
            </a>
          ))}
          <a href="#join" className="px-6 py-2.5 rounded-full bg-[#a6ff00] text-black font-black text-xs tracking-widest uppercase hover:scale-105 active:scale-95 transition-all shadow-[0_0_20px_rgba(166,255,0,0.3)]">
            Join Platform
          </a>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>

      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#0a0a0a] border-b border-white/10 overflow-hidden"
          >
            <div className="flex flex-col px-6 py-4 space-y-4">
              {links.map((link) => (
                <a key={link.name} href={link.href} onClick={() => setIsOpen(false)} className="text-lg font-semibold text-gray-300 hover:text-[#76B900]">
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
