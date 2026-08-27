/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        obsidian: '#080808',
        deep: '#0D0D0D',
        graphite: '#151515',
        charcoal: '#202020',
        steel: '#2A2A2A',
        brand: {
          DEFAULT: '#F59A00',
          deep: '#D97700',
          soft: '#FFB52E'
        },
        paper: '#F5F5F3',
        silver: '#B8B8B8',
        muted: '#8A8A8A'
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        body: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif']
      },
      letterSpacing: {
        label: '0.18em'
      },
      maxWidth: {
        shell: '76rem'
      },
      boxShadow: {
        lift: '0 12px 40px -12px rgba(0,0,0,0.55)',
        card: '0 2px 16px -4px rgba(0,0,0,0.35)'
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        lineGrow: {
          '0%': { transform: 'scaleX(0)' },
          '100%': { transform: 'scaleX(1)' }
        }
      },
      animation: {
        'fade-up': 'fadeUp 0.7s cubic-bezier(0.22,1,0.36,1) both',
        'line-grow': 'lineGrow 0.8s cubic-bezier(0.22,1,0.36,1) both'
      }
    }
  },
  plugins: []
};
