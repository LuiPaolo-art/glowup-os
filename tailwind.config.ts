import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Base surfaces
        s0: '#080808',
        s1: '#0F0F0F',
        s2: '#161616',
        s3: '#1E1E1E',
        s4: '#272727',
        // Text
        t1: '#E8E8E8',
        t2: '#909090',
        t3: '#4A4A4A',
        t4: '#2A2A2A',
        // Gold accent
        gold: '#C9A84C',
        'gold-light': '#E8C97A',
        'gold-dim': '#8A6020',
        'gold-bg': 'rgba(201,168,76,0.08)',
        'gold-border': 'rgba(201,168,76,0.18)',
        // State
        'state-green': '#5ACA9A',
        'state-green-bg': 'rgba(90,202,154,0.07)',
        'state-green-border': 'rgba(90,202,154,0.22)',
        'state-yellow': '#C9A84C',
        'state-yellow-bg': 'rgba(201,168,76,0.07)',
        'state-yellow-border': 'rgba(201,168,76,0.22)',
        'state-red': '#CA6060',
        'state-red-bg': 'rgba(202,96,96,0.07)',
        'state-red-border': 'rgba(202,96,96,0.22)',
        // Domains
        'd-sport': '#6BA4D4',
        'd-learn': '#A47DC8',
        'd-disc': '#C9A84C',
        'd-const': '#5ACA9A',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.2s ease',
        'slide-up': 'slideUp 0.25s ease',
        'check': 'check 0.25s cubic-bezier(0.34,1.56,0.64,1)',
        'pulse-soft': 'pulseSoft 2s ease infinite',
        shimmer: 'shimmer 2.5s linear infinite',
      },
      keyframes: {
        fadeIn: { from: { opacity: '0' }, to: { opacity: '1' } },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(8px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        check: {
          '0%': { transform: 'scale(0)' },
          '60%': { transform: 'scale(1.25)' },
          '100%': { transform: 'scale(1)' },
        },
        pulseSoft: { '0%,100%': { opacity: '1' }, '50%': { opacity: '0.45' } },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
}

export default config
