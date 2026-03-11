import React from 'react';
import { motion } from 'framer-motion';
import { Database, Terminal, Layers } from 'lucide-react';

export const ProjectsSection = () => {
  const projects = [
    {
      title: "RAG Agent Development",
      category: "Industrial AI",
      description: "Building context-aware AI agents that integrate external institutional data with highly optimized LLMs for real-time querying.",
      icon: <Database className="text-[#76B900]" size={20} />,
      tech: ["PyTorch", "LangChain", "NVIDIA NIM"],
    },
    {
      title: "Agentic AI Survival Groups",
      category: "Research",
      description: "Hands-on student research clusters simulating real-world AI challenges, focusing on autonomous agent negotiation and task resolution.",
      icon: <Terminal className="text-[#76B900]" size={20} />,
      tech: ["Autogen", "OpenAI", "Docker"],
    },
    {
      title: "Deep Learning Architectures",
      category: "Core ML",
      description: "Training from-scratch transformers and investigating novel architectures for campus-wide data analysis.",
      icon: <Layers className="text-[#76B900]" size={20} />,
      tech: ["CUDA", "TensorRT", "Python"],
    }
  ];

  return (
    <section id="projects" className="section py-24 bg-[#0a0c10] border-y border-[#30363d]">
      <motion.div 
        className="mb-12 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <span className="text-[#76B900] font-medium text-sm tracking-wide uppercase mb-3 block">Research & Development</span>
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Core Initiatives</h2>
        <p className="text-gray-400 max-w-2xl mx-auto text-lg">Deploying scalable AI solutions and conducting hands-on research across institutional domains.</p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-6">
        {projects.map((project, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="flex flex-col p-8 bg-[#161b22] rounded-xl border border-[#30363d] hover:border-[#76B900] transition-colors"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-[#76B900]/10 rounded-md">
                {project.icon}
              </div>
              <span className="text-sm font-semibold text-gray-400 tracking-wide">{project.category}</span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">
              {project.title}
            </h3>
            <p className="text-gray-400 mb-8 leading-relaxed flex-grow">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-2 mt-auto">
              {project.tech.map((t, i) => (
                <span key={i} className="px-3 py-1 bg-[#0f1115] border border-[#30363d] rounded text-xs font-medium text-gray-300">
                  {t}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
