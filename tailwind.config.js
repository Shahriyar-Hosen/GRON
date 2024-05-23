/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#ff6600',
        },
        secondary: {
          DEFAULT: '#3ab57b',
        },
        accent: {
          DEFAULT: '#8cc63f',
        },
        bg: {
          DEFAULT: '#7056ffff',
        },
        base: {
          DEFAULT: '#e6e6e6',
        },
      },
    },
  },
  plugins: [],
};
