/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");
import plugin from "tailwindcss";

module.exports = withMT({
  content: [
    "./app/**/*.{html,js,ts,jsx,tsx}",
    "./pages/**/*.{html,js,ts,jsx,tsx}",
    "./components/**/*.{html,js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      normal: "Euclid",
      bold: "Euclid_Bold",
      semibold: "Euclid_SemiBold",
      hearthLess: "Hearthless",
      backdropFilter: {
        none: "none",
        blur: "blur(20px)",
      },
    },
    extend: {
      colors: {
        offWhite: "#EEEEEE",
        neonGreen: "#168900",
        neonGreenLighter: "#33ff14",
        darkBlack: "#181516",
        darkRed: "#B22222",
        errorYellow: "#FFC95F",
      },
      backgroundImage: {
        troykaEye: "url('../assets/images/troyka-eye.png')",
        random:
          "url('/about-us-3.jpg')",
      },
      screens: {
        'sm': '767px',
        '2sm': '1024px',
        'md': '1025px',
        // => @media (min-width: 992px) { ... }
      },
    },
  },
  plugins: [
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          'text-shadow': (value) => ({
            textShadow: value,
          }),
        },
        { values: theme('textShadow') }
      )
    }),
  ],
});
