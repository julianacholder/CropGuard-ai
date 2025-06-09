/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
        colors: {
        sidebar: '#FFFFFF', // or any color you want
        'sidebar-foreground': '#FFFFFF',
      },
    },
  },
  plugins: [],
}
