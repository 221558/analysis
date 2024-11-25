module.exports = {
  extends: ['eslint-config-ali/vue', 'prettier', 'prettier/vue'],
  rules: {
    'vue/require-prop-type-constructor': 0,
  },
  env: {
    'vue/setup-compiler-macros': true,
  },
};
