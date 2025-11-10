/** @type {import('tailwindcss').Config} */

// eslint-disable-next-line @typescript-eslint/no-var-requires
const withMT = require('@material-tailwind/react/utils/withMT')

module.exports = withMT({
  content: [
    './app/**/*.{html,js,ts,jsx,tsx}',
    './pages/**/*.{html,js,ts,jsx,tsx}',
    './components/**/*.{html,js,ts,jsx,tsx}',

    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    fontFamily: {
      normal: 'Euclid',
      bold: 'Euclid_Bold',
      semibold: 'Euclid_SemiBold',
      hearthLess: 'Hearthless',
      italic_bold: 'Euclid_Italic_Bold',
      italic_medium: 'Euclid_Italic_Medium',
      italic_light: 'Euclid_Italic_Light',
      backdropFilter: {
        none: 'none',
        blur: 'blur(20px)'
      }
    },
    extend: {
      colors: {
        offWhite: '#EEEEEE',
        neonGreen: '#168900',
        neonGreenLighter: '#33ff14',
        darkBlack: '#181516',
        darkRed: '#B22222',
        errorYellow: '#FFC95F'
      },
      backgroundImage: {
        troykaEye: 'url(\'../assets/images/troyka-eye.png\')',
        about: 'url(\'/about-us-3.jpg\')'
      },
      screens: {
        sm: '767px',
        '2sm': '1024px',
        md: '1025px'
        // => @media (min-width: 992px) { ... }
      },
      fontFamily: {
        normal: [ 'var(--font-normal)' ],
        semibold: [ 'var(--font-semibold)' ],
        bold: [ 'var(--font-bold)' ],
        italic_bold: [ 'var(--font-italic-bold)' ],
        italic_medium: [ 'var(--font-italic-medium)' ],
        italic_light: [ 'var(--font-italic-light)' ],
      }
    }
  },
  plugins: [
    require('@tailwindcss/typography')
    // ...
  ]
})
