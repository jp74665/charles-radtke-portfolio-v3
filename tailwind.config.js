/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#FFFFFF',
        ivory: '#EDE8C4',
        terracotta: '#E35336',
        ink: '#0A0A0A',
        textPrimary: '#0A0A0A',
        rule: '#D4D4D4',
        textMuted: '#6B6B6B',
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'serif'],
        garamond: ['"Cormorant Garamond"', 'serif'],
        sans: ['"Inter"', 'sans-serif'],
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      }
    },
  },
  plugins: [],
}
