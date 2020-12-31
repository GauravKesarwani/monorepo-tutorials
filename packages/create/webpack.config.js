const webpack = require('webpack');
const path = require('path');

module.exports = {
  // bundling mode
  mode: 'production',
  target: 'node',
  entry: './src/init.ts',
  output: {
    filename: 'main.js'
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  optimization: {
    minimize: false
  },
  plugins: [
    new webpack.BannerPlugin({
      banner: '#!/usr/bin/env node',
      raw: true
    })
  ],
  resolve: {
    extensions: ['.ts', '.js', '.json'],
    // these are needed in webpack 5. webpack < 5 used to include polyfills for node.js core modules by default.
    // This is no longer the case.
    /* If you want to include a polyfill, you need to:
        - add a fallback 'resolve.fallback: { "tty": require.resolve("tty-browserify") }'
        - install 'tty-browserify'
      If you don't want to include a polyfill, you can use an empty module like this:
        resolve.fallback: { "tty": false }
        */
    // uncomment in webpack 5
    fallback: {
      assert: false,
      path: false,
      crypto: false,
      stream: false,
      buffer: false,
      util: false,
      tty: false,
      fs: false,
      readline: false,
      'child_process': false,
      os: false,
      arrayify: require.resolve('array-back')
    }
  },
  node: {
    __dirname: false
  }
}