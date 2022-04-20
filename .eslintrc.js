/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript/recommended',
    '@vue/eslint-config-prettier',
  ],
  env: {
    'vue/setup-compiler-macros': true,
  },
  rules: {
    semi: [2, 'never'],
    'no-console': 'off',
    'vue/multi-word-component-names': 'off',
    'prettier/prettier': ['error', { semi: false, singleQuote: true, printWidth: 120 }],
    'no-unused-vars': 'off',
    'import/named': 'off',
  },
}
