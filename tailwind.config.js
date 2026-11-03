/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
    },
    extend: {
      colors: {
        // Deep night-purple surfaces (hero, footer, membership band)
        'night': {
          DEFAULT: '#120338',
          deep: '#0B0226',
          footer: '#04041A',
        },
        // Emergency accent (alarm red), brand-fixed
        'alarm': {
          DEFAULT: '#F9091D',
          strong: '#D90818',
        },
        'ink': '#181719',
        'mute': '#636066',
        'line': '#ECEBED',
        'ev': {
          50: '#f4f1ff',
          100: '#ece5ff',
          200: '#d9cfff',
          300: '#bea8ff',
          400: '#a177ff',
          500: '#8540ff',
          600: '#7a1aff',
          700: '#6d09f9',
          800: '#5a06d1',
          900: '#4b07ab',
          950: '#2c0174',
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },


      },
      boxShadow: {
        // Flat design system: zero shadows. Elevation is expressed with hairline
        // borders and background tone, never drop shadows.
        card: "none",
        pop: "none",
        modal: "none",
        lift: "none",
      },
      transitionTimingFunction: {
        'out-strong': 'cubic-bezier(0.23, 1, 0.32, 1)',
        'in-out-strong': 'cubic-bezier(0.77, 0, 0.175, 1)',
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        mm: "8px"
      },
      keyframes: {
        siren: {
          '0%, 100%': {
            transform: 'scale(1)',
            opacity: '1',
          },
          '50%': {
            transform: 'scale(1.2)',
            opacity: '0.7',
          },
        },
        radiate: {
          '0%, 100%': {
            transform: 'scale(1)',
            opacity: '0.5',
          },
          '50%': {
            transform: 'scale(1.5)',
            opacity: '0.2',
          },
        },


        // "Why choose us" illustrations: continuous, transform/opacity only
        sweep: { from: { transform: 'rotate(0deg)' }, to: { transform: 'rotate(360deg)' } },
        ecg: { from: { transform: 'translateX(0)' }, to: { transform: 'translateX(-50%)' } },
        pill: {
          '0%, 38%': { transform: 'translateX(0)' },
          '50%, 88%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        'pill-a': { '0%, 38%': { opacity: '1' }, '46%, 90%': { opacity: '0' }, '100%': { opacity: '1' } },
        'pill-b': { '0%, 38%': { opacity: '0' }, '46%, 90%': { opacity: '1' }, '100%': { opacity: '0' } },
        ring: {
          '0%, 68%': { transform: 'scale(0.6)', opacity: '0' },
          '72%': { opacity: '0.5' },
          '100%': { transform: 'scale(2.4)', opacity: '0' },
        },

        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },

      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "siren": 'siren 2s infinite',
        radiate: 'radiate 3s infinite',
        sweep: 'sweep 14s linear infinite',
        ecg: 'ecg 3.2s linear infinite',
        pill: 'pill 6s cubic-bezier(0.77, 0, 0.175, 1) infinite',
        'pill-a': 'pill-a 6s ease infinite',
        'pill-b': 'pill-b 6s ease infinite',
        ring: 'ring 3.6s cubic-bezier(0.23, 1, 0.32, 1) infinite',
      },
      fontFamily: {
        'brlight': ['var(--font-manrope)', 'system-ui', 'sans-serif'],
        'brreg': ['var(--font-manrope)', 'system-ui', 'sans-serif'],
        'brmedium': ['var(--font-manrope)', 'system-ui', 'sans-serif'],
        'brsemi': ['var(--font-manrope)', 'system-ui', 'sans-serif'],
        'brbold': ['var(--font-manrope)', 'system-ui', 'sans-serif'],
      },
      screens: {
        'sm': '376px',
        'mm': '415px',
        // => @media (min-width: 992px) { ... }
      },

    },
  },
  plugins: [
    require("tailwindcss-animate"),
    // Manrope is one variable font: the old per-weight family names now just pick a weight
    function ({ addUtilities }) {
      addUtilities({
        ".font-brlight": { fontWeight: "300" },
        ".font-brreg": { fontWeight: "400" },
        ".font-brmedium": { fontWeight: "500" },
        ".font-brsemi": { fontWeight: "600" },
        ".font-brbold": { fontWeight: "700" },
      });
    },
  ],
}