# learn-mini-vue

## jest 单元测试环境搭建

### 初始化

`yarn init -y`
`npx tsc --init`
`yarn add jest @types/jest --dev`

### jest 支持 esm 规范

**使用 Babel**

```code
yarn add --dev babel-jest @babel/core @babel/preset-env

babel.config.js,通过配置 Babel 使其能够兼容当前的 Node 版本
module.exports = {
  presets: [['@babel/preset-env', {targets: {node: 'current'}}]],
};
```

**使用 Typescript**

```code
yarn add --dev @babel/preset-typescript

 @babel/preset-typescript 添加到 babel.config.js 中的 presets 列表中
 babel.config.js
module.exports = {
  presets: [
    ['@babel/preset-env', {targets: {node: 'current'}}],
    '@babel/preset-typescript',
  ],
};
```

```code
// 强制转换为Boolean 用 !!
var bool = !!"c";
console.log(typeof bool); // boolean

// 强制转换为Number 用 +
var num = +"1234";
console.log(typeof num); // number

// 强制转换为String 用 ""+
var str = ""+ 1234;
console.log(typeof str); // string
```