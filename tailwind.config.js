/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        vote: 'vote 1s ease-in-out',
      },
      keyframes: {
        vote: {
          '0%': {
            transform: 'translateY(-45%)',
            easing: 'cubic-bezier(0.8, 0, 1, 1)',
          }
          
        },
      },
    },
  },
  plugins: [],
};
