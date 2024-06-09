/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        horizon: ['Horizon', 'sans-serif'],
        circular: ['CircularXXWeb-Book', 'sans-serif'],
      },
      keyframes: {
        levitate: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      animation: {
        levitate: 'levitate 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}

