/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          50:  '#eef1f8',
          100: '#d4daf0',
          200: '#aab5de',
          300: '#7f90cc',
          400: '#546bba',
          500: '#2e4480',
          600: '#1e2f5a',
          700: '#162244',
          800: '#0d1b3e',
          900: '#08112a',
        },
        silver: {
          50:  '#f8f9fb',
          100: '#edf0f5',
          200: '#d5dce8',
          300: '#b8c5d6',
          400: '#9aaec4',
          500: '#7d97b2',
          600: '#5f7a99',
          700: '#4a6180',
          800: '#354967',
          900: '#21304e',
        },
        cream: {
          50:  '#fdfcfa',
          100: '#faf6ee',
          200: '#f5edd9',
          300: '#efe1c1',
          400: '#e8d4a8',
          500: '#e0c58e',
          600: '#c9a96a',
          700: '#a8854a',
          800: '#7e6138',
          900: '#543f26',
        },
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'navy-gradient': 'linear-gradient(135deg, #08112a 0%, #0d1b3e 50%, #162244 100%)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
      },
      keyframes: {
        fadeIn: { from: { opacity: '0' }, to: { opacity: '1' } },
        slideUp: { from: { opacity: '0', transform: 'translateY(24px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        scaleIn: { from: { opacity: '0', transform: 'scale(0.95)' }, to: { opacity: '1', transform: 'scale(1)' } },
      },
    },
  },
  plugins: [],
};
