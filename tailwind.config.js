// tailwind.config.js
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',     // if you're using App Router
    './pages/**/*.{js,ts,jsx,tsx}',   // if you're using Pages Router
    './components/**/*.{js,ts,jsx,tsx}', // if you have components folder
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ['Fredoka', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
