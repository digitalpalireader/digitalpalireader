module.exports = {
  mode: 'production',
  entry: './_dprhtml/js/index.js',
  devtool: 'source-map',
  output: {
    publicPath: '',
    filename: 'index.js',
    clean: true,
  },
}
