import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { ConstellationBackground } from "./components/ui/ConstellationBackground";

const fastLogo = "/assets/fast-logo-icon.png";
const nvidiaLogo = "/assets/nvidia-logo.png";
const srmistLogo = "/assets/srmist-logo.png";
const heroPoster = "/assets/fast_poster.png";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const CHIP_RAIN = [
  { left: "6%", size: 22, delay: "0s", duration: "14s" },
  { left: "18%", size: 28, delay: "2s", duration: "16s" },
  { left: "32%", size: 20, delay: "4s", duration: "13s" },
  { left: "48%", size: 26, delay: "1s", duration: "15s" },
  { left: "62%", size: 24, delay: "3s", duration: "17s" },
  { left: "74%", size: 30, delay: "5s", duration: "18s" },
  { left: "86%", size: 18, delay: "2.5s", duration: "12s" },
  { left: "94%", size: 22, delay: "6s", duration: "19s" },
];

const NAV_ITEMS = [
  { label: "Home", path: "home" },
  { label: "About", path: "about" },
  { label: "Domains", path: "domains" },
  { label: "Events", path: "events" },
  { label: "Gallery", path: "gallery" },
  { label: "Team", path: "team" },
  { label: "Contact", path: "contact" },
];

const SectionHeading = ({ eyebrow, title, description, center }) => (
  <motion.div
    variants={fadeUp}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 0.7, ease: "easeOut" }}
    className={`${center ? "text-center mx-auto" : ""} max-w-3xl mb-12`}
  >
    <span className="text-[0.7rem] uppercase tracking-[0.4em] text-fast-cyan">{eyebrow}</span>
    <h2 className="mt-3 font-heading text-3xl md:text-4xl lg:text-5xl text-fast-cyan text-shadow">
      {title}
    </h2>
    <div
      className={`mt-4 h-px w-24 bg-gradient-to-r from-fast-neon to-transparent ${
        center ? "mx-auto" : ""
      }`}
    />
    {description ? <p className="mt-4 text-fast-mist">{description}</p> : null}
  </motion.div>
);

const IconBadge = ({ label }) => (
  <div className="h-12 w-12 rounded-2xl border border-fast-cyan/40 bg-fast-black/40 flex items-center justify-center text-[0.7rem] font-heading text-fast-cyan flex-shrink-0">
    {label}
  </div>
);

const Preloader = ({ visible }) => (
  <div id="preloader" className={visible ? "" : "hidden"} aria-hidden={!visible}>
    <div className="relative grid place-items-center gap-3">
      <div className="h-24 w-24 rounded-full border-2 border-fast-neon/20 border-t-fast-neon animate-spin" />
      <img src={fastLogo} alt="FAST logo" className="logo-glow h-14 w-14 absolute" />
      <span className="font-heading text-xs tracking-[0.4em] text-fast-neon">INITIALIZING</span>
    </div>
  </div>
);

const ChipRain = () => (
  <div className="chip-rain" aria-hidden="true">
    {CHIP_RAIN.map((chip, index) => (
      <span
        key={`chip-${index}`}
        className="chip"
        style={{
          left: chip.left,
          width: chip.size,
          height: chip.size,
          animationDelay: chip.delay,
          animationDuration: chip.duration,
        }}
      />
    ))}
  </div>
);

const getRouteFromHash = () => {
  if (typeof window === "undefined") return "home";
  const hash = window.location.hash || "#/home";
  const cleaned = hash.replace(/^#\/?/, "");
  const isValid = NAV_ITEMS.some((item) => item.path === cleaned);
  return cleaned && isValid ? cleaned : "home";
};

const App = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [loading, setLoading] = useState(true);
  const [eventFilter, setEventFilter] = useState("All");
  const [route, setRoute] = useState(getRouteFromHash);
  const [imageError, setImageError] = useState({});

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 900);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!menuOpen) return undefined;
    const close = () => setMenuOpen(false);
    window.addEventListener("resize", close);
    return () => window.removeEventListener("resize", close);
  }, [menuOpen]);

  useEffect(() => {
    if (typeof window === "undefined") return undefined;
    if (!window.location.hash) {
      window.location.hash = "#/home";
    }
    const handleHashChange = () => setRoute(getRouteFromHash());
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const handleRipple = (event) => {
    const target = event.currentTarget;
    const circle = document.createElement("span");
    const diameter = Math.max(target.clientWidth, target.clientHeight);
    const radius = diameter / 2;
    circle.style.width = `${diameter}px`;
    circle.style.height = `${diameter}px`;
    const rect = target.getBoundingClientRect();
    circle.style.left = `${event.clientX - rect.left - radius}px`;
    circle.style.top = `${event.clientY - rect.top - radius}px`;
    circle.classList.add("ripple-circle");
    const existing = target.querySelector(".ripple-circle");
    if (existing) existing.remove();
    target.appendChild(circle);
  };


  const stats = useMemo(
    () => [
      { label: "Members", value: "50+", note: "FAST Community" },
      { label: "Projects", value: "10+", note: "In Pipeline" },
      { label: "Events", value: "5+", note: "Annual Experiences" },
      { label: "NVIDIA", value: "Official", note: "Student Dev Ecosystem" },
    ],
    []
  );

  const aboutBubbles = [
    {
      title: "What is FAST?",
      desc: "F.A.S.T. (Futuristic AI Society for Technology) is a student-led club at SRMIST that brings together curious minds to explore, build, and innovate with Artificial Intelligence.",
      icon: "AI",
      image: "/assets/about-ai.png",
    },
    {
      title: "Our NVIDIA Partnership",
      desc: "As part of the NVIDIA Student Network, our members gain exclusive access to NVIDIA's Deep Learning Institute courses, expert workshops, and global networking opportunities.",
      icon: "NV",
      image: "/assets/about-nvidia.png",
    },
    {
      title: "Join Our Research Team",
      desc: "Join a vibrant community of researchers, creators, and problem-solvers. Here, you'll benefit from direct collaboration with renowned faculty and build a professional network.",
      icon: "RS",
      image: "/assets/domain-tech.png",
    },
    {
      title: "What's in it for you?",
      desc: "We host weekly ideathons, engaging activities, and interactive productivity events. At F.A.S.T., every session is designed to spark innovation while keeping the experience fun.",
      icon: "FY",
      image: "/assets/domain-creatives.png",
    },
  ];

  const domainGroups = [
    {
      title: "Technical",
      desc: "The tech backbone of our club - where innovation meets execution. From coding and development to hands-on projects, this team brings ideas to life with real-world impact.",
      image: "/assets/domain-tech.png",
      subdomains: ["AI", "ML", "DSBS"],
    },
    {
      title: "Corporate",
      desc: "The bridge between our club and the outside world. Managing partnerships, sponsorships, and outreach while also driving workshops, hackathons, and events, this team ensures our presence is felt both on and off campus.",
      image: "/assets/domain-corp.png",
    },
    {
      title: "Creatives",
      desc: "The storytellers and designers of the club. Through visuals, content, and unique ideas, this team adds the spark that makes everything we do engaging and unforgettable.",
      image: "/assets/domain-creatives.png",
    },
  ];

  const events = [
    {
      type: "Workshop",
      tag: "Workshop",
      title: "Building RAG Agents with LLM's",
      meta: "Peter Drucker Hall, MBA Block",
      date: "Feb 28, 2026",
      desc: "Certification workshop led by NVIDIA Deep Learning Institute (DLI) on building Retrieval-Augmented Generation agents.",
      status: "Past Event",
      icon: "CAL",
      image: "DLI Workshop",
      poster: "/assets/dliworkshopposter.jpeg",
      details: ["Lead Instructor: Dr. Janaki Meena", "Guest Speaker: Mr. Sruthik P (NVIDIA)", "NVIDIA DLI Certification"],
      learnMore: "/assets/dliworkshopposter.jpeg",
    },
    {
      type: "Hackathon",
      tag: "Hackathon",
      title: "Fastathon",
      meta: "Tech Park 2, Room 712",
      date: "24-25 March 2026 - 9:00 AM",
      desc: "24-hour NVIDIA-powered hackathon. Earn NVIDIA DLI certificates each round with refreshments provided.",
      status: "Coming Soon",
      icon: "IDE",
      image: "Fastathon Poster",
      poster: "/assets/fastathon-poster.png",
      details: ["Prize Pool: INR 60,000 + INR 3,00,000 NVIDIA Credits", "Register before March 19", "24-hour format"],
      calendar: {
        start: "20260324T090000",
        end: "20260325T090000",
        location: "Tech Park 2, Room 712, SRMIST",
      },
      learnMore: "/assets/fastathon-poster.png",
    },
    {
      type: "Bootcamp",
      tag: "Bootcamp",
      title: "AI Bootcamp",
      meta: "SRMIST Tech Hub",
      date: "Coming Soon",
      desc: "Intensive hands-on bootcamp covering neural networks, transformers, and deployments.",
      status: "Coming Soon",
      icon: "CPU",
      image: "Bootcamp Visual",
      learnMore: "#/contact",
    },
  ];

  const gallerySections = [
    {
      title: "Technical Gallery",
      description: "Labs, workshops, and hackathon builds.",
      images: [
        "/assets/technical1.jpeg",
        "/assets/technical2 (1).jpeg",
        "/assets/technical2 (3).jpeg",
        "/assets/technical4).jpeg",
      ],
    },
    {
      title: "Social Gallery",
      description: "Community moments and creative drops.",
      images: [
        "/assets/social1.jpeg",
        "/assets/social2.jpeg",
        "/assets/social3.jpeg",
        "/assets/social4.jpeg",
      ],
    },
  ];

  const eventFilters = ["All", "Workshop", "Bootcamp", "Hackathon"];

  const filteredEvents = useMemo(
    () => (eventFilter === "All" ? events : events.filter((event) => event.type === eventFilter)),
    [eventFilter, events]
  );

  const [eventNotice, setEventNotice] = useState({});

  const handleAddToCalendar = (event) => {
    if (!event.calendar) {
      setEventNotice((prev) => ({ ...prev, [event.title]: "Calendar details coming soon." }));
      return;
    }
    const { start, end, location } = event.calendar;
    const detailsLine = event.details ? `\n${event.details.join(" | ")}` : "";
    const description = `${event.desc}${detailsLine}`;
    const ics = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//FAST//Events//EN",
      "BEGIN:VEVENT",
      `UID:${Date.now()}@fastsrm`,
      `DTSTAMP:${start}Z`,
      `DTSTART:${start}Z`,
      `DTEND:${end}Z`,
      `SUMMARY:${event.title}`,
      `DESCRIPTION:${description}`,
      `LOCATION:${location || "SRMIST"}`,
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\n");
    const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${event.title.replace(/\s+/g, "-").toLowerCase()}.ics`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleLearnMore = (event) => {
    if (event.learnMore) {
      window.open(event.learnMore, "_blank", "noopener,noreferrer");
      return;
    }
    setEventNotice((prev) => ({ ...prev, [event.title]: "Details will be announced soon." }));
  };



  const teamGroups = [
    {
      title: "Leadership",
      members: [
        {
          name: "Adwaith P V",
          role: "President",
          initials: "AV",
          image: "/assets/adwaith.jpg.jpeg",
          linkedin: "https://www.linkedin.com/in/adwaithpv/",
        },
        {
          name: "Rohan Ganesh",
          role: "President",
          initials: "RG",
          image: "/assets/rohan ganesh.jpg.jpeg",
          linkedin: "https://www.linkedin.com/in/rohan-ganesh2306/",
        },
      ],
    },
    {
      title: "Leadership Team",
      members: [
        {
          name: "Vasist Acharya",
          role: "Technical Head",
          initials: "VA",
          image: "/assets/vasist.jpg.jpeg",
          linkedin: "https://www.linkedin.com/in/vasistacharya/",
        },
        {
          name: "Tanmay Singh",
          role: "Vice President",
          initials: "TS",
          image: "/assets/tanmay.jpg",
          linkedin: "https://www.linkedin.com/company/fastsrm",
        },
        {
          name: "Anushka Gupta",
          role: "Vision Head",
          initials: "AG",
          image: "/assets/anushka.jpg.jpeg",
          linkedin: "https://www.linkedin.com/in/anushka-gupta04/",
        },
        {
          name: "Aditya Cherabolu",
          role: "Corporate Head",
          initials: "AC",
          image: "/assets/Aditya.jpg",
          linkedin: "https://www.linkedin.com/in/aditya-chebrolu-5a0321277/",
        },
        {
          name: "Skandesh",
          role: "Treasurer",
          initials: "S",
          image: "/assets/skandesh.jpeg",
          linkedin: "https://www.linkedin.com/company/fastsrm",
        },
      ],
    },
  ];

  const corporateLeads = teamGroups.flatMap((group) => group.members);

  return (
    <div className="relative overflow-hidden">
      <Preloader visible={loading} />

      <header
        className={`fixed top-0 z-[9999] w-full transition-all duration-500 ${
          scrolled ? "bg-black/80 backdrop-blur-2xl border-b border-white/5 py-4" : "bg-transparent py-6"
        }`}
      >
        <div className="mx-auto flex w-[92%] max-w-7xl items-center justify-between">
          <a href="#/home" className="flex items-center gap-3 group">
            <img src={fastLogo} alt="FAST" className="h-10 w-auto logo-glow transition-transform group-hover:scale-110" />
          </a>
          <nav className="hidden items-center gap-6 lg:gap-8 text-[0.62rem] font-bold uppercase tracking-[0.2em] md:flex">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.label}
                href={`#/${item.path}`}
                className={`transition-colors duration-300 ${
                  route === item.path ? "text-[#a6ff00]" : "text-gray-400 hover:text-white"
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-4">
            <div className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-[0.6rem] font-bold uppercase tracking-[0.2em] text-[#a6ff00] md:flex">
              <img src={nvidiaLogo} alt="NVIDIA" className="h-6 w-auto" />
              NVIDIA Partner
            </div>
            <a
              href="#/contact"
              className="hidden rounded-full bg-white text-black px-6 py-2.5 text-[0.65rem] font-black uppercase tracking-[0.2em] transition-all hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(255,255,255,0.15)] md:inline-flex"
            >
              Join FAST
            </a>
            {!menuOpen && (
              <button
                type="button"
                className="flex h-12 w-12 items-center justify-center rounded-full border border-fast-neon/30 bg-fast-deep/80 text-fast-neon md:hidden"
                onClick={() => setMenuOpen(true)}
                aria-label="Open navigation"
              >
                <div className="flex flex-col gap-1.5">
                  <span className="h-0.5 w-6 bg-fast-neon" />
                  <span className="h-0.5 w-6 bg-fast-neon" />
                  <span className="h-0.5 w-6 bg-fast-neon" />
                </div>
              </button>
            )}
          </div>
        </div>
      </header>

      <main className={`relative z-10 ${route !== 'home' ? 'section-bg-tech' : ''}`}>
        {route === "home" && (
        <section id="home" className="section-wrap min-h-screen grid-bg flex items-center justify-center pt-24 pb-12 overflow-hidden bg-[#050505]">
          <ConstellationBackground />
          <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/40 via-[#050505]/70 to-[#050505]/95 pointer-events-none" />
          <div className="absolute -right-24 top-24 h-72 w-72 rounded-full spiral-bg opacity-45 pointer-events-none" />
          <div className="absolute -left-20 bottom-16 h-56 w-56 rounded-full spiral-bg opacity-30 pointer-events-none" />
          <ChipRain />
          <div className="relative mx-auto grid w-[92%] max-w-6xl grid-cols-1 items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="space-y-6"
            >
              <span className="inline-flex items-center rounded-full border border-fast-neon/30 bg-fast-deep/80 px-4 py-2 text-[0.7rem] uppercase tracking-[0.3em] text-fast-neon">
                Powered by the NVIDIA Student Developer Ecosystem
              </span>
              <div className="flex flex-col items-start gap-2">
                <div className="flex flex-col">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    className="relative w-full max-w-md -ml-2"
                  >
                    <img 
                      src={heroPoster} 
                      alt="F.A.S.T" 
                      className="h-32 md:h-48 w-auto object-contain logo-glow" 
                    />
                  </motion.div>
                </div>
                <p className="mt-4 text-xl md:text-2xl font-heading text-fast-neon">Futuristic AI Society of Tech</p>
                <p className="mt-2 text-xs md:text-sm uppercase tracking-[0.4em] text-fast-neon/80">
                  Compute. Train. Accelerate.
                </p>
              </div>
              <p className="max-w-xl text-fast-mist text-lg">
                Building the future of Artificial Intelligence, GPU Computing, and Systems Innovation at SRMIST
                Kattankulathur.
              </p>
              <div className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-fast-mist">
                <div className="relative flex h-10 w-10 items-center justify-center rounded-full border border-fast-neon/30 bg-fast-black/40">
                  <img
                    src={srmistLogo}
                    alt="SRMIST"
                    className="h-7 w-7 object-contain"
                    onError={(event) => {
                      event.currentTarget.style.display = "none";
                      const fallback = event.currentTarget.nextSibling;
                      if (fallback) fallback.style.display = "flex";
                    }}
                  />
                  <span className="hidden text-[0.55rem] uppercase tracking-[0.2em] text-fast-mist">
                    SRMIST
                  </span>
                </div>
                SRMIST Kattankulathur
              </div>
              <div className="flex flex-wrap gap-4">
                <a
                  href="#/contact"
                  className="rounded-full bg-gradient-to-r from-fast-nvidia to-fast-neon px-6 py-3 text-sm font-semibold text-fast-black shadow-glow transition hover:-translate-y-0.5 ripple-btn"
                  onClick={handleRipple}
                >
                  Join the Community
                </a>
                <a
                  href="#/domains"
                  className="rounded-full border border-fast-neon/30 bg-fast-deep/60 px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 ripple-btn"
                  onClick={handleRipple}
                >
                  Explore Domains
                </a>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="glass-card rounded-2xl px-4 py-5 text-center"
                  >
                    <div className="text-2xl font-heading text-fast-cyan">{stat.value}</div>
                    <div className="mt-1 text-xs uppercase tracking-[0.3em] text-fast-mist">
                      {stat.label}
                    </div>
                    <div className="mt-2 text-[0.7rem] text-fast-mist">{stat.note}</div>
                  </div>
                ))}
              </div>
              <div className="rounded-2xl border border-fast-neon/20 bg-fast-deep/70 px-5 py-4 text-sm text-fast-mist">
                NVIDIA-backed learning, research, and GPU-first innovation at SRMIST.
              </div>
            </motion.div>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.9, ease: "easeOut", delay: 0.1 }}
              className="relative flex flex-col items-center gap-6"
            >
              <div className="hero-slab angled-card rounded-3xl p-6 text-center">
                <p className="text-xs uppercase tracking-[0.4em] text-fast-nvidia">Partnered With</p>
                <div className="mt-5 flex items-center justify-center">
                  <img src={nvidiaLogo} alt="NVIDIA" className="h-16 logo-glow" />
                </div>
                <p className="mt-4 text-sm text-fast-mist">
                  Official NVIDIA Student Developer Ecosystem Partner
                </p>
              </div>
            </motion.div>
          </div>
        </section>
        )}

        {route === "about" && (
          <section id="about" className="section-wrap">
            <div className="mx-auto w-[92%] max-w-6xl">
              <SectionHeading
                eyebrow="Who We Are"
                title="About Us"
                description="FAST is the NVIDIA-backed AI society at SRMIST Kattankulathur, powering GPU-first learning, research, and systems innovation."
                center
              />
              <div className="grid gap-8 md:grid-cols-2">
                {aboutBubbles.map((card, idx) => (
                  <motion.div
                    key={card.title}
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.8, delay: idx * 0.1 }}
                    className="glass-card group relative overflow-hidden rounded-[2.5rem] p-8 border border-fast-neon/10 hover:border-fast-neon/40 transition-all duration-700"
                  >
                    <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-fast-neon/5 blur-[80px] group-hover:bg-fast-neon/15 transition-all duration-1000" />
                    
                    <div className="relative flex flex-col md:flex-row items-center gap-10">
                      <motion.div 
                        whileHover={{ scale: 1.15, rotate: 8, zIndex: 10 }}
                        className="h-40 w-40 flex-shrink-0 relative"
                      >
                        <div className="absolute inset-0 bg-fast-neon/30 blur-3xl rounded-full animate-pulse opacity-50" />
                        <img 
                          src={card.image} 
                          alt={card.title} 
                          className="relative z-10 h-full w-full object-contain filter drop-shadow-[0_0_20px_rgba(166,255,0,0.4)]" 
                        />
                      </motion.div>
                      
                      <div className="flex-1 text-center md:text-left">
                        <span className="text-[0.65rem] uppercase tracking-[0.4em] text-fast-neon/60 font-bold mb-2 block">
                          Phase {idx + 1}
                        </span>
                        <h3 className="font-heading text-2xl text-white group-hover:text-fast-neon transition-colors duration-300">
                          {card.title}
                        </h3>
                        <p className="mt-4 text-fast-mist leading-relaxed italic text-sm md:text-base opacity-80 group-hover:opacity-100 transition-opacity">
                          "{card.desc}"
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

        {route === "domains" && (
        <section id="domains" className="section-wrap">
          <div className="mx-auto w-[92%] max-w-6xl">
            <SectionHeading
              eyebrow="What We Do"
              title="Our Domains"
              description="Three pillars that power FAST. Technical, Corporate, and Creatives."
            />
            <div className="grid gap-8 lg:grid-cols-3">
              {domainGroups.map((domain, index) => (
                <motion.div
                  key={domain.title}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.05 }}
                  className="domain-card relative overflow-hidden rounded-[28px] border border-fast-neon/20 bg-fast-black/60 p-6"
                >
                  <div className="domain-pattern absolute inset-0 opacity-70" />
                  <span className="domain-orb -left-6 top-6" style={{ animationDelay: `${index * 0.3}s` }} />
                  <span className="domain-orb -right-5 bottom-6" style={{ animationDelay: `${index * 0.6}s` }} />
                  <div className="relative flex items-start gap-4">
                    <div className="domain-image group-hover:scale-110 transition-transform duration-500">
                      {domain.image ? (
                        <img src={domain.image} alt={`${domain.title} visual`} className="h-full w-full object-cover" />
                      ) : (
                        <span>{domain.imageLabel}</span>
                      )}
                    </div>
                    <div>
                      <h3 className="font-heading text-lg">{domain.title}</h3>
                      <p className="mt-2 text-sm text-fast-mist">{domain.desc}</p>
                    </div>
                  </div>
                  {domain.subdomains ? (
                    <div className="relative mt-5 flex flex-wrap gap-2 text-xs uppercase tracking-[0.2em]">
                      {domain.subdomains.map((item) => (
                        <span
                          key={item}
                          className="rounded-full border border-fast-neon/30 bg-fast-emerald/20 px-3 py-1 text-fast-neon"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  ) : null}
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        )}

        {route === "events" && (
        <section id="events" className="section-wrap">
          <div className="mx-auto w-[92%] max-w-6xl">
            <SectionHeading
              eyebrow="Upcoming"
              title="Events"
              description="Join us for NVIDIA-powered workshops, competitions, and learning experiences."
            />
            <div className="mb-8 flex flex-wrap gap-3 text-xs uppercase tracking-[0.3em]">
              {eventFilters.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setEventFilter(item)}
                  className={`rounded-full border px-4 py-2 transition ${
                    eventFilter === item
                      ? "border-fast-cyan/60 bg-fast-cyan/25 text-fast-cyan"
                      : "border-fast-neon/20 bg-fast-deep/60 text-fast-mist hover:border-fast-cyan/40 hover:text-fast-cyan"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredEvents.map((event) => (
                <motion.div
                  key={event.title}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="glass-card overflow-hidden rounded-3xl"
                >
                  <div className="relative h-40 w-full overflow-hidden bg-gradient-to-br from-fast-slate/90 via-fast-black/80 to-fast-black/80">
                    {event.poster ? (
                      <img
                        src={event.poster}
                        alt={`${event.title} poster`}
                        className="absolute inset-0 h-full w-full object-cover"
                        onError={(event) => {
                          event.currentTarget.style.display = "none";
                        }}
                      />
                    ) : null}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(34,255,136,0.22),_transparent_60%)]" />
                    <div className="absolute inset-0 flex items-center justify-center text-[0.6rem] uppercase tracking-[0.4em] text-fast-mist/40 font-bold">
                      {event.poster ? "" : `${event.image} - TBA`}
                    </div>
                  </div>
                  <div className="border-b border-fast-neon/15 bg-fast-black/40 p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-fast-cyan/40 bg-fast-black/40 text-[0.65rem] font-heading text-fast-cyan">
                        {event.icon}
                      </div>
                      <span className="rounded-full border border-fast-cyan/40 bg-fast-cyan/15 px-3 py-1 text-[0.6rem] uppercase tracking-[0.3em] text-fast-cyan">
                        {event.status}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-heading text-lg">{event.title}</h3>
                    <div className="mt-2 flex items-center gap-2 text-sm text-fast-cyan">
                      <span className="h-2 w-2 rounded-full bg-fast-cyan" />
                      <span>{event.date}</span>
                    </div>
                    <p className="mt-2 text-xs uppercase tracking-[0.25em] text-fast-mist">{event.meta}</p>
                    <p className="mt-3 text-sm text-fast-mist">{event.desc}</p>
                    {event.details ? (
                      <ul className="mt-3 space-y-1 text-xs text-fast-mist">
                        {event.details.map((detail) => (
                          <li key={detail}>- {detail}</li>
                        ))}
                      </ul>
                    ) : null}
                    <div className="mt-6 flex flex-wrap gap-3">
                      <button
                        type="button"
                        className="rounded-full border border-fast-neon/30 bg-fast-deep/70 px-4 py-2 text-xs font-semibold text-fast-mist ripple-btn"
                        onClick={(eventClick) => {
                          handleRipple(eventClick);
                          handleAddToCalendar(event);
                        }}
                      >
                        Add to Calendar
                      </button>
                      <button
                        type="button"
                        className="rounded-full bg-fast-cyan px-4 py-2 text-xs font-semibold text-fast-black ripple-btn"
                        onClick={(eventClick) => {
                          handleRipple(eventClick);
                          handleLearnMore(event);
                        }}
                      >
                        Learn More
                      </button>
                    </div>
                    {eventNotice[event.title] ? (
                      <p className="mt-3 text-xs text-fast-mist">{eventNotice[event.title]}</p>
                    ) : null}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        )}

        {route === "gallery" && (
        <section id="gallery" className="section-wrap">
          <div className="mx-auto w-[92%] max-w-6xl">
            <SectionHeading
              eyebrow="Gallery"
              title="FAST Gallery"
              description="Technical showcases and social highlights. Add your images into each space."
            />
            <div className="grid gap-6 lg:grid-cols-2">
              {gallerySections.map((section) => (
                <motion.div
                  key={section.title}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="glass-card rounded-3xl p-6"
                >
                  <h3 className="font-heading text-lg text-fast-neon">{section.title}</h3>
                  <p className="mt-2 text-sm text-fast-mist">{section.description}</p>
                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    {section.images.map((img, index) => (
                      <div
                        key={`${section.title}-${index}`}
                        className="group relative h-40 overflow-hidden rounded-2xl border border-fast-neon/20 bg-fast-black/40"
                      >
                        <img
                          src={img}
                          alt={`${section.title} ${index + 1}`}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-fast-black/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                      </div>
                    ))}
                    {(!section.images || section.images.length === 0) &&
                      Array.from({ length: section.slots }).map((_, index) => (
                        <div
                          key={`${section.title}-${index}`}
                          className="flex h-40 items-center justify-center rounded-2xl border border-fast-neon/20 bg-fast-black/40 text-xs uppercase tracking-[0.25em] text-fast-mist"
                        >
                          TBA
                        </div>
                      ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        )}


        {route === "team" && (
        <section id="team" className="section-wrap">
          <div className="mx-auto w-[92%] max-w-6xl">
            <SectionHeading
              eyebrow="The People"
              title="Corporate Team"
              description="The leadership team building FAST's AI ecosystem at SRMIST."
              center
            />
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {corporateLeads.map((member) => (
                <motion.div
                  key={member.name}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="glass-card rounded-3xl p-6"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full border border-fast-neon/40 bg-fast-black/40 text-sm font-heading text-fast-neon relative overflow-hidden">
                      {member.image && (
                        <img
                          src={member.image}
                          alt={member.name}
                          className="absolute inset-0 h-full w-full object-cover z-20"
                          onError={(event) => {
                            event.currentTarget.style.display = "none";
                          }}
                        />
                      )}
                      <span className="relative z-10">{member.initials}</span>
                    </div>
                    <div>
                      <h4 className="font-heading text-base text-white">{member.name}</h4>
                      <p className="text-sm text-fast-neon">{member.role}</p>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center gap-3 text-fast-mist">
                    <a
                      href={member.linkedin || "https://www.linkedin.com/company/fastsrm"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-fast-neon/30 bg-fast-black/30 text-fast-neon"
                    >
                      <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
                        <path
                          fill="currentColor"
                          d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Zm-2 7h4v10h-4v-10Zm7 0h3.8v1.4h.1c.5-.9 1.8-1.8 3.7-1.8 4 0 4.7 2.5 4.7 5.8v4.6h-4v-4.1c0-1-.1-2.4-1.6-2.4-1.6 0-1.8 1.1-1.8 2.3v4.2h-4v-10Z"
                        />
                      </svg>
                    </a>
                  </div>
                  <div className="mt-4 rounded-full border border-fast-neon/20 bg-fast-black/40 px-4 py-2 font-mono text-xs text-fast-neon">
                    $ ./view-profile {member.name.toLowerCase().replace(/\s+/g, "-")}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        )}

        {route === "team" && (
        <section id="builders" className="section-wrap">
          <div className="mx-auto w-[92%] max-w-6xl">
            <SectionHeading
              eyebrow="Website Built By"
              title="FAST Digital Architects"
              description="Crafted with a futuristic product mindset and NVIDIA-inspired visual direction."
              center
            />
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  name: "Utkarsh Sharma",
                  image: "/assets/utkarsh.jpeg",
                  linkedin: "https://www.linkedin.com/in/utkarsh-sharma-lm10/",
                },
                {
                  name: "Swetank Kumar",
                  image: "/assets/swetank.jpg",
                  linkedin: "https://www.linkedin.com/in/swetank-kumar-706557249/",
                },
                {
                  name: "Shashwat Chaturvedi",
                  image: "/assets/shashwat.png",
                  linkedin: "https://www.linkedin.com/in/shashwat-chaturvedi-a840a4353/",
                },
              ].map((builder) => (
                <motion.div
                  key={builder.name}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="glass-card rounded-3xl p-6 text-center"
                >
                  <div className="mx-auto mb-4 h-20 w-20 rounded-2xl border border-fast-neon/40 bg-fast-emerald/50 text-fast-neon flex items-center justify-center font-heading text-xl overflow-hidden relative">
                    {builder.image ? (
                      <img src={builder.image} alt={builder.name} className="w-full h-full object-cover" />
                    ) : (
                      builder.name
                        .split(" ")
                        .map((part) => part[0])
                        .join("")
                    )}
                  </div>
                  <h3 className="font-heading text-lg">{builder.name}</h3>
                  <a
                    href={builder.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center justify-center rounded-full border border-fast-neon/30 bg-fast-deep/70 px-4 py-2 text-[0.7rem] uppercase tracking-[0.2em] text-fast-mist hover:text-white transition-colors"
                  >
                    LinkedIn
                  </a>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        )}

        {route === "about" && (
        <section id="partner" className="section-wrap">
          <div className="mx-auto w-[92%] max-w-6xl">
            <SectionHeading
              eyebrow="Our Ecosystem Partner"
              title="Official NVIDIA Student Developer Ecosystem Partner"
              description="F.A.S.T is an official partner of the NVIDIA Student Developer ecosystem at SRMIST - empowering the next generation of AI innovators with access to GPU resources, DLI certified training, and a global network of AI researchers."
              center
            />
            <div className="flex flex-col items-center gap-6">
              <div className="flex items-center gap-4">
                <img src={fastLogo} alt="FAST" className="h-14 logo-glow" />
                <span className="text-fast-neon text-xl">x</span>
                <img src={nvidiaLogo} alt="NVIDIA" className="h-16 logo-glow" />
              </div>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 w-full">
                {[
                  { title: "GPU Resources", desc: "Access to NVIDIA GPU compute infrastructure." },
                  { title: "DLI Certification", desc: "Official NVIDIA Deep Learning Institute training." },
                  { title: "CUDA Tools", desc: "Full suite of NVIDIA developer tools and SDKs." },
                  { title: "Ecosystem Network", desc: "Global NVIDIA student developer community." },
                ].map((item) => (
                  <motion.div
                    key={item.title}
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="glass-card rounded-3xl p-6 text-center"
                  >
                    <h4 className="font-heading text-base">{item.title}</h4>
                    <p className="mt-2 text-sm text-fast-mist">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
              <div className="rounded-full border border-fast-neon/30 bg-fast-deep/70 px-6 py-3 text-xs uppercase tracking-[0.3em] text-fast-neon">
                NVIDIA Student Developer Ecosystem Partner
              </div>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-6">
                <img src={nvidiaLogo} alt="NVIDIA" className="h-12 logo-glow" />
                <div className="relative flex h-14 w-14 items-center justify-center rounded-full border border-fast-neon/30 bg-fast-black/40">
                  <img
                    src={srmistLogo}
                    alt="SRMIST"
                    className="h-10 w-10 object-contain"
                    onError={(event) => {
                      event.currentTarget.style.display = "none";
                      const fallback = event.currentTarget.nextSibling;
                      if (fallback) fallback.style.display = "flex";
                    }}
                  />
                  <span className="hidden text-[0.6rem] uppercase tracking-[0.2em] text-fast-mist">
                    SRMIST
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
        )}

        {route === "contact" && (
        <section id="contact" className="section-wrap">
          <div className="mx-auto w-[92%] max-w-6xl">
            <SectionHeading
              eyebrow="Reach Out"
              title="Connect with FAST"
              description="For collaborations and updates, reach us on our official social channels."
              center
            />
            <div className="mx-auto mt-10 grid max-w-4xl gap-6 md:grid-cols-2">
              <motion.a
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                href="https://www.linkedin.com/company/fastsrm"
                target="_blank"
                rel="noopener noreferrer"
                className="glass-card rounded-3xl p-6 text-center"
              >
                <p className="text-xs uppercase tracking-[0.4em] text-fast-mist">LinkedIn</p>
                <h3 className="mt-3 font-heading text-2xl text-white">FAST SRM</h3>
                <p className="mt-2 text-sm text-fast-mist">Industry updates and collaborations.</p>
              </motion.a>
              <motion.a
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                href="https://www.instagram.com/fast_srm"
                target="_blank"
                rel="noopener noreferrer"
                className="glass-card rounded-3xl p-6 text-center"
              >
                <p className="text-xs uppercase tracking-[0.4em] text-fast-mist">Instagram</p>
                <h3 className="mt-3 font-heading text-2xl text-white">@fast_srm</h3>
                <p className="mt-2 text-sm text-fast-mist">Club highlights and event drops.</p>
              </motion.a>
            </div>
            <div className="mx-auto mt-6 max-w-lg">
              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
                className="glass-card rounded-2xl p-4 text-center border border-fast-neon/20"
              >
                <p className="text-[0.65rem] uppercase tracking-[0.4em] text-fast-mist mb-1">Official Inquiry</p>
                <a href="mailto:fast@srmist.edu.in" className="text-lg font-heading text-fast-neon hover:text-white transition-colors">
                  fast@srmist.edu.in
                </a>
              </motion.div>
            </div>
          </div>
        </section>
        )}
      </main>

      <footer className="border-t border-fast-neon/10 bg-fast-deep/70 py-10">
        <div className="mx-auto flex w-[92%] max-w-6xl flex-col items-center justify-between gap-6 text-center md:flex-row md:text-left">
          <div className="flex items-center gap-4">
            <img src={fastLogo} alt="FAST logo" className="h-10 logo-glow" />
            <div>
              <h4 className="font-heading text-sm">F.A.S.T</h4>
              <p className="text-xs text-fast-mist">SRM Institute of Science and Technology - Kattankulathur Campus</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-fast-mist">
            {NAV_ITEMS.map((item) => (
              <a key={item.label} href={`#/${item.path}`} className="hover:text-white">
                {item.label}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-4">
            <img src={nvidiaLogo} alt="NVIDIA" className="h-10 logo-glow" />
            <div className="relative flex h-12 w-12 items-center justify-center rounded-full border border-fast-neon/30 bg-fast-black/40">
              <img
                src={srmistLogo}
                alt="SRMIST"
                className="h-9 w-9 object-contain"
                onError={(event) => {
                  event.currentTarget.style.display = "none";
                  const fallback = event.currentTarget.nextSibling;
                  if (fallback) fallback.style.display = "flex";
                }}
              />
              <span className="hidden text-[0.55rem] uppercase tracking-[0.2em] text-fast-mist">
                SRMIST
              </span>
            </div>
          </div>
        </div>
      </footer>

      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            className="fixed inset-0 z-[999999] flex justify-end bg-black/98 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMenuOpen(false)}
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="h-full w-[85%] border-l border-fast-neon/20 bg-[#050505] p-10 text-sm shadow-2xl relative z-[1000000]"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="mb-12 flex items-center justify-between">
                <span className="font-heading text-3xl tracking-[0.5em] text-fast-neon">MENU</span>
                <button 
                  onClick={() => setMenuOpen(false)}
                  className="h-12 w-12 flex items-center justify-center rounded-full border border-fast-neon/20 text-fast-neon bg-fast-neon/5 hover:bg-fast-neon hover:text-black transition-all"
                >
                  <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="3">
                    <path d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="flex flex-col gap-10">
                {NAV_ITEMS.map((item, idx) => (
                  <motion.a
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + idx * 0.08 }}
                    key={item.label}
                    href={`#/${item.path}`}
                    className={`text-2xl font-heading tracking-[0.2em] transition-all hover:pl-4 ${
                      route === item.path ? "text-fast-neon border-l-4 border-fast-neon pl-4" : "text-fast-mist hover:text-white"
                    }`}
                    onClick={() => setMenuOpen(false)}
                  >
                    {item.label}
                  </motion.a>
                ))}
              </div>
              
              <div className="absolute bottom-16 left-0 right-0 flex flex-col items-center gap-4 text-center">
                <div className="h-px w-32 bg-fast-neon/20" />
                <p className="text-[0.6rem] uppercase tracking-[0.8em] text-fast-neon/30">
                  ESTD 2024
                </p>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
};

export default App;
