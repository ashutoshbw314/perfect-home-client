module.exports = {
  purge: ["./src/**/*.jsx", "./index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        brand: {
          light: '#c0e5fc',
          DEFAULT: '#749bb3',
          dark: '#477896'
        }, 
      },
      fontFamily: {
        headline: "'Mali', cursive"
      },
      'animation': {
        'gradient-x':'gradient-x 1s ease infinite',
        'gradient-y':'gradient-y 1s ease infinite',
        'gradient-xy':'gradient-xy 1s ease infinite',
      },
      'keyframes': {
        'gradient-y': {
          '0%, 100%': {
              'background-size':'400% 400%',
              'background-position': 'center top'
          },
          '50%': {
              'background-size':'200% 200%',
              'background-position': 'center center'
          }
        },
        'gradient-x': {
          '0%, 100%': {
              'background-size':'200% 200%',
              'background-position': 'left center'
          },
          '50%': {
              'background-size':'200% 200%',
              'background-position': 'right center'
          }
        },
        'gradient-xy': {
          '0%, 100%': {
              'background-size':'400% 400%',
              'background-position': 'left center'
          },
          '50%': {
              'background-size':'200% 200%',
              'background-position': 'right center'
          }
        }
      }
    },
  },
  variants: {
    extend: {
      backgroundColor: ['active'],
      animation: ['hover']
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
