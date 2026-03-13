import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

const fastLogo = "/assets/fast-logo.png";
const nvidiaLogo = "/assets/nvidia-logo.png";
const srmistLogo = "/assets/srmist-logo.png";

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
  { label: "Projects", path: "projects" },
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
  <div className="h-11 w-11 rounded-2xl border border-fast-cyan/40 bg-fast-black/40 flex items-center justify-center text-[0.6rem] font-heading text-fast-cyan">
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

  const aboutCards = [
    {
      title: "Who are we?",
      desc: "FAST is SRMIST's futuristic AI society focused on GPU computing, systems engineering, and AI innovation.",
      icon: "WHO",
    },
    {
      title: "Our Mission",
      desc: "Enable students to build, research, and ship AI systems through hands-on workshops and open collaboration.",
      icon: "MIS",
    },
    {
      title: "Our Vision",
      desc: "Create a next-gen community that leads AI breakthroughs in academia and industry.",
      icon: "VIS",
    },
  ];

  const domains = [
    {
      title: "Artificial Intelligence",
      desc: "Neural networks, deep learning, and intelligent systems.",
      icon: "AI",
    },
    {
      title: "Machine Learning",
      desc: "Data-driven models, predictive analytics, and ML pipelines.",
      icon: "ML",
    },
    {
      title: "High Performance Computing",
      desc: "CUDA, GPU acceleration, and parallel computation at scale.",
      icon: "HPC",
    },
    {
      title: "Web Development",
      desc: "Modern frameworks, full-stack apps, and developer tools.",
      icon: "WEB",
    },
    {
      title: "Systems Programming",
      desc: "OS internals, compilers, and low-level engineering.",
      icon: "C++",
    },
    {
      title: "Creatives",
      desc: "Visual design, content creation, branding, and social media.",
      icon: "ART",
      highlight: true,
    },
  ];

  const events = [
    {
      type: "Hackathon",
      tag: "Hackathon",
      title: "Fastathon",
      meta: "Tech Park 2, Room 712",
      date: "24-25 March 2026 • 9:00 AM",
      desc: "24-hour NVIDIA-powered hackathon. Earn NVIDIA DLI certificates each round with refreshments provided.",
      status: "Coming Soon",
      icon: "IDE",
      image: "Fastathon Poster",
      poster: "/assets/fastathon-poster.png",
      details: ["Prize Pool: ₹60,000 + ₹3,00,000 NVIDIA Credits", "Register before March 19", "24-hour format"],
      calendar: {
        start: "20260324T090000",
        end: "20260325T090000",
        location: "Tech Park 2, Room 712, SRMIST",
      },
      learnMore: "/assets/fastathon-poster.png",
    },
    {
      type: "Workshop",
      tag: "Workshop",
      title: "NVIDIA DLI Workshop",
      meta: "SRMIST Kattankulathur",
      date: "Coming Soon",
      desc: "Official NVIDIA Deep Learning Institute hands-on workshop with certified training.",
      status: "Coming Soon",
      icon: "CAL",
      image: "Workshop Visual",
      learnMore: "#/contact",
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

  const galleryItems = [
    { title: "AI Lab Moments", caption: "Gallery drop - TBA" },
    { title: "FAST Workshops", caption: "Coming soon" },
    { title: "Fastathon Highlights", caption: "Coming soon" },
    { title: "GPU Sessions", caption: "Coming soon" },
    { title: "Team Sprints", caption: "Coming soon" },
    { title: "Campus Collabs", caption: "Coming soon" },
  ];

  const eventFilters = ["All", "Workshop", "Bootcamp", "Hackathon"];

  const filteredEvents = useMemo(
    () => (eventFilter === "All" ? events : events.filter((event) => event.type === eventFilter)),
    [eventFilter, events]
  );

  const [contactForm, setContactForm] = useState({ name: "", email: "", message: "" });
  const [contactStatus, setContactStatus] = useState("");
  const [eventNotice, setEventNotice] = useState({});
  const [galleryStatus, setGalleryStatus] = useState("");
  const apiBase = (import.meta.env.VITE_API_BASE || "").replace(/\/$/, "");
  const contactUrl = apiBase ? `${apiBase}/api/contact` : "/api/contact";

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

  const handleGalleryClick = (item) => {
    setGalleryStatus(`${item.title} - media drop coming soon.`);
  };

  const handleContactSubmit = async (event) => {
    event.preventDefault();
    if (!contactForm.name || !contactForm.email || !contactForm.message) {
      setContactStatus("Please fill in all fields.");
      return;
    }
    setContactStatus("Sending...");
    try {
      const response = await fetch(contactUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contactForm),
      });
      if (!response.ok) throw new Error("Failed");
      setContactStatus("Submitted. We'll get back soon.");
      setContactForm({ name: "", email: "", message: "" });
    } catch (error) {
      setContactStatus("Backend offline. Use LinkedIn or Instagram.");
    }
  };

  const placeholderProjects = [
    {
      title: "Projects Launching Soon",
      desc: "Our first wave of AI, GPU, and systems builds is in incubation.",
    },
    {
      title: "Research Pipelines in Progress",
      desc: "Teams are building showcase-ready demos for the NVIDIA ecosystem.",
    },
    {
      title: "Open Source Repos (Coming Soon)",
      desc: "GitHub will go live after our first internal release cycle.",
    },
  ];

  const teamGroups = [
    {
      title: "Founders",
      members: [
        {
          name: "Adwaith P V",
          role: "Co-Founder",
          initials: "AV",
          image: "adwaith-pv.jpg",
          linkedin: "https://www.linkedin.com/in/adwaithpv/",
        },
        {
          name: "Rohan Ganesh",
          role: "Co-Founder",
          initials: "RG",
          image: "rohan-ganesh.jpg",
          linkedin: "https://www.linkedin.com/in/rohan-ganesh2306/",
        },
      ],
    },
    {
      title: "Department Leads",
      members: [
        {
          name: "Vasist Acharya",
          role: "Technical Head",
          initials: "VA",
          image: "vasist-acharya.jpg",
          linkedin: "https://www.linkedin.com/in/vasistacharya/",
        },
        {
          name: "Aron Jolly",
          role: "Sponsor Manager",
          initials: "AJ",
          image: "aron-jolly.jpg",
          linkedin: "https://www.linkedin.com/in/aron-jolly-067461276/",
        },
        {
          name: "Anushka Gupta",
          role: "Creatives Head",
          initials: "AG",
          image: "anushka-gupta.jpg",
          linkedin: "https://www.linkedin.com/in/anushka-gupta04/",
        },
        {
          name: "Aditya Cherabolu",
          role: "People Management Head",
          initials: "AC",
          image: "aditya-chebrolu.jpg",
          linkedin: "https://www.linkedin.com/in/aditya-chebrolu-5a0321277/",
        },
      ],
    },
  ];

  const corporateLeads = teamGroups.flatMap((group) => group.members);

  return (
    <div className="relative overflow-hidden">
      <Preloader visible={loading} />

      <header
        className={`fixed top-0 z-30 w-full border-b transition-all ${
          scrolled ? "border-fast-neon/20 bg-fast-deep/80 backdrop-blur-xl" : "border-transparent bg-fast-black/30"
        }`}
      >
        <div className="mx-auto flex w-[92%] max-w-6xl items-center justify-between py-4">
          <a href="#/home" className="flex items-center gap-3">
            <span className="font-heading text-xl tracking-[0.35em] text-fast-neon">F.A.S.T</span>
          </a>
          <nav className="hidden items-center gap-6 text-sm md:flex">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.label}
                href={`#/${item.path}`}
                className={`transition ${
                  route === item.path ? "text-white" : "text-fast-mist hover:text-white"
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <div className="hidden items-center gap-2 rounded-full border border-fast-nvidia/40 bg-fast-black/40 px-3 py-1 text-[0.65rem] uppercase tracking-[0.3em] text-fast-nvidia md:flex">
              <img src={nvidiaLogo} alt="NVIDIA" className="h-7 w-auto" />
              NVIDIA Partner
            </div>
            <a
              href="#/contact"
              className="hidden rounded-full bg-gradient-to-r from-fast-nvidia to-fast-neon px-5 py-2 text-sm font-semibold text-fast-black shadow-glow transition hover:-translate-y-0.5 md:inline-flex ripple-btn"
              onClick={handleRipple}
            >
              JOIN FAST
            </a>
            <button
              type="button"
              className="relative flex h-10 w-10 items-center justify-center rounded-full border border-fast-neon/30 bg-fast-deep/70 md:hidden"
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-label="Toggle navigation"
            >
              <span className="absolute h-8 w-8 rounded-full border border-fast-neon/50" />
              <span className="absolute h-2 w-2 rounded-full bg-fast-neon shadow-glow" />
            </button>
          </div>
        </div>
        <AnimatePresence>
          {menuOpen ? (
            <motion.div
              className="fixed inset-0 z-40 flex items-center justify-center bg-fast-black/80 backdrop-blur-sm md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="relative h-72 w-72 rounded-full border border-fast-neon/30 bg-fast-deep/70 shadow-deep"
                initial={{ scale: 0.8, rotate: -20, opacity: 0 }}
                animate={{ scale: 1, rotate: 0, opacity: 1 }}
                exit={{ scale: 0.85, opacity: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <button
                  type="button"
                  className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-fast-neon/40 bg-fast-black text-xs text-fast-neon"
                  onClick={() => setMenuOpen(false)}
                >
                  CLOSE
                </button>
                {NAV_ITEMS.map((item, index) => {
                  const angle = (360 / NAV_ITEMS.length) * index - 90;
                  const rad = (Math.PI / 180) * angle;
                  const radius = 118;
                  const x = Math.cos(rad) * radius;
                  const y = Math.sin(rad) * radius;
                  return (
                    <motion.a
                      key={item.label}
                      href={`#/${item.path}`}
                      className={`absolute left-1/2 top-1/2 rounded-full border border-fast-neon/30 bg-fast-black/80 px-3 py-2 text-[0.7rem] uppercase tracking-[0.22em] ${
                        route === item.path ? "text-white" : "text-fast-mist"
                      }`}
                      style={{ transform: `translate(-50%, -50%) translate(${x}px, ${y}px)` }}
                      initial={{ opacity: 0, scale: 0.6 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.05 * index }}
                      onClick={() => setMenuOpen(false)}
                    >
                      {item.label}
                    </motion.a>
                  );
                })}
              </motion.div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </header>

      <main className="relative z-10">
        {route === "home" && (
        <section id="home" className="section-wrap grid-bg pt-32">
          <div className="absolute inset-0 bg-gradient-to-b from-fast-black/40 via-fast-black/70 to-fast-black/95" />
          <div className="absolute -right-24 top-24 h-72 w-72 rounded-full spiral-bg opacity-45" />
          <div className="absolute -left-20 bottom-16 h-56 w-56 rounded-full spiral-bg opacity-30" />
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
              <div>
                <h1 className="text-gradient text-shadow">
                  <img
                    src={fastLogo}
                    alt="FAST logo"
                    className="h-20 w-auto scale-x-110 origin-left md:h-24 logo-glow"
                  />
                </h1>
                <p className="mt-2 text-xl font-heading text-fast-neon">Futuristic AI Society of Tech</p>
                <p className="mt-2 text-sm uppercase tracking-[0.35em] text-fast-neon">
                  Compute. Train. Accelerate.
                </p>
              </div>
              <p className="max-w-xl text-fast-mist">
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
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {aboutCards.map((card) => (
                <motion.div
                  key={card.title}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="glass-card rounded-3xl p-6"
                >
                  <IconBadge label={card.icon} />
                  <h3 className="mt-4 font-heading text-lg">{card.title}</h3>
                  <p className="mt-2 text-sm text-fast-mist">{card.desc}</p>
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
              description="Six core areas where we build, learn, and innovate together."
            />
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {domains.map((domain) => (
                <motion.div
                  key={domain.title}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className={`glass-card rounded-3xl p-6 ${domain.highlight ? "border-fast-neon/40" : ""}`}
                >
                  <IconBadge label={domain.icon} />
                  <h3 className="mt-4 font-heading text-lg">{domain.title}</h3>
                  <p className="mt-2 text-sm text-fast-mist">{domain.desc}</p>
                  {domain.highlight ? (
                    <a
                      href="https://www.instagram.com/fast_srm"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex items-center gap-2 rounded-full border border-pink-400/40 bg-pink-500/10 px-4 py-2 text-xs font-semibold text-pink-300"
                    >
                      @fast_srm
                    </a>
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
                    <div className="absolute inset-0 flex items-center justify-center text-xs uppercase tracking-[0.35em] text-fast-mist">
                      {event.poster ? "Fastathon Poster" : `${event.image} - TBA`}
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
                          <li key={detail}>• {detail}</li>
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
              title="FAST Visual Archive"
              description="Snapshots from workshops, labs, and hackathons. Media drops coming soon."
            />
            {galleryStatus ? (
              <p className="mb-6 text-sm text-fast-mist">{galleryStatus}</p>
            ) : null}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {galleryItems.map((item) => (
                <motion.div
                  key={item.title}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="group relative overflow-hidden rounded-3xl border border-fast-neon/20 bg-fast-black/50"
                  role="button"
                  tabIndex={0}
                  onClick={() => handleGalleryClick(item)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") handleGalleryClick(item);
                  }}
                >
                  <div className="h-48 w-full bg-gradient-to-br from-fast-emerald/30 via-fast-black/80 to-fast-black/90" />
                  <div className="absolute inset-0 flex flex-col justify-end p-5">
                    <p className="text-xs uppercase tracking-[0.3em] text-fast-mist">TBA</p>
                    <h3 className="mt-2 font-heading text-lg text-white">{item.title}</h3>
                    <p className="mt-2 text-sm text-fast-mist">{item.caption}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        )}

        {route === "projects" && (
        <section id="projects" className="section-wrap">
          <div className="mx-auto w-[92%] max-w-6xl">
            <SectionHeading
              eyebrow="What We Build"
              title="Student Projects"
              description="Projects are in production. Our GitHub and demos will go live after the first release cycle."
            />
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {placeholderProjects.map((project) => (
                <motion.div
                  key={project.title}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="glass-card rounded-3xl p-6"
                >
                  <div className="flex items-center justify-between text-xs uppercase tracking-[0.2em] text-fast-mist">
                    <span>Coming Soon</span>
                    <span className="text-fast-neon">GitHub TBA</span>
                  </div>
                  <h3 className="mt-4 font-heading text-lg">{project.title}</h3>
                  <p className="mt-2 text-sm text-fast-mist">{project.desc}</p>
                  <div className="mt-6 rounded-full border border-fast-neon/20 bg-fast-deep/70 px-4 py-2 text-center text-xs uppercase tracking-[0.2em] text-fast-mist">
                    Placeholder
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
                      <img
                        src={`/assets/team/${member.image}`}
                        alt={member.name}
                        className="absolute inset-0 h-full w-full object-cover"
                        onError={(event) => {
                          event.currentTarget.style.display = "none";
                        }}
                      />
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
                    $ ./view-profile {member.name.toLowerCase().replace(/\\s+/g, "-")}
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
            <div className="grid gap-6 md:grid-cols-2">
              {[
                {
                  name: "Utkarsh Sharma",
                  linkedin: "https://www.linkedin.com/in/utkarsh-sharma-lm10/",
                },
                {
                  name: "Swetank Kumar",
                  linkedin: "https://www.linkedin.com/in/swetank-kumar-706557249/",
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
                  <div className="mx-auto mb-4 h-14 w-14 rounded-2xl border border-fast-neon/40 bg-fast-emerald/50 text-fast-neon flex items-center justify-center font-heading text-lg">
                    {builder.name
                      .split(" ")
                      .map((part) => part[0])
                      .join("")}
                  </div>
                  <h3 className="font-heading text-lg">{builder.name}</h3>
                  <a
                    href={builder.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center justify-center rounded-full border border-fast-neon/30 bg-fast-deep/70 px-4 py-2 text-[0.7rem] uppercase tracking-[0.2em] text-fast-mist"
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
            <div className="mx-auto mt-10 grid max-w-5xl gap-6 lg:grid-cols-[1.1fr_0.9fr]">
              <motion.form
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                onSubmit={handleContactSubmit}
                className="glass-card rounded-3xl p-6"
              >
                <h3 className="font-heading text-lg text-fast-neon">Send a Query</h3>
                <p className="mt-2 text-sm text-fast-mist">
                  Keep it short. We will respond on your preferred channel.
                </p>
                <div className="mt-6 space-y-4">
                  <input
                    type="text"
                    placeholder="Full name"
                    value={contactForm.name}
                    onChange={(event) =>
                      setContactForm((prev) => ({ ...prev, name: event.target.value }))
                    }
                    className="w-full rounded-xl border border-fast-neon/20 bg-fast-black/40 px-4 py-3 text-sm text-white placeholder-fast-mist focus:outline-none focus:ring-2 focus:ring-fast-neon/40"
                  />
                  <input
                    type="email"
                    placeholder="Email address"
                    value={contactForm.email}
                    onChange={(event) =>
                      setContactForm((prev) => ({ ...prev, email: event.target.value }))
                    }
                    className="w-full rounded-xl border border-fast-neon/20 bg-fast-black/40 px-4 py-3 text-sm text-white placeholder-fast-mist focus:outline-none focus:ring-2 focus:ring-fast-neon/40"
                  />
                  <textarea
                    rows="4"
                    placeholder="Your query"
                    value={contactForm.message}
                    onChange={(event) =>
                      setContactForm((prev) => ({ ...prev, message: event.target.value }))
                    }
                    className="w-full rounded-xl border border-fast-neon/20 bg-fast-black/40 px-4 py-3 text-sm text-white placeholder-fast-mist focus:outline-none focus:ring-2 focus:ring-fast-neon/40"
                  />
                  <button
                    type="submit"
                    className="w-full rounded-full bg-gradient-to-r from-fast-nvidia to-fast-neon px-4 py-3 text-xs font-semibold text-fast-black ripple-btn"
                    onClick={handleRipple}
                  >
                    Submit Query
                  </button>
                </div>
                {contactStatus ? <p className="mt-3 text-xs text-fast-mist">{contactStatus}</p> : null}
                <p className="mt-4 text-xs text-fast-mist">Email: fast@srmist.edu.in</p>
              </motion.form>

              <div className="grid gap-6">
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
        <div className="mt-8 text-center text-xs text-fast-mist">
          (c) 2026 F.A.S.T Club - SRM Institute of Science and Technology
        </div>
      </footer>
    </div>
  );
};

export default App;






