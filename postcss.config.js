const poscssEasyImport = require("postcss-easy-import");
const autoprefixer = require("autoprefixer");
const postcssMqpacker = require("css-mqpacker");

module.exports = {
  plugins: [
    postcssMqpacker({
      sort: true
    }),
    poscssEasyImport({ prefix: "_" }),
    autoprefixer()
  ]
};
