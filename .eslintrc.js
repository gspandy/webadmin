module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true
  },
  // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
  extends: 'standard',
  // required to lint *.wpy files
  plugins: [
    'html'
  ],
  settings: {
    'html/html-extensions': ['.html', '.wpy']
  },
  // add your custom rules here
  'rules': {
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,

    //缩进用tab
    // "indent": ["error", "tab"],
    //缩进用4个空格
    "indent": ["error", 4],
    "semi": [2, "always"],
    "no-tabs":"off",
    "space-before-blocks": ["error", { "functions": "always", "keywords": "always", "classes": "always" }],
    //最多空几行
    "no-multiple-empty-lines": ["error", { "max": 2}],
    //文档结尾换行状态
    "eol-last": ["error", "always"],
    // != ===
    "eqeqeq": 0,
    "brace-style": ["error", "stroustrup"],
    "no-useless-return": "error",


    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'space-before-function-paren': 0
  }
}
