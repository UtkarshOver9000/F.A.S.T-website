import React from 'react';
import { motion } from 'framer-motion';
import { Network, Target, BrainCircuit } from 'lucide-react';

export const AboutSection = () => {
  return (
    <section id="about" className="section py-24 bg-[#0a0c10] border-t border-[#30363d]">
      <motion.div 
        className="max-w-3xl mx-auto text-center mb-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <span className="text-[#76B900] font-medium text-sm tracking-wide uppercase mb-3 block">Organization</span>
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Pioneering AI intelligence</h2>
        <p className="text-gray-400 text-lg leading-relaxed">
          We equip students with cutting-edge AI skills, focusing on Generative AI, AGI, and Agentic AI, backed by world-class industry mentorship.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        <div className="p-8 bg-[#161b22] border border-[#30363d] rounded-xl hover:border-[#76B900]/50 transition-colors">
          <Target className="text-[#76B900] mb-5" size={28} />
          <h3 className="text-xl font-bold mb-3 text-white">Our mission</h3>
          <p className="text-gray-400 text-sm leading-relaxed">
            To build a collaborative ecosystem that bridges academia, research, and industry. We focus on rapid prototyping and ethical AI for social good.
          </p>
        </div>

        <div className="p-8 bg-[#161b22] border border-[#30363d] rounded-xl hover:border-[#76B900]/50 transition-colors">
          <BrainCircuit className="text-[#76B900] mb-5" size={28} />
          <h3 className="text-xl font-bold mb-3 text-white">Core focus</h3>
          <p className="text-gray-400 text-sm leading-relaxed">
            Exploring the frontiers of Artificial Intelligence with a dedicated emphasis on Generative Models, Context-Aware Agents, and large-scale Compute.
          </p>
        </div>

        <div className="p-8 bg-[#161b22] border border-[#30363d] rounded-xl hover:border-[#76B900]/50 transition-colors border-t-4 border-t-[#76B900]">
          <Network className="text-[#76B900] mb-5" size={28} />
          <h3 className="text-xl font-bold mb-3 text-white">NVIDIA partnership</h3>
          <p className="text-gray-400 text-sm leading-relaxed">
            Proudly part of the NVIDIA Student Network. Our core workshops are powered by the Deep Learning Institute (DLI) with direct industry mentorship.
          </p>
        </div>
      </div>
    </section>
  );
};
