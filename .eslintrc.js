module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/recommended',
    'eslint:recommended',
  ],
  parserOptions: {
    parser: '@babel/eslint-parser',
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    quotes: ['error', 'single'], // 使用单引号
    'comma-dangle': ['error', 'only-multiline'], // 多行时才可以使用尾随逗号
    semi: ['error', 'never'], // 不要尾随分号
    'vue/max-attributes-per-line': ['error', {
      singleline: 5,
      multiline: 1,
    }], // 属性换行配置
    indent: ['error', 2, { SwitchCase: 1 }], // 强制执行一致的缩进样式
    'vue/singleline-html-element-content-newline': 'off', // 单行元素内容换行
    'no-unused-vars': [
      'warn',
      {
        vars: 'all', // 检测所有变量
        args: 'none', // 忽略函数参数
        caughtErrors: 'none', // 忽略 catch 语句的参数
        ignoreRestSiblings: true, // 忽略剩余子项 fn(...args)
      }
    ],
  },
}
