/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'primary':'#5A6DFC',
        'text-color':'#313131',
      }
    },
  },
  plugins: [],
}

