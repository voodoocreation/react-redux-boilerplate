const webpack = require("webpack");
const withSass = require("@zeit/next-sass");
const withTypescript = require("@zeit/next-typescript");
const PluginLodashModuleReplacement = require("lodash-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

const getPages = () => ({
  "/": { page: "/" }
});

module.exports = withSass(
  withTypescript({
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
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
      );

      if (!dev) {
        config.plugins.push(new OptimizeCSSAssetsPlugin({}));
      }

      return config;
    }
  })
);
