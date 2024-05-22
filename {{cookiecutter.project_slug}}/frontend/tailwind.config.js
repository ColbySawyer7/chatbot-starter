/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#53389E',
        'primary-text': '#FFFFFF',
        'secondary': '#BCA7EB',
        'secondary-text': '#4F4F4F',
        'accent': 'rgba(188, 167, 235, 0.50)',
        'shaded-bg': 'rgba(0, 0, 0, 0.16)',
        'placeholder-text': 'rgba(83, 56, 158, 0.75)',
      },
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
      },
      screens:{
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1700px',
      }
    },
  },
  plugins: [],
}