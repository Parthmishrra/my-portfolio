import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: { lime: "#b7ff45", obsidian: "#080808" },
      boxShadow: { glow: "0 0 0 1px rgba(255,255,255,.08), 0 30px 80px rgba(0,0,0,.45)" }
    }
  },
  plugins: []
};

export default config;
