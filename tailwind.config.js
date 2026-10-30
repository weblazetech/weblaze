/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // Toggle via 'dark' class on <html> or <body>
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './*.{js,ts,jsx,tsx,html}',
  ],
  theme: {
    extend: {
      colors: {
        // Brand Semantic Tokens mapping to CSS variables
        canvas: 'var(--canvas)',
        surface: {
          DEFAULT: 'var(--surface)',
          hover: 'var(--surface-hover)',
        },
        border: {
          DEFAULT: 'var(--border)',
          strong: 'var(--border-strong)',
        },
        content: {
          heading: 'var(--text-heading)',
          body: 'var(--text-body)',
          muted: 'var(--text-muted)',
        },
        primary: {
          DEFAULT: 'var(--primary)',
          hover: 'var(--primary-hover)',
          active: 'var(--primary-active)',
          foreground: 'var(--primary-fg)',
        },
        accent: {
          DEFAULT: 'var(--accent)',
          surface: 'var(--accent-surface)',
          text: 'var(--accent-text)',
          ring: 'var(--accent-ring)',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Poppins', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'card-dark': '0 4px 20px -2px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.05)',
        'card-light': '0 4px 20px -2px rgba(0, 0, 0, 0.05), 0 1px 2px 0 rgba(0, 0, 0, 0.04)',
        'focus-ring': '0 0 0 3px var(--accent-ring)',
      },
    },
  },
  plugins: [],
};
