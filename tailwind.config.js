/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: { backgroundColor: {
      brand: '#DFEDFF',
    },
    textColor: {
      brand: '#DFEDFF',
    },
    fill: {
      brand: '#DFEDFF',
    },},
  },
  plugins: [
    require('flowbite/plugin')
  ],
  darkMode: 'class',
}

