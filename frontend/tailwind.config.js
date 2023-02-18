/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      white: "#FFFFFF",
      black: "#404040",
      green: "#428346",
    },
    extend: {
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
      },
    },
  },
  plugins: [],
};
