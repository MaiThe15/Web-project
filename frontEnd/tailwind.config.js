/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Dòng này giúp Tailwind nhận diện code React
  ],
  theme: {
    extend: {
      colors: {
        primary: '#D70018',
      }
    },
  },
  plugins: [],
}