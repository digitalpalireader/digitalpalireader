module.exports = {
  mode: 'production',
  entry: './sw.temp.js',
  devtool: 'source-map',
  output: {
    filename: './sw.js',
    clean: true,
  },
}
