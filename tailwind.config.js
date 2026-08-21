/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        mavirota: {
          deep: '#0a0f1a',
          ocean: '#0f172a',
          surface: '#141c2e',
          accent: '#38bdf8',
          glow: '#22d3ee',
        },
        brand: {
          50: '#eff8ff',
          100: '#dbeefe',
          200: '#bfe2fe',
          300: '#93cffd',
          400: '#60b3fa',
          500: '#3b95f6',
          600: '#2577eb',
          700: '#1d60d8',
          800: '#1e4faf',
          900: '#1e448a',
          950: '#172b54',
        },
        sea: {
          light: '#e0f2f1',
          DEFAULT: '#0d7377',
          dark: '#0a4d4f',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
