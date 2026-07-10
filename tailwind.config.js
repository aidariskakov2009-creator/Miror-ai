/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#0A0D18",
        surface: "#12162A",
        surface2: "#191F3D",
        line: "rgba(255,255,255,0.09)",
        linestrong: "rgba(255,255,255,0.16)",
        ink: "#EEF1FF",
        muted: "#8F97BE",
        dim: "#5C6389",
        blue: "#6E8CFF",
        violet: "#C08CFF",
        teal: "#45D9C0",
        coral: "#FF8F6B",
      },
      fontFamily: {
        display: ["'Space Grotesk'", "sans-serif"],
        body: ["Inter", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      keyframes: {
        fadeIn: {
          from: { opacity: "0", transform: "translateY(6px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        fadeIn: "fadeIn 0.4s ease",
      },
    },
  },
  plugins: [],
};
