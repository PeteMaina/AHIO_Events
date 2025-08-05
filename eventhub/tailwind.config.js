/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary Colors
        'primary': '#DC2626', // Bold red (primary) - red-600
        'primary-dark': '#7F1D1D', // Deeper red variant (secondary) - red-900
        'primary-light': '#FEF2F2', // Subtle red tint (accent) - red-50
        
        // Background Colors
        'background': '#FFFFFF', // Pure white (background) - white
        'surface': '#F9FAFB', // Neutral gray (surface) - gray-50
        
        // Text Colors
        'text-primary': '#111827', // Near-black (text primary) - gray-900
        'text-secondary': '#6B7280', // Medium gray (text secondary) - gray-500
        
        // Status Colors
        'success': '#059669', // Professional green (success) - emerald-600
        'warning': '#D97706', // Amber (warning) - amber-600
        'error': '#DC2626', // Matching primary red (error) - red-600
        
        // Border Colors
        'border': '#E5E7EB', // Neutral gray (border) - gray-200
        'border-light': '#F3F4F6', // Light gray (border light) - gray-100
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'mono': ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      boxShadow: {
        'nav': '0 1px 3px rgba(0, 0, 0, 0.1)',
        'card': '0 1px 3px rgba(0, 0, 0, 0.1)',
        'modal': '0 10px 25px rgba(0, 0, 0, 0.15)',
      },
      animation: {
        'fade-in': 'fadeIn 200ms ease-out',
        'slide-in': 'slideIn 300ms ease-out',
        'scale-in': 'scaleIn 200ms ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      zIndex: {
        '100': '100',
        '1000': '1000',
        '1010': '1010',
        '1050': '1050',
        '1100': '1100',
      },
    },
  },
  plugins: [],
}