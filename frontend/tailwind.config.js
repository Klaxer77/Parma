/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      'main-color': '#2A2C34',
      'purple-color': '#20232D',
      'button-color': '#0050FF',
      'white': '#fff',
      'red': '#F64343',
      'green': '#2AAB5B',
      'black-map': '#20232F'
    },
    fontFamily: {
      'GothemPro': ['Gotham Pro']
    }
  },
  plugins: [],
}

