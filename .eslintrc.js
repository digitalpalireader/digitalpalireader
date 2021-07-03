module.exports = {
  env: {
    browser: true,
    es6: true, // NOTE: Check https://kangax.github.io/compat-table/es2016plus/ before updating
    'jest/globals': true,
  },
  extends: [
    'airbnb-base',
  ],
  plugins: [
    'jest',
  ],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 10,
    sourceType: 'module',
    allowImportExportEverywhere: true,
  },
  rules: {
    semi: ['error', 'never'],
    'no-underscore-dangle': 0,
    'no-unused-vars': ['error', { varsIgnorePattern: '^_', argsIgnorePattern: '^_' }],
    'max-len': ['error', { code: 140 }],
    'func-names': ['error', 'as-needed'],
    'import/extensions': ['error', { js: 'ignorePackages', json: 'ignorePackages' }],
  },
  globals: {
    importScripts: true,
    workbox: true,
    self: true,
    ko: true,
    $: true,
    luxon: true,
  },
}
