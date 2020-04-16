const webpack = require('webpack');
const path = require('path');
const srcPath = path.join(__dirname, 'app');

module.exports = {
  entry: {
    entry: path.resolve(srcPath + '/index.tsx')
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx", ".styl"],
    modules: [
      'node_modules'
    ]
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)?$/, loader: 'awesome-typescript-loader',
      },
      {
        test: /\.styl$/,
        include: srcPath,
        use: [
          'style-loader',
          {
            loader: 'typings-for-css-modules-loader',
            options: {
              modules: true,
              namedExport: true,
              localIdentName: "[name]_[local]__[hash:base64:5]"
            }
          },
          'stylus-loader'
        ]
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              exportOnlyLocals: true
            }
          }
        ]
      }
    ]
  }
};
