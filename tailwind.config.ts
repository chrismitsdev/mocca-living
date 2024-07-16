import type {Config} from 'tailwindcss'

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '1rem'
    },
    data: {
      open: 'state="open"',
      closed: 'state="closed"',
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
        accent: {
          1: 'var(--clr-accent-1)',
          2: 'var(--clr-accent-2)',
          3: 'var(--clr-accent-3)',
          4: 'var(--clr-accent-4)',
          5: 'var(--clr-accent-5)',
          6: 'var(--clr-accent-6)',
          7: 'var(--clr-accent-7)',
          8: 'var(--clr-accent-8)',
          9: 'var(--clr-accent-9)',
          10: 'var(--clr-accent-10)',
          11: 'var(--clr-accent-11)',
          12: 'var(--clr-accent-12)'
        },
        gray: {
          1: 'var(--clr-gray-1)',
          2: 'var(--clr-gray-2)',
          3: 'var(--clr-gray-3)',
          4: 'var(--clr-gray-4)',
          5: 'var(--clr-gray-5)',
          6: 'var(--clr-gray-6)',
          7: 'var(--clr-gray-7)',
          8: 'var(--clr-gray-8)',
          9: 'var(--clr-gray-9)',
          10: 'var(--clr-gray-10)',
          11: 'var(--clr-gray-11)',
          12: 'var(--clr-gray-12)'
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
        destructive: {
          DEFAULT: 'var(--destructive)',
          foreground: 'var(--destructive-foreground)',
          hover: 'var(--destructive-hover)',
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
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
    borderRadius: {
      DEFAULT: 'var(--radius)',
      md: 'calc(var(--radius) + 0.125rem)',
      lg: 'calc(var(--radius) + 0.250rem)',
      xl: 'calc(var(--radius) + 0,375rem)',
      full: '9999px',
    },
  },
  plugins: [
    require('tailwindcss-animate')
  ]
}

export default config