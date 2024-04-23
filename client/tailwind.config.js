const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    flowbite.content(), // Добавляем путь к содержимому Flowbite
  ],
  theme: {
    extend: {},
  },
  plugins: [
    flowbite.plugin(), // Добавляем плагин Flowbite
  ],
};
