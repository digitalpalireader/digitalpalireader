// NOTE: This config is used for both service worker and web app entry point. Set entry from command line.

module.exports = {
  mode: 'production',
  devtool: 'source-map',
  output: {
    publicPath: '',
    clean: true,
    environment: {
      arrowFunction: false,
      bigIntLiteral: false,
      const: false,
      destructuring: false,
      dynamicImport: false,
      forOf: false,
      module: false,
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
}
