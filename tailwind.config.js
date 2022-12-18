/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        theme: {
          orange: "#FF9500",
          gray: {
            "xlight": "#DAE0E6",
            "light": "#D0CCC6",
            "medium": "#9D9D9D",
            "dark": "#333743",
            "xdark": "#646464"
          },
          blue: {
            "light": "#3490E6",
            "dark": "#13161F"
          },
          purple: {
            "light": "#0000EE",
            "dark": "#551A8B"
          },
          white: "#FFFFFF",
          black: "#000000"
        },
      },
    },
  },
  plugins: [],
}
