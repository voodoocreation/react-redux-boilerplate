const path = require('path');
const glob = require('glob');
const PluginExtractText = require('extract-text-webpack-plugin');

const configCSSLoaders = (env) => {
  let cssLoader = { loader: 'css-loader' };
  const postcssLoader = { loader: 'postcss-loader' };
  const sassLoader = {
    loader: 'sass-loader',
    options: {
      includePaths: ['src/styles', 'node_modules']
        .map(d => path.join(__dirname, d))
        .map(g => glob.sync(g))
        .reduce((acc, cur) => acc.concat(cur), []),
    },
  };

  if (env === 'production') {
    cssLoader = {
      loader: 'css-loader',
      options: {
        minimize: true,
      },
    };
  }

  return [cssLoader, postcssLoader, sassLoader];
};

module.exports = {
  distDir: 'dist',
  webpack: (config) => {
    config.module.rules.push(
      {
        test: /\.(css|scss)/,
        loader: 'emit-file-loader',
        options: {
          name: 'dist/[path][name].[ext]',
        },
      }, {
        test: /\.css$/,
        use: ['babel-loader', 'raw-loader', 'postcss-loader'],
      },
    );

    if (process.env.NODE_ENV === 'production') {
      config.module.rules.push({
        test: /\.s(a|c)ss$/,
        use: PluginExtractText.extract({
          fallback: 'style-loader',
          use: configCSSLoaders(process.env.NODE_ENV),
        }),
      });

      config.plugins.push(
        new PluginExtractText({
          filename: '/assets/app.css',
          allChunks: true,
        }),
      );
    } else {
      config.module.rules.push({
        test: /\.s(a|c)ss$/,
        use: ['babel-loader', 'raw-loader', 'postcss-loader',
          { loader: 'sass-loader',
            options: {
              includePaths: ['styles', 'node_modules']
                .map(d => path.join(__dirname, d))
                .map(g => glob.sync(g))
                .reduce((acc, cur) => acc.concat(cur), []),
            },
          },
        ],
      });
    }

    return config;
  },
};
