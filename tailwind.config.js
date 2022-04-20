/* eslint-disable no-undef */
const defaultTheme = require('tailwindcss/defaultTheme')
const plugin = require('tailwindcss/plugin')

module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  purge: ['./src/**/*.html', './src/**/*.vue'],
  theme: {
    extend: {
      colors: {
        gray: {
          DEFAULT: '#333333',
          50: '#f5f5f5',
          100: '#ebebeb',
          200: '#cccccc',
          300: '#adadad',
          400: '#707070',
          500: '#333333',
          600: '#2e2e2e',
          700: '#262626',
          800: '#1f1f1f',
          900: '#191919',
        },
        primary: {
          1: '#38563e',
          2: '#56845f',
          3: '#72b07f',
          4: '#9cc8a5',
          5: '#c7dfcc',
        },
        'green-screen': '#009933',
        'warning-light': '#faedd0',
        warning: '#dbb944',
        'warning-dark': '#685826',
      },

      fontFamily: {
        maledpan: ['Maledpan'],
      },

      fontSize: {
        ...defaultTheme.fontSize,
        ...defaultTheme.spacing,
      },

      spacing: {
        ...defaultTheme.spacing,
      },

      minWidth: {
        ...defaultTheme.minWidth,
        ...defaultTheme.spacing,
      },

      minHeight: {
        ...defaultTheme.minHeight,
        ...defaultTheme.spacing,
      },
    },
  },
  plugins: [
    plugin(function ({ addComponents, theme }) {
      const buttons = {
        '.button': {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0px 1rem',
          width: 'auto',
          height: '1.5rem',
          border: `solid #3B3B3B 1px`,
          borderColor: theme('colors.warning-dark'),
          fontWeight: 'normal',
          color: 'white',
          borderRadius: '2px',
          whiteSpace: 'nowrap',
          transition: 'all 0.125s ease-in',
          cursor: 'pointer',
          backgroundColor: theme('colors.gray.600'),

          '&:hover': {
            backgroundColor: '#3B3B3B',
          },

          '&:active': {
            backgroundColor: theme('colors.gray.700'),
          },

          '$:disabled': {
            opacity: '0.5',
            pointerEvents: 'none',
          },
        },
      }

      addComponents(buttons)
    }),
  ],
}
