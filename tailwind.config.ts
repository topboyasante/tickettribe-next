import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "bg-light":"#edf6f9",
        "bg-dark":"#0a0a0a",
        "primary-light": "#eb5e28",
        "primary-dark": "#a2e771",
      },
    },
  },
  plugins: [require('tailwind-scrollbar-hide')],
  darkMode: "class",
};
export default config;
