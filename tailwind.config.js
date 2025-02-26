/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      animation: {
        spotlight: "spotlight 2s ease .75s 1 forwards",
      },
      keyframes: {
        spotlight: {
          "0%": {
            opacity: 0,
            transform: "translate(-72%, -62%) rotate(0deg)",
          },
          "100%": {
            opacity: 1,
            transform: "translate(-50%,-40%) rotate(0deg)",
          },
        },
      },
    },
  },
  plugins: [],
};
