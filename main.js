const nav = document.getElementById("navbar");
const navToggle = document.getElementById("nav-toggle");
const navLinks = document.getElementById("nav-links");
const preloader = document.getElementById("preloader");

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const updateNav = () => {
  if (window.scrollY > 20) {
    nav.classList.add("scrolled");
  } else {
    nav.classList.remove("scrolled");
  }
};

updateNav();
window.addEventListener("scroll", updateNav);

if (navToggle) {
  navToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

if (navLinks) {
  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

const addRipple = (event) => {
  const button = event.currentTarget;
  const circle = document.createElement("span");
  const diameter = Math.max(button.clientWidth, button.clientHeight);
  const radius = diameter / 2;
  circle.style.width = `${diameter}px`;
  circle.style.height = `${diameter}px`;
  circle.style.left = `${event.clientX - button.getBoundingClientRect().left - radius}px`;
  circle.style.top = `${event.clientY - button.getBoundingClientRect().top - radius}px`;
  circle.classList.add("ripple");
  const ripple = button.querySelector(".ripple");
  if (ripple) {
    ripple.remove();
  }
  button.appendChild(circle);
};

document.querySelectorAll(".btn").forEach((btn) => {
  btn.addEventListener("click", addRipple);
});

const reveals = document.querySelectorAll(".reveal");
const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

reveals.forEach((el) => revealObserver.observe(el));

const parallaxEls = document.querySelectorAll("[data-parallax]");
const handleParallax = () => {
  const offset = window.scrollY;
  parallaxEls.forEach((el) => {
    const speed = parseFloat(el.dataset.parallax || "0.2");
    el.style.setProperty("--parallax", `${offset * speed * 0.08}px`);
  });
};

handleParallax();
window.addEventListener("scroll", handleParallax);

const canvas = document.getElementById("snow");
const ctx = canvas.getContext("2d");
let width = 0;
let height = 0;
let particles = [];

const createParticle = () => ({
  x: Math.random() * width,
  y: Math.random() * height,
  r: Math.random() * 1.6 + 0.6,
  vy: Math.random() * 0.5 + 0.2,
  vx: Math.random() * 0.3 - 0.15,
  alpha: Math.random() * 0.6 + 0.2,
});

const resizeCanvas = () => {
  const dpr = window.devicePixelRatio || 1;
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width * dpr;
  canvas.height = height * dpr;
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  const baseCount = Math.round((width * height) / 24000);
  const count = prefersReducedMotion ? 28 : Math.max(40, Math.min(120, baseCount));
  particles = Array.from({ length: count }, createParticle);
};

const animateSnow = () => {
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
    if (p.x > width + 10) {
      p.x = -10;
    }
    if (p.x < -10) {
      p.x = width + 10;
    }
  });

  if (!prefersReducedMotion) {
    requestAnimationFrame(animateSnow);
  }
};

resizeCanvas();
window.addEventListener("resize", resizeCanvas);
animateSnow();

window.addEventListener("load", () => {
  setTimeout(() => {
    preloader.classList.add("hidden");
  }, 600);
});
