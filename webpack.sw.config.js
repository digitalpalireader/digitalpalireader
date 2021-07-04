module.exports = {
  mode: 'production',
  entry: './sw.temp.js',
  devtool: 'source-map',
  output: {
    publicPath: '',
    filename: './sw.js',
    clean: true,
  },
}
