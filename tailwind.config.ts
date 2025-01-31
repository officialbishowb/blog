import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,md}",
    "./src/components/**/*.{js,ts,jsx,tsx,md}",
    "./src/app/**/*.{js,ts,jsx,tsx,md}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        border_radius: "var(--border-radius)",
        gray: "var(--gray)",
        accent: "var(--accent-color)",
        light_gray: "var(--light-gray)",
      },
    },
  },
  plugins: [],
} satisfies Config;
