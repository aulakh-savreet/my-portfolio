/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // Enable dark mode with the 'class' strategy
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          light: '#4f46e5', // Indigo
          DEFAULT: 'var(--primary-color)',
          dark: '#3730a3', // Indigo dark
        },
        secondary: {
          light: '#f59e0b', // Amber
          DEFAULT: 'var(--secondary-color)',
          dark: '#b45309', // Amber dark
        },
        accent: {
          light: '#10b981', // Emerald
          DEFAULT: 'var(--accent-color)',
          dark: '#047857', // Emerald dark
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Merriweather', 'serif'],
      },
      // Add other extensions like spacing, borderRadius, etc.
    },
  },
  plugins: [
    require('@tailwindcss/typography'), // For rich text formatting
    require('@tailwindcss/forms'), // For better form styling
    require('@tailwindcss/aspect-ratio'), // To maintain aspect ratios
    // Add more plugins as needed
  ],
};
