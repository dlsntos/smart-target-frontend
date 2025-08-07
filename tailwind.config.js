/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        'scroll-horizontal': {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'scroll-vertical': {
          '0%': { transform: 'translateY(0%)' },
          '100%': { transform: 'translateY(-100%)' },
        },
      },
      animation: {
        'scroll-horizontal': 'scroll-horizontal 20s linear infinite',
        'scroll-vertical': 'scroll-vertical 1s linear infinite',
      },
    },
  },
  plugins: [],
}

