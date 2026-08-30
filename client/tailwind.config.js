/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Light theme (Metafitnosis-style): white surfaces, navy text, vivid accent
        obsidian: '#ffffff',
        deep: '#f2f2f3',
        graphite: '#ffffff',
        charcoal: '#f7f7f8',
        steel: '#e4e4e7',
        paper: '#16181d',
        silver: '#4b4f57',
        muted: '#8b8f97',
        navy: '#232a35',
        brand: {
          DEFAULT: '#ff4200',
          deep: '#d86704',
          soft: '#ff5a1f'
        }
      },
      fontFamily: {
        display: ['Montserrat', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        logo: ['Lora', 'Georgia', 'ui-serif', 'serif'],
        body: ['"Open Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif']
      },
      letterSpacing: {
        label: '0.18em'
      },
      maxWidth: {
        shell: '76rem'
      },
      boxShadow: {
        lift: '0 16px 48px -16px rgba(20,22,28,0.18)',
        card: '0 2px 14px -4px rgba(20,22,28,0.10)'
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        }
      },
      animation: {
        'fade-up': 'fadeUp 0.7s cubic-bezier(0.22,1,0.36,1) both'
      }
    }
  },
  plugins: []
};
