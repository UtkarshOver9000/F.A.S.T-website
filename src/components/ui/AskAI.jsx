import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

const CLUB_INFO = {
  about:
    "F.A.S.T. (Futuristic AI Society for Technology) is a student-led club at SRMIST Kattankulathur, part of the NVIDIA Student Developer Ecosystem. We bridge the gap between cutting-edge AI, Data Science, and modern Business Systems.",
  domains:
    "FAST has 3 domains: Technical (AI, ML, DSBS), Corporate (partnerships, events, outreach), and Creatives (design, content, storytelling).",
  events:
    "Our events include: (1) Building RAG Agents with LLMs — DLI Workshop (Feb 28, 2026), (2) Fastathon — 24hr NVIDIA-powered hackathon (Mar 24-25, 2026, Prize Pool: ₹60,000 + ₹3,00,000 NVIDIA Credits), (3) AI Bootcamp — Coming Soon.",
  team:
    "Leadership: Adwaith P V (President), Rohan Ganesh (President). Leadership Team: Vasist Acharya (Technical Head), Tanmay Singh (Vice President), Anushka Gupta (Vision Head), Aditya Cherabolu (Corporate Head), Skandesh (Treasurer).",
  nvidia:
    "FAST is an official NVIDIA Student Developer Ecosystem Partner, providing members with GPU resources, DLI Certification, CUDA Tools, and a global network.",
  contact:
    "LinkedIn: linkedin.com/company/fastsrm | Instagram: @fast_srm | Email: fast@srmist.edu.in",
  join:
    "To join FAST, visit our Contact page or reach out through our LinkedIn or Instagram. We welcome all SRMIST students passionate about AI and technology!",
  fastathon:
    "Fastathon is a 24-hour NVIDIA-powered hackathon on March 24-25, 2026 at Tech Park 2, Room 712, SRMIST. Prize Pool: ₹60,000 + ₹3,00,000 NVIDIA Credits. Register before March 19. Earn NVIDIA DLI certificates each round with refreshments provided.",
};

const NAVIGATE_MAP = {
  home: "#/home",
  about: "#/about",
  domains: "#/domains",
  events: "#/events",
  gallery: "#/gallery",
  team: "#/team",
  contact: "#/contact",
};

const findAnswer = (query) => {
  const q = query.toLowerCase();

  // Navigation intent
  for (const [page, hash] of Object.entries(NAVIGATE_MAP)) {
    if (
      q.includes(`go to ${page}`) ||
      q.includes(`show ${page}`) ||
      q.includes(`navigate to ${page}`) ||
      q.includes(`take me to ${page}`) ||
      q.includes(`open ${page}`)
    ) {
      window.location.hash = hash;
      return `Navigating you to the ${page.charAt(0).toUpperCase() + page.slice(1)} page! 🚀`;
    }
  }

  // Knowledge answers
  if (q.includes("fastathon") || q.includes("hackathon")) return CLUB_INFO.fastathon;
  if (q.includes("about") || q.includes("what is fast") || q.includes("who are you")) return CLUB_INFO.about;
  if (q.includes("domain") || q.includes("department") || q.includes("team structure")) return CLUB_INFO.domains;
  if (q.includes("event") || q.includes("workshop") || q.includes("bootcamp")) return CLUB_INFO.events;
  if (q.includes("team") || q.includes("lead") || q.includes("president") || q.includes("member")) return CLUB_INFO.team;
  if (q.includes("nvidia") || q.includes("partner") || q.includes("gpu")) return CLUB_INFO.nvidia;
  if (q.includes("contact") || q.includes("email") || q.includes("linkedin") || q.includes("instagram") || q.includes("reach")) return CLUB_INFO.contact;
  if (q.includes("join") || q.includes("apply") || q.includes("register") || q.includes("sign up")) return CLUB_INFO.join;

  // Greetings
  if (q.includes("hello") || q.includes("hi") || q === "hey") return "Hey there! 👋 I'm the FAST AI Assistant. Ask me anything about the club — events, domains, team, or how to join!";

  return "I can help you with info about FAST — try asking about our events, domains, team, how to join, or NVIDIA partnership. You can also say 'go to events' to navigate!";
};

export const AskAI = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "ai",
      text: "Hey! I'm the FAST AI Assistant 🤖\nAsk me about the club, events, team, or say 'go to events' to navigate!",
    },
  ]);
  const [input, setInput] = useState("");
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    const userMsg = { role: "user", text: trimmed };
    const aiMsg = { role: "ai", text: findAnswer(trimmed) };
    setMessages((prev) => [...prev, userMsg, aiMsg]);
    setInput("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="fixed bottom-6 right-6 z-[9998] flex items-center gap-2 rounded-full border border-fast-neon/40 bg-[#0a0a0a]/90 backdrop-blur-xl px-5 py-3 text-sm font-bold text-fast-neon shadow-[0_0_30px_rgba(166,255,0,0.15)] transition-all hover:shadow-[0_0_40px_rgba(166,255,0,0.3)] hover:border-fast-neon/70"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
        </svg>
        Ask AI
      </motion.button>

      {/* Chat Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-20 right-6 z-[9999] w-[360px] max-w-[92vw] rounded-2xl border border-fast-neon/20 bg-[#0a0a0a]/95 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.6),0_0_30px_rgba(166,255,0,0.08)] overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-fast-neon/15 px-5 py-4">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-fast-neon/15 text-fast-neon">
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
                  </svg>
                </div>
                <div>
                  <span className="text-sm font-bold text-white">FAST AI</span>
                  <span className="ml-2 text-[0.6rem] uppercase tracking-[0.2em] text-fast-neon/60">Online</span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-fast-mist hover:text-white hover:bg-white/10 transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex flex-col gap-3 p-4 h-[320px] overflow-y-auto ask-ai-scroll">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap ${
                      msg.role === "user"
                        ? "bg-fast-neon/15 text-fast-neon border border-fast-neon/20"
                        : "bg-white/5 text-fast-mist border border-white/10"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="border-t border-fast-neon/15 px-4 py-3 flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about FAST..."
                className="flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-fast-mist/50 outline-none focus:border-fast-neon/40 transition-colors"
              />
              <button
                type="button"
                onClick={handleSend}
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-fast-neon/15 text-fast-neon border border-fast-neon/30 hover:bg-fast-neon hover:text-black transition-all"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                </svg>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
