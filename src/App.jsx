import { motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";

const fastLogo = "/assets/fast-logo.png";
const nvidiaLogo = "/assets/nvidia-logo.png";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const NAV_ITEMS = [
  { label: "Home", path: "home" },
  { label: "About", path: "about" },
  { label: "Domains", path: "domains" },
  { label: "Events", path: "events" },
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

const Snowfall = () => {
  const canvasRef = useRef(null);
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.innerWidth < 768;
    if (prefersReduced || isMobile) {
      setEnabled(false);
      return undefined;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let width = 0;
    let height = 0;
    let particles = [];
    let animationId = null;
    const reducedMotion = prefersReduced;

    const createParticle = () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 1.6 + 0.6,
      vy: Math.random() * 0.6 + 0.2,
      vx: Math.random() * 0.3 - 0.15,
      alpha: Math.random() * 0.6 + 0.2,
    });

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const baseCount = Math.round((width * height) / 32000);
      const count = reducedMotion ? 18 : Math.max(30, Math.min(110, baseCount));
      particles = Array.from({ length: count }, createParticle);
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.shadowColor = "rgba(255, 255, 255, 0.6)";
      ctx.shadowBlur = 8;
      ctx.globalCompositeOperation = "lighter";

      particles.forEach((p) => {
        ctx.beginPath();
        ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha})`;
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();

        p.y += p.vy;
        p.x += p.vx;

        if (p.y > height + 10) {
          p.y = -10;
          p.x = Math.random() * width;
        }
        if (p.x > width + 10) p.x = -10;
        if (p.x < -10) p.x = width + 10;
      });

      if (!reducedMotion) {
        animationId = requestAnimationFrame(draw);
      }
    };

    resize();
    window.addEventListener("resize", resize);
    draw();

    return () => {
      window.removeEventListener("resize", resize);
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, []);

  if (!enabled) return null;
  return <canvas id="snow-canvas" ref={canvasRef} aria-hidden="true" />;
};

const Preloader = ({ visible }) => (
  <div id="preloader" className={visible ? "" : "hidden"} aria-hidden={!visible}>
    <div className="relative grid place-items-center gap-3">
      <div className="h-24 w-24 rounded-full border-2 border-fast-neon/20 border-t-fast-neon animate-spin" />
      <img src={fastLogo} alt="FAST logo" className="logo-glow h-14 w-14 absolute" />
      <span className="font-heading text-xs tracking-[0.4em] text-fast-neon">INITIALIZING</span>
    </div>
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
      type: "Workshop",
      tag: "Workshop",
      title: "NVIDIA DLI Workshop",
      meta: "SRMIST Kattankulathur",
      date: "Coming Soon",
      desc: "Official NVIDIA Deep Learning Institute hands-on workshop with certified training.",
      status: "Coming Soon",
      icon: "CAL",
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
    },
    {
      type: "Hackathon",
      tag: "Hackathon",
      title: "Fastathon",
      meta: "SRM Main Auditorium",
      date: "Coming Soon",
      desc: "FAST's flagship hackathon - 24 hours of innovation, GPU challenges, and prizes.",
      status: "Coming Soon",
      icon: "IDE",
    },
  ];

  const eventFilters = ["All", "Workshop", "Bootcamp", "Hackathon"];

  const filteredEvents = useMemo(
    () => (eventFilter === "All" ? events : events.filter((event) => event.type === eventFilter)),
    [eventFilter, events]
  );

  const eventTimeline = [
    {
      title: "Season Kickoff",
      date: "Coming Soon",
      desc: "Details will be announced soon.",
      gradient: "from-fast-nvidia/90 to-fast-emerald/90",
    },
    {
      title: "AI Bootcamp",
      date: "Coming Soon",
      desc: "Details will be announced soon.",
      gradient: "from-fast-cyan/90 to-fast-blue/90",
    },
    {
      title: "Fastathon",
      date: "Coming Soon",
      desc: "Details will be announced soon.",
      gradient: "from-fast-purple/90 to-fast-magenta/90",
    },
  ];

  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [contactStatus, setContactStatus] = useState("");


  const apiBase = (import.meta.env.VITE_API_BASE || "").replace(/\/$/, "");
  const buildApiUrl = (path) => (apiBase ? `${apiBase}${path}` : path);

  const sendApiRequest = async (path, payload) => {
    const response = await fetch(buildApiUrl(path), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!response.ok) {
      throw new Error(`Request failed (${response.status})`);
    }
    return response.json();
  };

  const handleContactSubmit = async () => {
    if (!contactForm.name || !contactForm.email || !contactForm.message) {
      setContactStatus("Please fill in name, email, and message.");
      return;
    }
    setContactStatus("Sending...");
    try {
      await sendApiRequest("/api/contact", contactForm);
      setContactStatus("Message sent. We'll get back soon.");
      setContactForm({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      setContactStatus("Backend offline. Start the server to send messages.");
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
      <Snowfall />

      <header
        className={`fixed top-0 z-30 w-full border-b transition-all ${
          scrolled ? "border-fast-neon/20 bg-fast-deep/80 backdrop-blur-xl" : "border-transparent bg-fast-black/30"
        }`}
      >
        <div className="mx-auto flex w-[92%] max-w-6xl items-center justify-between py-4">
          <a href="#/home" className="flex items-center gap-3">
            <img src={fastLogo} alt="FAST logo" className="h-16 w-auto logo-glow logo-glow-hover" />
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
              className="flex h-10 w-10 items-center justify-center rounded-full border border-fast-neon/30 bg-fast-deep/70 md:hidden"
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-label="Toggle navigation"
            >
              <div className="flex flex-col gap-1">
                <span className="h-0.5 w-5 bg-fast-neon" />
                <span className="h-0.5 w-5 bg-fast-neon" />
                <span className="h-0.5 w-5 bg-fast-neon" />
              </div>
            </button>
          </div>
        </div>
        {menuOpen ? (
          <div className="md:hidden">
            <div className="mx-auto w-[92%] max-w-6xl rounded-2xl border border-fast-neon/20 bg-fast-deep/95 p-6 text-sm shadow-deep">
              <div className="flex flex-col gap-4">
                {NAV_ITEMS.map((item) => (
                  <a
                    key={item.label}
                    href={`#/${item.path}`}
                    className={`transition ${
                      route === item.path ? "text-white" : "text-fast-mist hover:text-white"
                    }`}
                    onClick={() => setMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        ) : null}
      </header>

      <main className="relative z-10">
        {route === "home" && (
        <section id="home" className="section-wrap grid-bg pt-32">
          <div className="absolute inset-0 bg-gradient-to-b from-fast-black/40 via-fast-black/70 to-fast-black/95" />
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
                  AI. GPU. Accelerate.
                </p>
              </div>
              <p className="max-w-xl text-fast-mist">
                Building the future of Artificial Intelligence, GPU Computing, and Systems Innovation at SRMIST
                Kattankulathur.
              </p>
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
              <div className="glass-card rounded-3xl p-6 text-center">
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
              title="Upcoming Events"
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
                  <div className="border-b border-fast-neon/15 bg-gradient-to-br from-fast-slate/90 via-fast-black/80 to-fast-black/80 p-6">
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
                    <div className="mt-6 flex flex-wrap gap-3">
                      <button
                        type="button"
                        className="rounded-full border border-fast-neon/30 bg-fast-deep/70 px-4 py-2 text-xs font-semibold text-fast-mist ripple-btn"
                        onClick={handleRipple}
                      >
                        Add to Calendar
                      </button>
                      <button
                        type="button"
                        className="rounded-full bg-fast-cyan px-4 py-2 text-xs font-semibold text-fast-black ripple-btn"
                        onClick={handleRipple}
                      >
                        Learn More
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="mt-12">
              <h3 className="text-center font-heading text-2xl text-fast-cyan">Event Timeline</h3>
              <div className="relative mt-10 grid gap-6 lg:grid-cols-2">
                <div className="absolute left-1/2 hidden h-full w-px -translate-x-1/2 bg-fast-cyan/40 lg:block" />
                {eventTimeline.map((item, index) => (
                  <motion.div
                    key={item.title}
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className={`relative overflow-hidden rounded-3xl border border-fast-neon/20 bg-gradient-to-r ${item.gradient} p-6 text-white shadow-deep lg:${
                      index % 2 === 0 ? "mr-12" : "ml-12"
                    }`}
                  >
                    <span
                      className={`absolute top-1/2 hidden h-4 w-4 -translate-y-1/2 rounded-full border-2 border-fast-cyan bg-fast-black lg:block ${
                        index % 2 === 0 ? "-right-10" : "-left-10"
                      }`}
                    />
                    <div className="flex items-center justify-between">
                      <h4 className="font-heading text-lg">{item.title}</h4>
                      <span className="text-xs uppercase tracking-[0.2em] text-white/80">{item.date}</span>
                    </div>
                    <p className="mt-3 text-sm text-white/80">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
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
              description="Initialize a conversation with FAST. Submit a query or contact the leadership team for collaborations."
              center
            />
            <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="glass-card rounded-3xl p-6"
              >
                <h3 className="font-heading text-lg text-fast-cyan">Initialize Connection</h3>
                <div className="mt-6 rounded-2xl border border-fast-neon/20 bg-fast-black/40 p-4 font-mono text-sm text-fast-mist">
                  <div className="mb-3">const userDetails = {"{"}</div>
                  <div className="ml-4 flex flex-col gap-3">
                    <label className="flex flex-wrap items-center gap-2">
                      <span className="text-fast-cyan">name:</span>
                      <input
                        type="text"
                        placeholder="type your name..."
                        value={contactForm.name}
                        onChange={(event) =>
                          setContactForm((prev) => ({ ...prev, name: event.target.value }))
                        }
                        className="flex-1 bg-transparent outline-none placeholder-fast-mist"
                      />
                    </label>
                    <label className="flex flex-wrap items-center gap-2">
                      <span className="text-fast-cyan">email:</span>
                      <input
                        type="email"
                        placeholder="enter your email..."
                        value={contactForm.email}
                        onChange={(event) =>
                          setContactForm((prev) => ({ ...prev, email: event.target.value }))
                        }
                        className="flex-1 bg-transparent outline-none placeholder-fast-mist"
                      />
                    </label>
                    <label className="flex flex-wrap items-center gap-2">
                      <span className="text-fast-cyan">subject:</span>
                      <input
                        type="text"
                        placeholder="query subject..."
                        value={contactForm.subject}
                        onChange={(event) =>
                          setContactForm((prev) => ({ ...prev, subject: event.target.value }))
                        }
                        className="flex-1 bg-transparent outline-none placeholder-fast-mist"
                      />
                    </label>
                    <label className="flex flex-wrap items-start gap-2">
                      <span className="text-fast-cyan">message:</span>
                      <textarea
                        rows="3"
                        placeholder="type your message..."
                        value={contactForm.message}
                        onChange={(event) =>
                          setContactForm((prev) => ({ ...prev, message: event.target.value }))
                        }
                        className="flex-1 bg-transparent outline-none placeholder-fast-mist"
                      />
                    </label>
                  </div>
                  <div className="mt-3">{"}"}</div>
                </div>
                <button
                  type="button"
                  className="mt-6 w-full rounded-full bg-gradient-to-r from-fast-nvidia to-fast-neon px-4 py-3 text-xs font-semibold text-fast-black ripple-btn"
                  onClick={(event) => {
                    handleRipple(event);
                    handleContactSubmit();
                  }}
                >
                  FAST.sendMessage(userDetails)
                </button>
                {contactStatus ? <p className="mt-3 text-xs text-fast-mist">{contactStatus}</p> : null}
              </motion.div>

              <div className="grid gap-6">
                {[
                  {
                    title: "Base Location",
                    lines: [
                      "F.A.S.T - SRMIST Kattankulathur",
                      "SRM Institute of Science and Technology",
                      "Chennai, Tamil Nadu",
                    ],
                  },
                  {
                    title: "Contact Database",
                    lines: ["fast@srmist.edu.in", "Leadership: FAST Corporate Team"],
                  },
                  {
                    title: "Social Network",
                    lines: ["Instagram: @fast_srm", "LinkedIn: FAST SRM", "Discord: Coming Soon"],
                  },
                ].map((card) => (
                  <motion.div
                    key={card.title}
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="glass-card rounded-3xl p-6"
                  >
                    <h4 className="font-heading text-base text-fast-cyan">{card.title}</h4>
                    <ul className="mt-3 space-y-2 text-sm text-fast-mist">
                      {card.lines.map((line) => (
                        <li key={line}>{line}</li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
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
          <div className="flex items-center gap-3">
            <img src={nvidiaLogo} alt="NVIDIA" className="h-10 logo-glow" />
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




