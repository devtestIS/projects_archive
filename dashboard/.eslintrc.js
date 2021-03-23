module.exports = {
  root: true,

  env: {
    node: true,
  },

  extends: ['plugin:vue/strongly-recommended', '@vue/prettier'],

  rules: {
    'no-console': 'off',
    'no-debugger': 'off',
  },

  parserOptions: {
    parser: 'babel-eslint',
  },

  overrides: [
    {
      files: ['**/__tests__/*.{j,t}s?(x)', '**/tests/unit/**/*.spec.{j,t}s?(x)'],
      env: {
        jest: true,
      },
    },
  ],

  extends: ['plugin:vue/strongly-recommended', '@vue/prettier'],
  extends: ['plugin:vue/essential', '@vue/prettier'],

  extends: ['plugin:vue/recommended', '@vue/prettier'],
};
