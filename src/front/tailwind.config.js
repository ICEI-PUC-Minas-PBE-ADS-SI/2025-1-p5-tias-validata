/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#ff0000',
        'primary-50': '#fff0f0',
        'primary-100': '#ffdddd',
        'primary-200': '#ffc0c0',
        'primary-300': '#ff9494',
        'primary-400': '#ff5757',
        'primary-500': '#ff2323',
        'primary-600': '#ff0000',
        'primary-700': '#d70000',
        'primary-800': '#b10303',
        'primary-900': '#920a0a',
        secondary: {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d',
        },
      }
    }
  },
  plugins: [],
}
