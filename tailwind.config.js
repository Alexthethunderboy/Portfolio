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
        white: '#FFFFFF',
        graphite: {
          DEFAULT: '#5B5D5C', // secondary text on light grounds
          light: '#8C8E8D', // secondary text on Carbon
        },
        storm: '#111A2E', // flat field only
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
