
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{html,js,ts,jsx,tsx}",
    "./node_modules/flowbite-react/**/*.js",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
        bebasNeue: ['Bebas Neue, sans-serif;'],
        poppins: ['Poppins, serif;']
      },
      colors: {
        customRed: "#FF6600",
        customGreen: "#9ACD32",
        customGold: "#FFD700",
        customBlue: "#274C77",
        lightBg: "#848484",
        mediumBg: "#666",
        darkBg: "#404040",
        dropDownBg: "#2E2E2E",
      }
    },
    screens: {
      sm: '490px',
      md: '768px',
      lg: '1040px',
      xl: '1440px',
    },
  },
  plugins: [
    require("flowbite/plugin"),
  ],
}

