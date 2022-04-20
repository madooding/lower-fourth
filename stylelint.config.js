/* eslint-disable no-undef */
module.exports = {
  plugins: ['stylelint-prettier', 'stylelint-scss'],
  extends: [
    'stylelint-config-standard',
    'stylelint-config-prettier',
    'stylelint-config-recommended-scss',
    'stylelint-config-recommended-vue/scss',
  ],
  // add your custom config here
  // https://stylelint.io/user-guide/configuration
  rules: {
    'prettier/prettier': [true, { singleQuote: true, tabWidth: 2 }],
    'at-rule-no-unknown': null,
    'selector-type-no-unknown': [
      true,
      {
        ignoreTypes: ['ion-icon'],
      },
    ],
    'selector-pseudo-element-no-unknown': [
      true,
      {
        ignorePseudoElements: ['v-deep'],
      },
    ],
    'declaration-block-trailing-semicolon': null,
    'no-descending-specificity': null,
    'scss/at-rule-no-unknown': true,
    'value-keyword-case': null,
    'length-zero-no-unit': null,
  },
}
