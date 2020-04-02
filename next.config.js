/* eslint-disable @typescript-eslint/no-var-requires */
const withSass = require("@zeit/next-sass");
const FilterWarningsPlugin = require("webpack-filter-warnings-plugin");

const getPages = () => ({
  "/": { page: "/" },
});

module.exports = withSass({
  distDir: "dist",
  exportPathMap: async () => getPages(),
  exportTrailingSlash: true,
  poweredByHeader: false,
  webpack: (config) => {
    config.module.rules.push(
      {
        test: /\.(svg)$/,
        use: "svg-loader",
      },
      {
        test: /\.(jpg|jpeg|png)$/,
        use: "file-loader",
      }
    );

    config.plugins.push(
      new FilterWarningsPlugin({
        exclude: /Conflicting order between:/,
      })
    );

    return config;
  },
});
