/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0a0e15",
        surface: "#121926",
        raised: "#182131",
        line: "#232e40",
        text: "#e5eaf1",
        muted: "#8a97a8",
        accent: "#e0913c",
        accentDim: "#8a5f2c",
        ok: "#56b08c",
      },
      fontFamily: {
        display: ['"Space Grotesk"', "system-ui", "sans-serif"],
        body: ['"IBM Plex Sans"', "system-ui", "sans-serif"],
        mono: ['"JetBrains Mono"', "ui-monospace", "monospace"],
      },
      backgroundImage: {
        grid: "linear-gradient(to right, rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.035) 1px, transparent 1px)",
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(224,145,60,0.25), 0 8px 30px -8px rgba(224,145,60,0.35)",
        card: "0 1px 0 rgba(255,255,255,0.03) inset, 0 20px 40px -24px rgba(0,0,0,0.6)",
      },
    },
  },
  plugins: [],
};
