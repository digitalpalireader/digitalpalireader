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
    'no-unused-vars': ['error', { varsIgnorePattern: '^_', argsIgnorePattern: '^_' }],
    'max-len': ['error', { code: 140 }],
    'func-names': ['error', 'as-needed'],
    'import/extensions': ['error', { js: 'ignorePackages', json: 'ignorePackages' }],

    // Rules that have been disabled.
    'no-underscore-dangle': 0, // NOTE: So that we enable the convention for _ prefixes for private members and unused vars.
    'no-restricted-globals': ['error', 'event', 'fdescribe'], // NOTE: So that self, globalThis etc. can be used.
    strict: 0, // NOTE: So that ES5 can be brought under eslint
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
