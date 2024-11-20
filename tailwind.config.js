/** @type {import('tailwindcss').Config} */
// https://www.tailwindcss.cn/
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
  corePlugins: {
    // 禁用默认样式
    preflight: false,
  },
};
