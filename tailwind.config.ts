import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // content: {
      //   //'dropdownArrow': 'url("/public/dropdown-arrow.svg")'
      // },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
    fontFamily: {
      'serif': ['Vollkorn'],
      'sans': ['Lato']
    },
    colors: {
      'burnt-orange': '#772F06',
      'neutral-dark-gray-bg': '#181818',
      'white': '#FFFFFF',
      'black': '#000000',
      'dirty-white': '#E7DFDF',
      'gray-500': '#828282',
      'transparent': 'transparent'
    },
    minHeight: {
      '1/2': '50%',
      'full': '100%',
      'fit': 'fit-content'
    },
    screens: {
      'xl': '1599px',
      'lg': '920px',
      'md': '768px',
      'sm': '640px'
    }
  },
  plugins: [],
}
export default config
