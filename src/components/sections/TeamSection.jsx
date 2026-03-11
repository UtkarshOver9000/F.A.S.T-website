import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter, Instagram } from 'lucide-react';

export const TeamSection = () => {
  const team = [
    { name: "Adwaith P V", role: "Co-Founder", socials: ["github", "linkedin", "twitter"] },
    { name: "Rohan Ganesh", role: "Co-Founder", socials: ["github", "linkedin", "instagram"] },
    { name: "Vasist Acharya", role: "Technical Head", socials: ["github", "linkedin", "twitter"] },
    { name: "Aron Jolly", role: "Sponsor Manager", socials: ["github", "linkedin"] },
    { name: "Anushka Gupta", role: "Creatives Head", socials: ["github", "linkedin", "twitter"] },
    { name: "Aditya Chebrolu", role: "People Management Head", socials: ["github", "linkedin", "instagram"] },
    { name: "Skandesh", role: "-", socials: ["github", "linkedin", "instagram"] },
    { name: "Amiya", role: "-", socials: ["github", "linkedin", "instagram"] },
    { name: "Anushka Gupta", role: "Team Lead", socials: ["github", "linkedin"] },
    { name: "Tanmay Singh", role: "Treasurer", socials: ["github", "linkedin"] },
    { name: "Dhriti Gupta", role: "-", socials: ["github", "linkedin", "twitter"] },
    { name: "Siddhant", role: "-", socials: ["github", "linkedin", "instagram"] }
  ];

  const renderIcon = (platform) => {
    switch (platform) {
      case "github": return <Github size={20} className="hover:text-white transition-colors cursor-pointer" />;
      case "linkedin": return <Linkedin size={20} className="hover:text-white transition-colors cursor-pointer" />;
      case "twitter": return <Twitter size={20} className="hover:text-white transition-colors cursor-pointer" />;
      case "instagram": return <Instagram size={20} className="hover:text-white transition-colors cursor-pointer" />;
      default: return null;
    }
  };

  return (
    <section id="team" className="section py-24 bg-[#0a0c10]">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-6xl font-black text-[#e8ff3a] mb-4">Our Team</h2>
        <p className="text-gray-400 max-w-2xl mx-auto text-lg">
          Meet the innovative minds behind F.A.S.T, working together to push the boundaries of AI technology and research.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-16 max-w-6xl mx-auto px-4">
        {team.map((member, idx) => (
          <motion.div 
            key={idx} 
            className="flex flex-col items-center text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: (idx % 4) * 0.1 }}
          >
            {/* Vercel-style glowing hollow avatar ring */}
            <div className="w-36 h-36 rounded-full mb-6 border-2 border-[#a6ff00]/40 shadow-[0_0_30px_rgba(166,255,0,0.15)] relative overflow-hidden bg-transparent">
              {/* Optional: if you have images, place <img src={member.image} /> here */}
            </div>
            
            <h3 className="text-xl font-bold text-[#e8ff3a] mb-1">{member.name}</h3>
            <p className="text-[#a6ff00] font-semibold text-sm mb-4">{member.role}</p>
            
            <div className="flex justify-center gap-4 text-gray-400">
              {member.socials.map((platform, i) => (
                <span key={i}>{renderIcon(platform)}</span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
