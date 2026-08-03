/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './packages/docs/**/*.{md,ts,vue}',
    './packages/docs/.vitepress/**/*.{js,ts,vue}',
    './packages/docs/.vitepress/theme/**/*.{js,ts,vue}',
    '!./packages/docs/.vitepress/dist/**',
    '!./packages/docs/.vitepress/cache/**',
    '!./packages/docs/.vitepress/.temp/**',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
