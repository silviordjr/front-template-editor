module.exports = {
    important: true,
    content: [
      './pages/**/*.{ts,tsx}',
      './pages/*.tsx',
      './components/**/*.{ts,tsx}',
      './components/*.tsx',
    ],
    darkMode: 'media',
    theme: {
      screens: {
        xxs: "180px",
        xs: "320px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        xxl: "1536px",
      },
    },
    variants: {
      extend: {},
    },
    plugins: [
      require("@tailwindcss/aspect-ratio"),
    ],
  };