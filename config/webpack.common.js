const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const config = require('./config');

module.exports = {
  entry: {
    background: {
      import: path.join(config.src, 'apps/background/index.ts'),
      runtime: false,
    },
    options: {
      import: path.join(config.src, 'apps/options/index.tsx'),
      runtime: 'single',
    },
    popup: {
      import: path.join(config.src, 'apps/popup/index.tsx'),
      runtime: 'single',
    },
    style: {
      import: path.join(config.src, 'styles/index.ts'),
      runtime: 'single',
    },
  },
  output: {
    path: config.build,
    filename: 'js/[name].js',
    publicPath: '/',
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.join(config.src, 'assets'),
          to: 'assets',
          noErrorOnMissing: true,
        },
        {
          from: path.join(config.src, 'manifest.json'),
          noErrorOnMissing: true,
        },
      ],
    }),
    new HtmlWebpackPlugin({
      template: path.join(config.src, 'apps/options/index.html'),
      filename: 'options.html',
      chunks: ['style', 'options'],
    }),
    new HtmlWebpackPlugin({
      template: path.join(config.src, 'apps/popup/index.html'),
      filename: 'popup.html',
      chunks: ['style', 'popup'],
    }),
  ],
  module: {
    rules: [
      { test: /\.(?:ico|gif|png|jpg|jpeg)$/i, type: 'asset/resource' },
      { test: /\.(woff(2)?|eot|ttf|otf|svg|)$/, type: 'asset/inline' },
    ],
  },
  resolve: {
    modules: [config.src, 'node_modules'],
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
    alias: {
      '@': config.src,
    },
  },
};
