/* eslint-disable @typescript-eslint/no-require-imports */

const px0_200 = {
  ...Array.from(Array(201)).map((_, i) => `${i}px`),
}

/** @type {import('tailwindcss').Config} */
const config = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: '#7a52de',
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
      },
      borderRadius: px0_200,
      spacing: px0_200,
      width: px0_200,
      height: px0_200,
      gap: px0_200,
      padding: px0_200,
      margin: px0_200,
      inset: px0_200,
      borderWidth: px0_200,
      lineHeight: px0_200,
      fontSize: px0_200,
    },
    screens: {
      phone: {
        min: '0px',
        max: '640px',
      },
      desktop: {
        min: '641px',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}
export default config
