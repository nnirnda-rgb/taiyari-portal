/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        gov: {
          blue: {
            light: '#2563EB',
            DEFAULT: '#1D4ED8',
            dark: '#1E3A8A',
            deep: '#0F2756',
            hover: '#172554',
          },
          gold: {
            light: '#FDE68A',
            DEFAULT: '#F59E0B',
            dark: '#B45309',
          },
          saffron: '#FF7722',
          green: '#138808',
          bg: '#F8FAFC',
          card: '#FFFFFF',
          border: '#E2E8F0',
          darkBorder: '#CBD5E1',
          text: {
            primary: '#0F172A',
            secondary: '#334155',
            muted: '#64748B',
          }
        }
      },
      fontFamily: {
        sans: ['Inter', 'Noto Sans Devanagari', 'system-ui', 'sans-serif'],
        hindi: ['Noto Sans Devanagari', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'gov': '0 2px 4px -1px rgba(15, 39, 86, 0.06), 0 4px 6px -1px rgba(15, 39, 86, 0.1)',
        'gov-card': '0 4px 12px rgba(15, 39, 86, 0.08)',
        'gov-hover': '0 10px 25px -5px rgba(29, 78, 216, 0.15)',
      },
      animation: {
        'ticker': 'ticker 35s linear infinite',
      },
      keyframes: {
        ticker: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(-100%)' },
        }
      }
    },
  },
  plugins: [],
};
