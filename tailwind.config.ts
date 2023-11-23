import type { Config } from 'tailwindcss'

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
      'serif': ['Vollkorn']
    },
    colors: {
      'burnt-orange': '#772F06',
      'neutral-dark-gray-bg': '#181818',
      'white': '#FFFFFF'
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
