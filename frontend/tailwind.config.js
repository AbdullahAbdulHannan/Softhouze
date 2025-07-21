/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'softhouze-red': '#E53935',
        'softhouze-blue': '#90A4AE',
        'softhouze-black': '#000000',
      },
      keyframes: {
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        'scale-in': {
          '0%': {
            opacity: '0',
            transform: 'scale(0.9) translateY(20px)',
          },
          '100%': {
            opacity: '1',
            transform: 'scale(1) translateY(0)',
          },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.3s ease-out',
        'scale-in': 'scale-in 0.5s ease-out',
      },
    },
  },
  darkMode: 'class',
  plugins: [],
};
