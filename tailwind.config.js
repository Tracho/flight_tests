/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "selector", // В старых версиях Tailwind это могло называться 'class'
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};
