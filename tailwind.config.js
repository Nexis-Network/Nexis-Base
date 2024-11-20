const { fontFamily } = require("tailwindcss/defaultTheme")
const plugin = require('tailwindcss/plugin')
const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./components/**/*.{js,ts,jsx,tsx}",
    "app/**/*.{ts,tsx}",
    "components/**/*.{ts,tsx}",
    "integrations/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: 'true',
      padding: '2rem',
      screens: {
        '2xl': '1400px'
      }
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))'
        },
        'oslo-gray': '#868E96',
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar-background))',
          foreground: 'hsl(var(--sidebar-foreground))',
          primary: 'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent: 'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          border: 'hsl(var(--sidebar-border))',
          ring: 'hsl(var(--sidebar-ring))'
        }
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      fontFamily: {
        sans: ["var(--font-inter)", ...fontFamily.sans],
        mono: ['Roboto Mono"', ...defaultTheme.fontFamily.mono]
      },
      keyframes: {
        shimmer: {
          from: {
            backgroundPosition: '0 0'
          },
          to: {
            backgroundPosition: '-200% 0'
          }
        },
        'accordion-down': {
          from: {
            height: '0'
          },
          to: {
            height: 'var(--radix-accordion-content-height)'
          }
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)'
          },
          to: {
            height: '0'
          }
        },
        shine: {
          from: {
            backgroundPosition: '200% 0'
          },
          to: {
            backgroundPosition: '-200% 0'
          }
        },
        'border-appear': {
          '0%': {
            width: '0%'
          },
          '100%': {
            width: '100%'
          }
        },
        'border-top-left': {
          '0%': {
            width: '0',
            height: '0'
          },
          '100%': {
            width: '100%',
            height: '100%'
          }
        },
        'border-top-right': {
          '0%': {
            width: '0',
            height: '0'
          },
          '100%': {
            width: '100%',
            height: '100%'
          }
        },
        'border-bottom-left': {
          '0%': {
            width: '0',
            height: '0'
          },
          '100%': {
            width: '100%',
            height: '100%'
          }
        },
        'border-bottom-right': {
          '0%': {
            width: '0',
            height: '0'
          },
          '100%': {
            width: '100%',
            height: '100%'
          }
        },
        'border-tl': {
          '0%, 100%': {
            width: '8px',
            height: '8px'
          },
          '50%': {
            width: '100%',
            height: '100%'
          }
        },
        'border-tr': {
          '0%, 100%': {
            width: '8px',
            height: '8px'
          },
          '50%': {
            width: '100%',
            height: '100%'
          }
        },
        'border-bl': {
          '0%, 100%': {
            width: '8px',
            height: '8px'
          },
          '50%': {
            width: '100%',
            height: '100%'
          }
        },
        'border-br': {
          '0%, 100%': {
            width: '8px',
            height: '8px'
          },
          '50%': {
            width: '100%',
            height: '100%'
          }
        },
        spotlight: {
          '0%': {
            opacity: 0,
            transform: 'translate(-72%, -62%) scale(0.5)',
          },
          '100%': {
            opacity: 1,
            transform: 'translate(-50%,-40%) scale(1)',
          },
        },
      },
      animation: {
        shimmer: 'shimmer 2s linear infinite',
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        shine: 'shine 8s ease-in-out infinite',
        'border-appear': 'border-appear 0.3s ease-out forwards',
        'border-top-left': 'border-top-left 0.3s ease-out forwards',
        'border-top-right': 'border-top-right 0.3s ease-out forwards',
        'border-bottom-left': 'border-bottom-left 0.3s ease-out forwards',
        'border-bottom-right': 'border-bottom-right 0.3s ease-out forwards',
        'border-tl': 'border-tl 2s ease-in-out infinite',
        'border-tr': 'border-tr 2s ease-in-out infinite',
        'border-bl': 'border-bl 2s ease-in-out infinite',
        'border-br': 'border-br 2s ease-in-out infinite',
        spotlight: 'spotlight 2s ease .75s 1 forwards',
      },
      screens: {
        xs: '400px'
      },
      fontSize: {
        md: '0.9375rem'
      },
      backgroundColor: {
        clicking: 'hsl(82 84.5% 67.1%)',
        hovering: 'hsl(82 84.5% 67.1%)'
      }
    }
  },
  plugins: [
    require("tailwindcss-animate"),
    plugin(({ addVariant }) => {
      addVariant('group-hover-animate', ':merge(.group):hover &')
    }),
  ],
}
