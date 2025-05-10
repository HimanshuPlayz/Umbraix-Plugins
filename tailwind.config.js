/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,ejs}",
    "./src/componets/**/*.{html,js,ejs}",
    "./index.js"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      colors: {
        primary: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',  // Bright green for accents
          500: '#22c55e',  // Main green
          600: '#16a34a',  // Darker green for hover states
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
          950: '#064e23',
        },
        green: {
          400: '#34d399',  // Different shade from primary-400
        },
        gray: {
          300: '#d1d5db',  // Light gray for text
          400: '#9ca3af',  // Medium gray for secondary text
          500: '#6b7280',  // Darker gray
        },
        white: '#ffffff',  // Pure white
        dark: {
          base: '#0f0f12',    // Darkest background
          light: '#1a1a21',   // Lighter dark for cards
          lighter: '#24242e', // Lightest dark for hover states
          card: '#1e1e26'     // Slightly different from light for distinction
        }
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      },
      boxShadow: {
        'glow': '0 0 15px rgba(34, 197, 94, 0.5)',
        'card': '0 8px 24px rgba(0, 0, 0, 0.12)',
      }
    }
  },
  plugins: [],
}
