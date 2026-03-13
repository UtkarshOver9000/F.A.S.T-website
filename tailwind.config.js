/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        fast: {
          black: "#0A0A0A",
          deep: "#081F1A",
          emerald: "#0B3D2E",
          neon: "#22FF88",
          glow: "#00FFA6",
          nvidia: "#76B900",
          cyan: "#27D3FF",
          blue: "#1C8CFF",
          slate: "#0D1726",
          purple: "#9B5CFF",
          magenta: "#D14DFF",
          mist: "#A0A0A0",
        },
      },
      fontFamily: {
        heading: ["Cinzel", "Sora", "sans-serif"],
        body: ["Manrope", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 24px rgba(0, 255, 166, 0.4)",
        deep: "0 24px 60px rgba(0, 0, 0, 0.45)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        drift: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-80px)" },
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 18px rgba(0, 255, 166, 0.35)" },
          "50%": { boxShadow: "0 0 30px rgba(0, 255, 166, 0.6)" },
        },
        spinSlow: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        drift: "drift 18s linear infinite",
        pulseGlow: "pulseGlow 3s ease-in-out infinite",
        spinSlow: "spinSlow 18s linear infinite",
      },
    },
  },
  plugins: [],
};

