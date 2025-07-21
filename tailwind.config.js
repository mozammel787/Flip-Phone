/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [{
      light: {
        ...require("daisyui/src/colors/themes")["[data-theme=light]"],
        primary: "#2563EB",
        secondary: "#059669",
        accent: "#9333EA",
      },
    }],
  },
}
