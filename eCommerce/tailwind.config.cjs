/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'color-primary': '#3b82f6',
        'color-secundary': '#2563eb',
        'color-custom-bg': '#dbeafe'
      }
    }
  },
  plugins: [],
}