/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      spacing: { '4.5': '1.125rem', '5.5': '1.375rem' },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Sora', 'system-ui', 'sans-serif'],
      },
      colors: {
        ink: {
          900: '#0A0A0A',
          800: '#121212',
          700: '#1A1A1A',
          600: '#242424',
          500: '#333333',
          400: '#929292',
          300: '#888888',
          200: '#C8C8C8',
          100: '#E8E8E8',
        },
        brand: {
          50: '#E8FBE8',
          100: '#C6F4C6',
          200: '#8FE68F',
          300: '#54D654',
          400: '#28C228',
          500: '#1DB31D',
          600: '#168A16',
          700: '#127312',
          800: '#0E5A0E',
          900: '#0A420A',
        },
        accent: {
          DEFAULT: '#1DB31D',
          soft: '#28C228',
        },
      },
      boxShadow: {
        glow: '0 0 40px -8px rgba(29, 179, 29, 0.5)',
        'glow-lg': '0 0 80px -10px rgba(29, 179, 29, 0.45)',
        card: '0 12px 40px -12px rgba(0,0,0,0.35)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'float': {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(0.9)', opacity: '0.7' },
          '70%': { transform: 'scale(1.6)', opacity: '0' },
          '100%': { opacity: '0' },
        },
        'marquee': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'grid-pan': {
          '0%': { backgroundPosition: '0 0' },
          '100%': { backgroundPosition: '40px 40px' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.7s cubic-bezier(0.16,1,0.3,1) both',
        'fade-in': 'fade-in 0.9s ease-out both',
        'float': 'float 6s ease-in-out infinite',
        'pulse-ring': 'pulse-ring 2.5s cubic-bezier(0.16,1,0.3,1) infinite',
        'marquee': 'marquee 28s linear infinite',
        'grid-pan': 'grid-pan 8s linear infinite',
      },
    },
  },
  plugins: [],
};
