/** @type {import('tailwindcss').Config} */
module.exports = {
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
      colors: {
        'primary-dark': '#303436',
        'lighter-dark': '#43484C',
        'darker-dark': '#262B2C',
        'primary-light': '#EFE9DC',
        'darker-light': '#EDE4D4',
        'lighter-light': '#F9F6F1',
      },
    },
  },
  plugins: [],
};
