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

        Poppins :["Poppins","sans serif"],


        manrope: ["manrope", "sans serif"],
      },
      images: {
        domains: ["inventory-backend-sqbj.onrender.com"],
      },
      colors: {
        black: {
          10: "#16151C",
        },
        blue: {
          10: "#006EC4",
        },
        customGray: "#687588",
        tableBorder: "rgba(173, 177, 179, 0.5)",
      },
      backgroundColor: {
        sidebarBackground: "rgba(0, 110, 196, 0.2)",
        activeLinkBackground: "rgba(0, 110, 196, 0.05)",
      },
      dropShadow: {
        tableShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
      },
    },
  },
  plugins: [],
} satisfies Config;
