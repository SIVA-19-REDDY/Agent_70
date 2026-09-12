/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        institutional: {
          50: '#F0F7FF',
          100: '#E0F0FE',
          200: '#BAE0FD',
          300: '#7CC5FB',
          400: '#38A5F8',
          500: '#0E87EA',
          600: '#026AC8',
          700: '#0354A1',
          800: '#074884',
          900: '#0C3D6E',
          950: '#08274A'
        },
        navy: {
          800: '#1E293B',
          900: '#0F172A',
          950: '#020617'
        },
        surface: {
          light: '#FFFFFF',
          soft: '#F8FAFC',
          tint: '#F1F5F9',
          muted: '#E2E8F0',
          accent: '#EFF6FF'
        }
      },
      borderRadius: {
        'xl': '12px',
        '2xl': '16px',
        '3xl': '24px',
        '4xl': '32px'
      },
      boxShadow: {
        'subtle': '0 1px 3px 0 rgba(15, 23, 42, 0.04), 0 1px 2px -1px rgba(15, 23, 42, 0.04)',
        'card': '0 4px 20px -2px rgba(15, 23, 42, 0.05), 0 2px 6px -1px rgba(15, 23, 42, 0.02)',
        'card-hover': '0 12px 32px -4px rgba(15, 23, 42, 0.08), 0 4px 12px -2px rgba(15, 23, 42, 0.04)',
        'elevated': '0 20px 40px -8px rgba(15, 23, 42, 0.12), 0 8px 16px -4px rgba(15, 23, 42, 0.06)'
      },
      fontFamily: {
        sans: ['Inter', 'Outfit', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      }
    },
  },
  plugins: [],
};
