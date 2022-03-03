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

## reactivity模块

目标是用自己的 reactivity 支持现有的 demo 运行

-  reactive 的实现
-  ref 的实现
-  readonly 的实现
-  computed 的实现
-  track 依赖收集
-  trigger 触发依赖
-  支持 isReactive
-  支持嵌套 reactive
-  支持 toRaw
-  支持 effect.scheduler
-  支持 effect.stop
-  支持 isReadonly
-  支持 isProxy
-  支持 shallowReadonly
-  支持 proxyRefs





## 初始化过程

#### 流程图

![img](https://s2.loli.net/2022/03/03/J1syVuEGtIgdO25.png)

## 更新过程



### 流程图

![img](https://s2.loli.net/2022/03/03/C2w4rcHstvNWj8p.png)

### 关键函数调用图

![img](https://s2.loli.net/2022/03/03/BGP8oK6ArXTQt2c.png)