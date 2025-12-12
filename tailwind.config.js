/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#3b0086",
        secondary: "#b43e8f",
        muted: "#6200b3",
        background: "#ce7ad5",
      },
    },
  },
  plugins: [],
};
