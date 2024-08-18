import type {Config} from 'tailwindcss'
import tailwindcssAnimate from 'tailwindcss-animate'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  future: {
    hoverOnlyWhenSupported: true
  },
  theme: {
    container: {
      center: true,
      padding: '0.75rem'
    },
    data: {
      hidden: 'state="hidden"',
      visible: 'state="visible"',
      open: 'state="open"',
      closed: 'state="closed"',
      checked: 'state=checked',
      unchecked: 'state=unchecked',
      top: 'side="top"',
      right: 'side="right"',
      bottom: 'side="bottom"',
      left: 'side="left"',
      active: 'state="active"',
      inactive: 'state="inactive"',
      highlighted: 'highlighted',
      placeholder: 'placeholder',
      disabled: 'disabled',
      success: 'type="success"',
      error: 'type="error"',
      info: 'type="info"',
      warning: 'type="warning"',
      'from-start': 'motion="from=start"',
      'from-end': 'motion="from=end"',
      'to-start': 'motion="to-start"',
      'to-end': 'motion="to-end"'
    },
    extend: {
      colors: {
        surface: {
          1: 'var(--surface-1)',
          2: 'var(--surface-2)',
          3: 'var(--surface-3)',
          4: 'var(--surface-4)',
          5: 'var(--surface-5)'
        },
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
        green: {
          1: 'var(--green-1)',
          2: 'var(--green-2)',
          3: 'var(--green-3)',
          4: 'var(--green-4)',
          5: 'var(--green-5)',
          6: 'var(--green-6)',
          7: 'var(--green-7)',
          8: 'var(--green-8)',
          9: 'var(--green-9)',
          10: 'var(--green-10)',
          11: 'var(--green-11)',
          12: 'var(--green-12)'
        },
        red: {
          1: 'var(--red-1)',
          2: 'var(--red-2)',
          3: 'var(--red-3)',
          4: 'var(--red-4)',
          5: 'var(--red-5)',
          6: 'var(--red-6)',
          7: 'var(--red-7)',
          8: 'var(--red-8)',
          9: 'var(--red-9)',
          10: 'var(--red-10)',
          11: 'var(--red-11)',
          12: 'var(--red-12)'
        },
        yellow: {
          1: 'var(--yellow-1)',
          2: 'var(--yellow-2)',
          3: 'var(--yellow-3)',
          4: 'var(--yellow-4)',
          5: 'var(--yellow-5)',
          6: 'var(--yellow-6)',
          7: 'var(--yellow-7)',
          8: 'var(--yellow-8)',
          9: 'var(--yellow-9)',
          10: 'var(--yellow-10)',
          11: 'var(--yellow-11)',
          12: 'var(--yellow-12)'
        },
        blue: {
          1: 'var(--blue-1)',
          2: 'var(--blue-2)',
          3: 'var(--blue-3)',
          4: 'var(--blue-4)',
          5: 'var(--blue-5)',
          6: 'var(--blue-6)',
          7: 'var(--blue-7)',
          8: 'var(--blue-8)',
          9: 'var(--blue-9)',
          10: 'var(--blue-10)',
          11: 'var(--blue-11)',
          12: 'var(--blue-12)'
        },
        foreground: {
          DEFAULT: 'var(--foreground)',
          alt: 'var(--foreground-alt)',
          muted: 'var(--foreground-muted)'
        },
        primary: {
          DEFAULT: 'var(--primary)',
          foreground: 'var(--primary-foreground)',
          hover: 'var(--primary-hover)'
        },
        muted: {
          DEFAULT: 'var(--muted)',
          foreground: 'var(--muted-foreground)',
          hover: 'var(--muted-hover)'
        },
        success: {
          DEFAULT: 'var(--success)',
          foreground: 'var(--success-foreground)',
          hover: 'var(--success-hover)'
        },
        error: {
          DEFAULT: 'var(--error)',
          foreground: 'var(--error-foreground)',
          hover: 'var(--error-hover)'
        },
        warning: {
          DEFAULT: 'var(--warning)',
          foreground: 'var(--warning-foreground)',
          hover: 'var(--warning-hover)'
        },
        info: {
          DEFAULT: 'var(--info)',
          foreground: 'var(--info-foreground)',
          hover: 'var(--info-hover)'
        },
        border: {
          DEFAULT: 'var(--border)',
          hover: 'var(--border-hover)',

          muted: 'var(--border-muted)',
          'muted-hover': 'var(--border-muted-hover)',

          success: 'var(--border-success)',
          'success-hover': 'var(--border-success-hover)',

          error: 'var(--border-error)',
          'error-hover': 'var(--border-error-hover)',

          info: 'var(--border-info)',
          'info-hover': 'var(--border-info-hover)',

          warning: 'var(--border-warning)',
          'warning-hover': 'var(--border-warning-hover)'
        },
        ring: {
          DEFAULT: 'var(--ring)'
        }
      },
      keyframes: {
        'page-transition': {
          from: {
            opacity: '0.25',
            transform: 'translateY(-16px)'
          },
          to: {
            opacity: '1',
            transform: 'translateY(0)'
          }
        },
        'dialog-open': {
          from: {
            opacity: '0',
            translate: '0 24px'
          },
          to: {
            opacity: '1',
            translate: '0 0'
          }
        },
        'dialog-closed': {
          from: {
            opacity: '1',
            translate: '0 0'
          },
          to: {
            opacity: '0',
            translate: '0 24px'
          }
        }
      },
      animation: {
        'page-transition': 'page-transition 1500ms cubic-bezier(0.32,0.72,0,1)',
        'dialog-open': 'dialog-open 750ms cubic-bezier(0.32,0.72,0,1)',
        'dialog-closed': 'dialog-closed 375ms cubic-bezier(0.32,0.72,0,1)'
      },
      transitionDuration: {
        '750': '750ms'
      },
      transitionTimingFunction: {
        mocca: 'cubic-bezier(0.32,0.72,0,1)'
      }
    },
    boxShadow: {
      DEFAULT: 'var(--box-shadow-sm)',
      medium: 'var(--box-shadow-md)',
      none: 'none'
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
      DEFAULT: 'var(--radius)', // 2px
      md: 'calc(var(--radius) + 0.125rem)', // 2 + 2px
      lg: 'calc(var(--radius) + 0.250rem)', // 2 + 4px
      xl: 'calc(var(--radius) + 0.375rem)', // 2 + 6px
      '2xl': 'calc(var(--radius) + 0.5rem)', // 2 + 8px
      full: '9999px',
      none: '0px'
    }
  },
  // plugins: [require('tailwindcss-animate')]
  plugins: [tailwindcssAnimate]
}

export default config
