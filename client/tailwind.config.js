/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'laptop': { 'raw': '(min-width: 1024px)' },
        'tablet': { 'raw': '(min-width: 768px) and (max-width: 1023px)' },
        'mobile': { 'raw': '(max-width: 767px)' }
      },
      colors: {
        'purple-custom-light': '#E0BBE4',
        'pink-custom-light': '#FFC0CB',
        'blue-custom-light': '#ADD8E6',
        'yellow-custom-light': '#FFFACD',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}