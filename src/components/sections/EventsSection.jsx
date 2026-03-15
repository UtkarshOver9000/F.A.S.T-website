import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin } from 'lucide-react';

export const EventsSection = () => {
  const events = [
    {
      title: "Building RAG Agents with LLM's",
      date: "Feb 28, 2026",
      location: "Peter Drucker Hall, MBA Block",
      description: "Official NVIDIA Deep Learning Institute (DLI) certification workshop on building Retrieval-Augmented Generation agents.",
      status: "Ended",
    },
    {
      title: "FAST x Founder Club Barter",
      date: "March 2025",
      location: "Mini Hall 2",
      description: "A professional networking and knowledge-exchange event connecting student founders, builders, and AI tech enthusiasts.",
      status: "Upcoming",
    }
  ];

  return (
    <section id="events" className="section py-24">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-[#30363d] pb-6">
        <div>
          <span className="text-[#76B900] font-medium text-sm tracking-wide uppercase mb-3 block">Ecosystem</span>
          <h2 className="text-3xl md:text-5xl font-bold text-white">Events & Workshops</h2>
        </div>
        <a href="#" className="text-gray-400 hover:text-white text-sm font-medium mt-4 md:mt-0 transition-colors">
          View All Events →
        </a>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {events.map((event, idx) => (
          <motion.div 
            key={idx} 
            className="flex flex-col bg-[#161b22] rounded-xl border border-[#30363d] overflow-hidden hover:border-[#76B900] transition-colors relative"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
          >
            <div className="absolute top-6 right-6 bg-[#0a0c10] border border-[#30363d] px-3 py-1 rounded text-xs font-semibold text-white uppercase tracking-wide">
              {event.status}
            </div>
            
            <div className="p-8 pt-16 flex flex-col flex-grow">
              <h3 className="text-2xl font-bold text-white mb-4">{event.title}</h3>
              
              <div className="flex flex-wrap gap-4 mb-6 text-sm text-gray-400 font-medium">
                <div className="flex items-center gap-2">
                  <Calendar size={16} className="text-[#76B900]" />
                  {event.date}
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-[#76B900]" />
                  {event.location}
                </div>
              </div>
              
              <p className="text-gray-400 leading-relaxed mb-8 flex-grow">{event.description}</p>
              
              <button className="mt-auto w-full py-3 rounded border border-[#30363d] hover:border-[#76B900] hover:bg-[#76B900]/10 text-white font-semibold transition-colors">
                Event Details
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
