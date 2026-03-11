import React from 'react';
import { motion } from 'framer-motion';

export const GlassCard = ({ children, className = '', hoverEffect = true }) => {
  return (
    <motion.div
      className={`relative group rounded-xl border border-[#30363d] bg-[#161b22] overflow-hidden transition-all duration-300 ${hoverEffect ? 'hover:border-[#76B900] hover:-translate-y-1 hover:shadow-lg hover:shadow-[#76B900]/10' : ''} ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative z-10 p-8 h-full">
        {children}
      </div>
    </motion.div>
  );
};
