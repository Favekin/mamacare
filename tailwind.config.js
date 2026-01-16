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
      backgroundImage: {
        'primary-pattern': "url('/path/to/primary/image.jpg')", 
        'secondary-texture': "url('/path/to/secondary/image.png')",
        'hero-gradient': 'linear-gradient(to right, #3b0086, #b43e8f)',
      }
    },
  },
  plugins: [],
};