/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        cream: '#f3ece0',
        'cream-deep': '#ecdfca',
        card: '#fbf7ec',
        'card-soft': '#f6ecd9',
        ink: '#2a1f1a',
        'ink-soft': '#5a4a3e',
        mute: '#8a7868',
        line: '#d9c8b0',
        accent: '#b04a4a',
        'accent-soft': '#efd9d2',
        accent2: '#c9954a',
        sage: '#7e8b65',
        blush: '#e8b8b0',
        // legacy aliases
        primary: '#b04a4a',
        secondary: '#f6ecd9',
        dark: '#2a1f1a',
      },
      fontFamily: {
        sans: ['Geist', 'system-ui', 'sans-serif'],
        serif: ['"Instrument Serif"', 'Georgia', 'serif'],
        hand: ['Caveat', 'cursive'],
        mono: ['"Geist Mono"', 'ui-monospace', 'monospace'],
        // legacy
        script: ['"Instrument Serif"', 'Georgia', 'serif'],
      },
      boxShadow: {
        soft: '0 4px 12px rgba(82,55,30,0.08)',
        card: '0 1px 0 #d9c8b0, 0 8px 22px rgba(82,55,30,0.08)',
      },
    },
  },
  plugins: [],
};