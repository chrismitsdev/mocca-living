import type {Config} from 'tailwindcss'

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  future: {
    hoverOnlyWhenSupported: true
  },
  theme: {
    container: {
      center: true,
      padding: '0.75rem'
    },
    data: {
      open: 'state="open"',
      closed: 'state="closed"',
      checked: 'state=checked',
      unchecked: 'state=unchecked',
      top: 'side="top"',
      right: 'side="right"',
      bottom: 'side="bottom"',
      left: 'side="left"',
      highlighted: 'highlighted',
      placeholder: 'placeholder',
      disabled: 'disabled',
    },
    extend: {
      colors: {
        'app-background': 'var(--app-background)',
        brand: {
          1: 'var(--brand-1)',
          2: 'var(--brand-2)',
          3: 'var(--brand-3)',
          4: 'var(--brand-4)',
          5: 'var(--brand-5)',
          6: 'var(--brand-6)',
          7: 'var(--brand-7)',
          8: 'var(--brand-8)',
          9: 'var(--brand-9)',
          10: 'var(--brand-10)',
          11: 'var(--brand-11)',
          12: 'var(--brand-12)'
        },
        gray: {
          1: 'var(--gray-1)',
          2: 'var(--gray-2)',
          3: 'var(--gray-3)',
          4: 'var(--gray-4)',
          5: 'var(--gray-5)',
          6: 'var(--gray-6)',
          7: 'var(--gray-7)',
          8: 'var(--gray-8)',
          9: 'var(--gray-9)',
          10: 'var(--gray-10)',
          11: 'var(--gray-11)',
          12: 'var(--gray-12)'
        },
        foreground: {
          DEFAULT: 'var(--foreground)',
          alt: 'var(--foreground-alt)',
          muted: 'var(--foreground-muted)'
        },
        primary: {
          DEFAULT: 'var(--primary)',
          alt: 'var(--primary-alt)',
          foreground: 'var(--primary-foreground)',
          hover: 'var(--primary-hover)',
        },
        success: {
          DEFAULT: 'var(--success)',
          foreground: 'var(--success-foreground)',
          hover: 'var(--success-hover)',
        },
        error: {
          DEFAULT: 'var(--error)',
          foreground: 'var(--error-foreground)',
          hover: 'var(--error-hover)',
        },
        warning: {
          DEFAULT: 'var(--warning)',
          foreground: 'var(--warning-foreground)',
          hover: 'var(--warning-hover)',
        },
        info: {
          DEFAULT: 'var(--info)',
          foreground: 'var(--info-foreground)',
          hover: 'var(--info-hover)',
        },
        border: {
          DEFAULT: 'var(--border)',
          alt: 'var(--border-alt)',
          muted: 'var(--border-muted)',
          hover: 'var(--border-hover)',
          'alt-hover': 'var(--border-alt-hover)',
          'muted-hover': 'var(--border-muted-hover)',
        },
        ring: {
          DEFAULT: 'var(--ring)',
          alt: 'var(--ring-alt)'
        },
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0'
          },
          to: {
            height: 'var(--radix-accordion-content-height)'
          },
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)'
          },
          to: {
            height: '0'
          },
        },
        'appear': {
          from: {
            'opacity': '0',
            'transform': 'translateY(16px)'
          },
          to: {
            'opacity': '1',
            'transform': 'translateY(0)'
          }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'appear': 'appear 750ms cubic-bezier(0.390, 0.575, 0.565, 1.000) both'
      },
    },
    fontSize: {
      xs: ['12px', '16px'],
      sm: ['14px', '24px'],
      base: ['16px', '24px'],
      lg: ['18px', '24px'],
      xl: ['20px', '24px'],
      '2xl': ['24px', '32px'],
      '3xl': ['30px', '48px'],
      '4xl': ['36px', '48px'],
      '5xl': ['48px', '64px'],
      '6xl': ['60px', '96px']
    },
    borderRadius: {
      DEFAULT: 'var(--radius)',               // 2px
      md: 'calc(var(--radius) + 0.125rem)',   // 2 + 2px
      lg: 'calc(var(--radius) + 0.250rem)',   // 2 + 4px
      xl: 'calc(var(--radius) + 0,375rem)',   // 2 + 6px
      '2xl': 'calc(var(--radius) + 0,5rem)',  // 2 + 8px
      full: '9999px',
    },
  },
  plugins: [
    require('tailwindcss-animate')
  ]
}

export default config