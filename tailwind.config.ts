import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
    fontFamily: {
      // 'serif': ['Raleway'],
      // 'sans': ['Raleway']
    },
    colors: {
      'burnt-orange': '#772F06',
      'neutral-dark-gray-bg': '#181818',
      'white': '#FFFFFF',
      'black': '#000000',
      'orange': '#ff743d',
      'error-red': '#ff1800',
      'dirty-white': '#E7DFDF',
      'gray-500': '#828282',
      'transparent': 'transparent',
      'golden': '#F8B91A'
    },
    minHeight: {
      '1/2': '50%',
      'full': '100%',
      'fit': 'fit-content'
    },
    screens: {
      'xxl': '1599px',
      'xl': '1273px',
      'lg': '920px',
      'md': '768px',
      'sm': '640px',
      'xsm': '550px'
    }
  },
  plugins: [],
}
export default config
