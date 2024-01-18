/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          light: "#e6e3de",
          DEFAULT: "#e6e3de",
          dark: "#252525",
        },
        secondary: {
          light: "#252525",
          DEFAULT: "#252525",
          dark: "#e6e3de",
        },
      },
    },
  },
  plugins: [],
};
