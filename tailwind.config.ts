import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px'
      }
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(210, 80%, 40%)',
        background: 'hsl(220, 20%, 98%)',
        foreground: 'hsl(220, 10%, 10%)',
        primary: {
          DEFAULT: 'hsl(210, 80%, 40%)',
          foreground: 'hsl(0, 0%, 98%)'
        },
        secondary: {
          DEFAULT: 'hsl(220, 30%, 90%)',
          foreground: 'hsl(220, 10%, 10%)'
        },
        destructive: {
          DEFAULT: 'hsl(0, 84.2%, 60.2%)',
          foreground: 'hsl(0, 0%, 98%)'
        },
        muted: {
          DEFAULT: 'hsl(220, 30%, 95%)',
          foreground: 'hsl(220, 10%, 40%)'
        },
        accent: {
          DEFAULT: 'hsl(210, 80%, 60%)',
          foreground: 'hsl(0, 0%, 98%)'
        },
        popover: {
          DEFAULT: 'hsl(220, 20%, 98%)',
          foreground: 'hsl(220, 10%, 10%)'
        },
        card: {
          DEFAULT: 'hsl(220, 20%, 98%)',
          foreground: 'hsl(220, 10%, 10%)'
        },
        brewing: {
          amber: '#D9A13B',
          brown: '#8B4513',
          cream: '#F5F0E1',
          copper: '#B87333',
          stout: '#2E1E0F',
          wheat: '#F5DEB3',
          hops: '#5D8C3E',
          malt: '#C19A6B'
        },
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
      keyframes: {
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
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out'
      }
    }
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
