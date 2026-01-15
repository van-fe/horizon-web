/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './packages/docs/**/*.{md,ts,vue}',
    './packages/docs/.vitepress/**/*.{js,ts,vue}',
    './packages/docs/.vitepress/theme/**/*.{js,ts,vue}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
  