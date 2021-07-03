module.exports = {
  mode: 'production',
  entry: './_dprhtml/js/index.js',
  devtool: 'source-map',
  output: {
    filename: 'index.js',
    clean: true,
  },
}
