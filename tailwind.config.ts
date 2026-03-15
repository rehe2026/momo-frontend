import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        momo: {
          50: "#FFF7F5",
          100: "#FFEDE8",
          200: "#FFD6CC",
          300: "#FFB8A8",
          400: "#FF9580",
          500: "#E8705A",
          600: "#D45A44",
          700: "#B84535",
          800: "#8C3429",
          900: "#6B2820",
        },
        slate: {
          50: "#F8F9FB",
          100: "#F1F3F6",
          200: "#E2E6EC",
          300: "#C8CDD8",
          400: "#9BA3B5",
          500: "#6B7486",
          600: "#4A5568",
          700: "#374151",
          800: "#1F2937",
          900: "#191D27",
          950: "#12151C",
        },
        warm: {
          50: "#FFFCFA",
          100: "#FFF8F3",
          200: "#FFEFD9",
          300: "#FFE2BE",
        },
        sage: {
          50: "#F2F7F4",
          100: "#DCE9E0",
          200: "#B8D4C0",
          300: "#8BBD98",
          400: "#5FA36E",
          500: "#3D8A50",
        },
      },
      fontFamily: {
        display: ['"Playfair Display"', "serif"],
        body: ['"Nunito Sans"', "sans-serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out forwards",
        "fade-in-up": "fadeInUp 0.6s ease-out forwards",
        "slide-in": "slideIn 0.4s ease-out forwards",
        "pulse-soft": "pulseSoft 2s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideIn: {
          "0%": { opacity: "0", transform: "translateX(-12px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.6" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
