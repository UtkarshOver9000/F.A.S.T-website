import React from 'react';
import { Instagram, Linkedin, Mail } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="border-t border-white/5 bg-[#000000] py-12">
      <div className="section !py-0 flex flex-col md:flex-row justify-between items-center gap-6">
        
        <div className="flex flex-col items-center md:items-start">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-6 h-6 bg-[#76B900] rounded" style={{ clipPath: 'polygon(20% 0%, 100% 0, 100% 20%, 80% 100%, 0 100%, 0% 80%)' }}/>
            <span className="font-heading font-black text-xl text-white">F.A.S.T</span>
          </div>
          <p className="text-gray-500 text-sm font-mono">© 2026 SRMIST Kattankulathur.</p>
        </div>

        <div className="flex gap-4">
          <a href="https://www.instagram.com/fast_srm/" target="_blank" rel="noopener noreferrer" className="p-3 bg-white/5 rounded-full hover:bg-[#76B900] hover:text-black transition-colors text-gray-400">
            <Instagram size={20} />
          </a>
          <a href="https://in.linkedin.com/company/fastsrm" target="_blank" rel="noopener noreferrer" className="p-3 bg-white/5 rounded-full hover:bg-[#76B900] hover:text-black transition-colors text-gray-400">
            <Linkedin size={20} />
          </a>
          <a href="mailto:contact@fastsrm.com" className="p-3 bg-white/5 rounded-full hover:bg-[#76B900] hover:text-black transition-colors text-gray-400">
            <Mail size={20} />
          </a>
        </div>
        
      </div>
    </footer>
  );
};
