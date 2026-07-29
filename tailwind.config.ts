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
        page: "#FBF7F2",
        section: "#F5EFE6",
        card: "#FFFFFF",
        border: "#EDE6DC",
        accent: {
          DEFAULT: "#C4724A",
          hover: "#E8A87C",
          violet: "#8F7B9E",
          sage: "#7A9E8A",
        },
        heading: "#2C2420",
        body: "#5C4A3A",
        muted: "#8C7B6B",
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Playfair Display", "Georgia", "serif"],
        sans: ["var(--font-sans)", "Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
