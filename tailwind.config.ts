import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        lexend: ["lexend", "sans serif"],
        Poppins :["Poppins","sans serif"]
      },
      colors: {
        black: {
          10: "#16151C",
        },
        blue: {
          10: "#006EC4",
        },
      },
      backgroundColor: {
        sidebarBackground: "rgba(0, 110, 196, 0.2)",
        activeLinkBackground: "rgba(0, 110, 196, 0.05)",
      },
    },
  },
  plugins: [],
} satisfies Config;
