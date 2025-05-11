/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        gray: {
          400: '#9ca3af',
          600: '#4b5563',
          800: '#1f2937',
          900: '#111827',
        },
        indigo: {
          600: '#4f46e5',
        },
      },
    },
  },
  plugins: [],
} 