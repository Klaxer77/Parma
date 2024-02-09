/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      'main-color': '#293240',
      'purple-color': '#20232D',
      'button-color': '#0050FF',
      'white': '#fff',
      'red': '#F64343',
      'green': '#5DE47B',
      'gray-map': '#67696E'
    },
  },
  plugins: [],
}

