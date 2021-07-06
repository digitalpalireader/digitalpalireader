module.exports = (api) => {
  let targets = 'defaults'
  if (api.env('test')) {
    targets = { node: 'current' }
  }

  const presets = [['@babel/preset-env', { targets }]]

  const plugins = [
    '@babel/plugin-transform-runtime',
  ]

  return {
    presets,
    plugins,
  }
}
