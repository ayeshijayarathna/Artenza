import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: "#1C1917",
        charcoal: "#292524",
        "warm-gray": "#44403C",
        gold: "#C9A96E",
        linen: "#F5F0E8",
        sage: "#A8B5A2",
        terracotta: "#B5846A",
        "dusty-rose": "#C4A8B0",
        "slate-teal": "#7A8C8A",
        "peach-mist": "#E8C4B0",
        bg: {
          primary: "var(--bg-primary)",
          card: "var(--bg-card)",
        },
        text: {
          primary: "var(--text-primary)",
          muted: "var(--text-muted)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          warm: "var(--accent-warm)",
        },
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
