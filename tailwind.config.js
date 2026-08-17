/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: '#030308',
        space: {
          dark: '#030308',
          deep: '#070A14',
          surface: '#0B0F1E',
          card: 'rgba(11, 15, 30, 0.7)',
        },
        accent: {
          cyan: '#00F0FF',
          blue: '#3B82F6',
          purple: '#8B5CF6',
          violet: '#7C3AED',
          magenta: '#EC4899',
          glow: 'rgba(0, 240, 255, 0.15)',
        },
        text: {
          primary: '#F3F4F6',
          secondary: '#94A3B8',
          muted: '#64748B',
        }
      },
      fontFamily: {
        sans: ['Outfit', 'Inter', 'system-ui', 'sans-serif'],
        display: ['Syne', 'Outfit', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite alternate',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        glowPulse: {
          '0%': { boxShadow: '0 0 15px rgba(0, 240, 255, 0.15)' },
          '100%': { boxShadow: '0 0 30px rgba(139, 92, 246, 0.35)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}
