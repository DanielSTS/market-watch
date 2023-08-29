import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        background: '#1C181F',
        main: '#252128',
        green: '#0FAE96',
        greenHover: '#0E9386',
        red: '#AE0000'
      }
    }
  },
  plugins: []
};
export default config;
