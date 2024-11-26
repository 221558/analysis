module.exports = {
  extends: ['eslint-config-ali/vue', 'prettier', 'prettier/vue'],
  rules: {
    'vue/require-prop-type-constructor': 0,
    // 忽略 :deep 用法的警告
    'vue/deep-slots-deprecated': 'off',
  },
  env: {
    'vue/setup-compiler-macros': true,
  },
};
