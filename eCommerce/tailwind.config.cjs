/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'color-primary': '#fb7185',
        'color-secundary': '#f43f5e',
        'color-custom-bg': '#ffe4e6'
      }
    }
  },
  plugins: [],
}