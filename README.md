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

## 功能实现

### vue

[✖️] vue打包入口 区分runtime/full-build构建

### reactivity模块

- [✔️] reactive 的实现
- [✔️] ref 的实现
- [✔️] readonly 的实现
- [✔️] 支持 isReactive
- [✔️] 支持嵌套 reactive
- [✔️] 支持 toRaw
- [✔️] 支持 unref
- [✖️] 支持 toRef
- [✖️] 支持 toRefs
- [✔️] 支持 isReadonly
- [✔️] 支持 isProxy
- [✔️] 支持 shallowReadonly
- [✔️] 支持 proxyRefs
- [✔️] track 依赖收集
- [✔️] trigger 触发依赖
- [✔️] 支持 effect.stop
- [✔️] 支持 effect.scheduler
- [✔️] computed 的实现(getter方式)
  
### shared

- [✔️✖️] 工具库，通用方法
- 
### runtime-dom

- [✖️] 浏览器的runtime，处理原生DOM API
- 
### runtime-core

- [✔️] 支持组件类型
- [✔️] 支持 setupRenderEffect
- [✔️] 支持 element 类型
- [✖️] 初始化 props
- [✖️] setup 可获取 props 和 context
- [✔️] 支持 component emit
- [✖️] 支持 proxy
- [✖️] 可以在 render 函数中获取 setup 返回的对象
- [✖️] 支持 getCurrentInstance
- [✖️] 支持 provide/inject
- [✖️] 支持 $el api
- [✖️] 更新 element 类型
- [✖️] 支持 Text 类型节点
- [✖️] nextTick 的实现
- [✖️] 支持最基础的 slots
### compiler-core
- [✖️] Parse AST的实现
- [✖️] Transform AST优化
- [✖️] Codegen 生成render函数
### compiler-dom
- [✖️] compiler 浏览器编译模块







## 初始化过程

#### 流程图

![img](https://s2.loli.net/2022/03/03/J1syVuEGtIgdO25.png)

## 更新过程



### 流程图

![img](https://s2.loli.net/2022/03/03/C2w4rcHstvNWj8p.png)

### 关键函数调用图

![img](https://s2.loli.net/2022/03/03/BGP8oK6ArXTQt2c.png)

### XMind

https://www.processon.com/view/link/6175765c7d9c08459faeddf0