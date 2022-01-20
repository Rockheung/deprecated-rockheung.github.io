---
layout: post
title: 'Prettier & ESLint in VSCode'
date: 2019-03-28 00:00:00.123 +0900
categories: Study
tags: codestates javascript bootcamp
---

### @ VSCode

- VSCode Extension: Prettier - Code Formatter

### trailingComma는 무엇?

> JavaScript has allowed trailing commas in **array** literals since the beginning, and later added them to **object** literals (ECMAScript 5) and most recently (ECMAScript 2017) to **function** parameters.
> **JSON**, however, disallows trailing commas.

- "none" - No trailing commas
- "es5" - Trailing commas where valid in ES5 (objects, arrays, etc)
- "all" - Trailing commas wherever possible (function arguments)

[DOC: Settings](https://github.com/prettier/prettier-vscode#settings)

> .prettierrc: 사실 다음 값이 defualt

```javascript
{
  "trailingComma": "none",
  "tabWidth": 2,
  "semi": true,
  "singleQuote": false
 }
```

> settings.json: vscode setting.json

```javascript
{
  "editor.formatOnSave": false,
  "[javascript]": {
    "editor.formatOnSave": true
  },
  "[javascriptreact]": {
    "editor.formatOnSave": true
  },
  "javascript.format.enable": false
}
```

- VSCode Extension: ESLint: 작성중
  airbnb lint 규칙이 react 규칙을 포함하나 꽤 엄밀하여 당장은 필요없다고 판단.

> .eslintrc.js

```javascript
module.exports = {
  extends: 'standard',
  rules: {
    'no-undef-init': 0,
    semi: [2, 'always'],
    'no-path-concat': 0,
  },
};
```

```shell
npm install -g eslint-config-standard \
  eslint-plugin-import \
  eslint-plugin-node \
  eslint-plugin-promise \
  eslint-plugin-standard
```

> Written with [StackEdit](https://stackedit.io/).
