/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        carbon: '#050505',
        voltage: '#FFD400',
        warm: '#EEEAE2',
        graphite: '#6E706F',
        storm: '#111A2E',
        violet: '#261A3B',
        night: '#0E201D',
      },
      fontFamily: {
        display: ['var(--font-display)', 'Arial Black', 'Arial', 'sans-serif'],
        body: ['Arial', 'Helvetica', 'sans-serif'],
        mono: ['var(--font-mono)', 'Menlo', 'Consolas', 'monospace'],
      },
      transitionTimingFunction: {
        'tb-out': 'cubic-bezier(0.16, 1, 0.3, 1)',
      }
    },
  },
  plugins: [],
};
