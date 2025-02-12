/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {

      fontFamily: {
        'rubik': ['Rubik', 'sans-serif'],
        'chakra': ["Chakra Petch", "sans-serif"],
        'Roboto': ["Roboto", "serif"],
        'Delius': ["Delius", 'serif'],
      },
      screens: {
        "1000px": "1050px",
        "1040px": "1040px",
        "1100px": "1110px",
        "800px": "800px",
        "1300px": "1300px",
        "400px": "400px",
      },
    },
  },
}
