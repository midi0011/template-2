/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#081A51',
        'secondary': 'rgba(255,255,255,0.17)',
      }
    },
  },
  plugins: [],
}

