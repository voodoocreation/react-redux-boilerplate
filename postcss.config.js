const autoprefixer = require("autoprefixer");
const postcssMqpacker = require("css-mqpacker");

module.exports = {
  plugins: [
    postcssMqpacker({
      sort: true
    }),
    autoprefixer()
  ]
};
