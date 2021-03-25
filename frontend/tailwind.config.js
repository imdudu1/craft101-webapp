module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    boxShadow: {
      sm: 'rgb(0 0 0 / 2%) -1px 1px 1px',
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
