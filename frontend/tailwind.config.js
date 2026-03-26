/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    colors: {
      /* ── Existing colors (DO NOT REMOVE) ── */
      black: "#000000",
      white: "#ffffff",
      jetBlack: "#0e0e0e",
      redfive: "#e1484a",
      gray: "#c1cad4",
      side_blue: "#2D60FF",
      custom_white: "#DFEAF2",
      borderGray: '#E6EFF5',
      lightGray: "#FAFBFD",
      hex: "#FE9901",
      yel: '#FEB601',
      sky: '#EAECF0',
      transparent: 'transparent',
      current: 'currentColor',

      /* ── Primary (gold/amber family) ── */
      primary: {
        50:  '#FFF9EB',
        100: '#FFF0C6',
        200: '#FFE08A',
        300: '#FFCC4D',
        400: '#FEB601',
        500: '#FE9901',
        600: '#E07C00',
        700: '#B35F00',
      },

      /* ── Neutral palette ── */
      neutral: {
        50:  '#FAFBFD',
        100: '#F3F6F9',
        200: '#E6EBF1',
        300: '#D1D9E2',
        400: '#A3B1BF',
        500: '#6B7A8D',
        600: '#4A5568',
        700: '#2D3748',
        800: '#1A202C',
        900: '#0E1117',
      },

      /* ── Semantic colors ── */
      success: {
        light: '#D1FAE5',
        DEFAULT: '#10B981',
        dark: '#065F46',
      },
      error: {
        light: '#FEE2E2',
        DEFAULT: '#EF4444',
        dark: '#991B1B',
      },
      warning: {
        light: '#FEF3C7',
        DEFAULT: '#F59E0B',
        dark: '#92400E',
      },
      info: {
        light: '#DBEAFE',
        DEFAULT: '#3B82F6',
        dark: '#1E40AF',
      },
    },
    extend: {
      screens: {
        'xs': '480px',
        '2xl': '1536px',
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      spacing: {
        '4.5': '1.125rem',
        '13': '3.25rem',
        '15': '3.75rem',
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem',
        '34': '8.5rem',
        '128': '32rem',
        '144': '36rem',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      boxShadow: {
        'card': '0 1px 3px rgba(0, 0, 0, 0.06), 0 1px 2px rgba(0, 0, 0, 0.04)',
        'card-hover': '0 10px 25px rgba(0, 0, 0, 0.08), 0 4px 10px rgba(0, 0, 0, 0.04)',
        'elevated': '0 20px 40px rgba(0, 0, 0, 0.1), 0 8px 16px rgba(0, 0, 0, 0.06)',
        'inner-soft': 'inset 0 2px 4px rgba(0, 0, 0, 0.04)',
        'glow-primary': '0 0 20px rgba(254, 153, 1, 0.25)',
        'glow-blue': '0 0 20px rgba(45, 96, 255, 0.25)',
      },
      transitionDuration: {
        '250': '250ms',
        '350': '350ms',
        '400': '400ms',
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'bounce-in': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-up': 'slideUp 0.35s ease-out',
        'slide-down': 'slideDown 0.35s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
