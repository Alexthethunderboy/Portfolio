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
        obsidian: '#09090b', // zinc-950
        carbon: '#18181b', // zinc-900
        metallic: '#f4f4f5', // zinc-100
        silver: '#a1a1aa', // zinc-400
        neon: {
          primary: '#00F0FF', // Glowing Cyan
          secondary: '#FF0055', // Glowing Magenta
          accent: '#7B61FF', // Deep Violet
          danger: '#FF453A',
        },
        glass: {
          light: 'rgba(255, 255, 255, 0.06)',
          border: 'rgba(255, 255, 255, 0.12)',
          highlight: 'rgba(255, 255, 255, 0.05)',
        }
      },

      animation: {
        'blob': 'blob 20s infinite',
        'blob-reverse': 'blob-reverse 25s infinite',
      },
      keyframes: {
        blob: {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
          '100%': { transform: 'translate(0px, 0px) scale(1)' },
        },
        'blob-reverse': {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(-30px, 50px) scale(1.1)' },
          '66%': { transform: 'translate(20px, -20px) scale(0.9)' },
          '100%': { transform: 'translate(0px, 0px) scale(1)' },
        }
      }
    },
  },
  plugins: [],
};
