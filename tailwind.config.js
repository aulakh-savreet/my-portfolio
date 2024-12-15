/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',       // For Next.js App directory
    './pages/**/*.{js,jsx,ts,tsx}',     // If using pages directory
    './components/**/*.{js,jsx,ts,tsx}',// All components
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

