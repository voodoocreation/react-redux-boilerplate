const withSass = require("@zeit/next-sass");
const PluginLodashModuleReplacement = require("lodash-webpack-plugin");
const FilterWarningsPlugin = require("webpack-filter-warnings-plugin");

const getPages = () => ({
  "/": { page: "/" }
});

module.exports = withSass({
  distDir: "dist",
  poweredByHeader: false,
  exportPathMap: async () => getPages(),
  webpack: (config, { dev }) => {
    config.module.rules.push(
      {
        test: /\.(svg)$/,
        use: "svg-loader"
      },
      {
        test: /\.(jpg|jpeg|png)$/,
        use: "file-loader"
      }
    );

    config.plugins.push(
      new PluginLodashModuleReplacement(),

      new FilterWarningsPlugin({
        exclude: /Conflicting order between:/
      })
    );

    return config;
  }
});
