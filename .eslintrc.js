module.exports = {
  env: {
    browser: true,
    es6: true, // NOTE: Check https://kangax.github.io/compat-table/es2016plus/ before updating
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 10,
    sourceType: 'module',
  },
  rules: {
    semi: ['error', 'never'],
    'no-underscore-dangle': ['error', { allowAfterThis: true }],
    'max-len': ['error', { code: 140 }],
  },
  globals: {
    importScripts: true,
    workbox: true,
    self: true,
  },
}
