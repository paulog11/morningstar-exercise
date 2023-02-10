const plugin = require("tailwindcss/plugin");

module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{vue,js,ts,jsx,tsx}",
      ],
      theme: {
        colors: {
          lightgrey: "#E9EFFF",
          secondarygrey: "#5E5E5E"
        },
        extend: {},
      },
      plugins: []
}