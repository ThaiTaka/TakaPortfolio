/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        void: '#060218',
        'void-soft': '#0b0730',
        'void-lift': '#120b3f',
        violet: '#a068ff',
        teal: '#2dd4bf',
      },
      fontFamily: {
        serif: ['Georgia', 'Iowan Old Style', 'Apple Garamond', 'Baskerville', 'Times New Roman', 'serif'],
        sans: ['Segoe UI', 'ui-sans-serif', 'system-ui', '-apple-system', 'Roboto', 'Helvetica Neue', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'ui-monospace', 'Cascadia Code', 'Consolas', 'SF Mono', 'monospace'],
      },
      animation: {
        'spin-slow': 'spin 7s linear infinite',
        'pulse-dot': 'pulse-dot 2.4s ease-in-out infinite',
      },
      keyframes: {
        'pulse-dot': {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.35 },
        },
      },
    },
  },
  plugins: [],
}
