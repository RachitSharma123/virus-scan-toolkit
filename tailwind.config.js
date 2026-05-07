/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        blush: '#F8E1E7',
        beige: '#F5F5DC',
        cream: '#FFF8F0',
        rose: '#FADADD',
        lavender: '#E6E6FA',
        primary: '#E7A6B1',
        secondary: '#FCEEF5',
        dark: '#3A3A3A'
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        script: ['"DM Serif Display"', 'serif']
      },
      boxShadow: {
        soft: '0 4px 12px rgba(0, 0, 0, 0.05)'
      }
    }
  },
  plugins: []
};