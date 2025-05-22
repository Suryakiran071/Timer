/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {animation: {
    'blink-red-black': 'blinkRedBlack 1s infinite',
  },
  keyframes: {
    blinkRedBlack: {
      '0%, 100%': { backgroundColor: '#000000' },
      '50%': { backgroundColor: '#dc2626' }, // Tailwind's red-600
    },
  },},
  },
  plugins: [],
}
