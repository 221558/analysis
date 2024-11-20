// 定义并导出一个配置对象，用于设定代码的格式化规则
module.exports = {
  // 指定每行的最大打印宽度，以字符为单位
  printWidth: 200,
  // 定义制表符的宽度，即每个制表符相当于多少个空格
  tabWidth: 2,
  // 表示语句末尾是否需要添加分号，true为需要，false为不需要
  semi: true,
  // 指定是否使用单引号替代双引号，true为使用单引号，false为使用双引号
  singleQuote: true,
  // 指定是否在数组或对象的最后一项后添加尾随逗号，'all'表示总是添加
  trailingComma: 'all',
  // 指定箭头函数的参数何时需要圆括号，'always'表示总是需要
  arrowParens: 'always',
};
