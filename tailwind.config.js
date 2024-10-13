/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'min-660': '660px',
        'min-1200': '1200px',

      }
    },
  },
  plugins: [],
}
