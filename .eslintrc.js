module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ['plugin:vue/vue3-essential', '@vue/airbnb'],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    semi: 'off',
    'no-trailing-spaces': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-param-reassign': [
      'error',
      {
        props: true,
        ignorePropertyModificationsFor: ['item'],
      },
    ], // forEach中 用item指代子项不会报错
    // "object-curly-newline" : [ "error", {
    //   "ObjectPattern": { "multiline": true }, //花括号内如果换行则都换行，如果没换行则都不换行
    // }]
    'object-curly-newline': 'off',
    'func-names': 'off',
    'object-shorthand': 'off',
    'import/extensions': 'off',
    'vue/no-unused-components': 'off',
    'no-unused-vars': 'off',
    'max-len': [2, { code: 300, tabWidth: 2, ignoreUrls: true }],
    'no-plusplus': 'off',
    'import/prefer-default-export': 'off'
  },
};
