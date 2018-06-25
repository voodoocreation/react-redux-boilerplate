const path = require("path");
const glob = require("glob");
const PluginExtractText = require("extract-text-webpack-plugin");
const withTypescript = require("@zeit/next-typescript");

const configCSSLoaders = env => {
  let cssLoader = { loader: "css-loader" };
  const postcssLoader = { loader: "postcss-loader" };
  const sassLoader = {
    loader: "sass-loader",
    options: {
      includePaths: ["src/scss", "node_modules"]
        .map(d => path.join(__dirname, d))
        .map(g => glob.sync(g))
        .reduce((acc, cur) => acc.concat(cur), [])
    }
  };

  const mediaQueryLoader = {
    loader: "group-css-media-queries-loader",
    options: {
      sourceMap: false
    }
  };

  if (env === "production") {
    cssLoader = {
      loader: "css-loader",
      options: {
        minimize: true
      }
    };
  }

  return [cssLoader, mediaQueryLoader, postcssLoader, sassLoader];
};

module.exports = withTypescript({
  distDir: "dist",
  webpack: config => {
    config.module.rules.push(
      {
        test: /\.(css|scss)/,
        loader: "emit-file-loader",
        options: {
          name: "[path][name].[ext]"
        }
      },
      {
        test: /\.css$/,
        use: ["babel-loader", "raw-loader", "postcss-loader"]
      },
      {
        test: /\.(svg)$/,
        use: "svg-loader"
      },
      {
        test: /\.(jpg|jpeg|png)$/,
        use: "file-loader"
      }
    );

    if (process.env.NODE_ENV === "production") {
      config.module.rules.push({
        test: /\.s(a|c)ss$/,
        use: PluginExtractText.extract({
          fallback: "style-loader",
          use: configCSSLoaders(process.env.NODE_ENV)
        })
      });

      config.plugins.push(
        new PluginExtractText({
          filename: "/assets/main.css",
          allChunks: true
        })
      );
    } else {
      config.module.rules.push({
        test: /\.s(a|c)ss$/,
        use: [
          "babel-loader",
          "raw-loader",
          {
            loader: "group-css-media-queries-loader",
            options: { sourceMap: false }
          },
          "postcss-loader",
          {
            loader: "sass-loader",
            options: {
              includePaths: ["src/scss", "node_modules"]
                .map(d => path.join(__dirname, d))
                .map(g => glob.sync(g))
                .reduce((acc, cur) => acc.concat(cur), [])
            }
          }
        ]
      });
    }

    return config;
  }
});
