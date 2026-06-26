/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        midnight: '#020B18',
        deepblue: '#0A2A4A',
        navy: '#0D2B55',
        steel: '#163A6B',
        royal: '#0D47A1',
        ocean: '#1565C0',
        sky: '#4FC3F7',
        ice: '#E8F4FD',
        powder: '#90CAF9',
        gold: '#C9A24B',
        goldlight: '#E6C76A',
      },
      fontFamily: {
        serif: ['var(--font-playfair)', 'Georgia', 'serif'],
        sans: ['var(--font-inter)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['var(--font-dmmono)', 'ui-monospace', 'monospace'],
      },
      keyframes: {
        pulseDown: {
          '0%, 100%': { transform: 'translateY(0)', opacity: '0.6' },
          '50%': { transform: 'translateY(8px)', opacity: '1' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        pulseDown: 'pulseDown 2s ease-in-out infinite',
        fadeUp: 'fadeUp 0.8s ease-out forwards',
      },
    },
  },
  plugins: [],
}