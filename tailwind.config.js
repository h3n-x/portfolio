/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0f0", // Verde brillante
        secondary: "#00ff9d", // Verde menta
        dark: "#000000", // Negro puro
        light: "#f8fafc", // Blanco hueso
        'green': {
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d'
        },
        'gray': {
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
        }
      },
      fontFamily: {
        sans: ['Inter', 'Roboto', 'sans-serif'],
        heading: ['Poppins', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-in-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'matrix-code': 'matrixCode 20s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        matrixCode: {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(-2000px)' }
        }
      },
      backgroundImage: {
        'matrix-pattern': 'url("data:image/svg+xml,%3Csvg width=\'100%25\' height=\'100%25\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cdefs%3E%3Cpattern id=\'matrix\' patternUnits=\'userSpaceOnUse\' width=\'20\' height=\'20\' patternTransform=\'scale(2) rotate(0)\'%3E%3Crect x=\'0\' y=\'0\' width=\'100%25\' height=\'100%25\' fill=\'%23000\'/%3E%3Cpath d=\'M10 0 L10 20 M0 10 L20 10\' stroke-width=\'0.5\' stroke=\'%2322c55e22\' fill=\'none\'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width=\'100%25\' height=\'100%25\' fill=\'url(%23matrix)\'/%3E%3C/svg%3E")',
      }
    },
  },
  plugins: [],
}
