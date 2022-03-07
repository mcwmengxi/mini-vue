import {App} from './App.js'

import { createRenderer } from "../../lib/guide-mini-vue.esm.js";

// 可自动创建一个canvas标签
// PIXI.Application建立的同时会自动建立render、ticker、root container。
const game = new PIXI.Application({
  width:400,
  height:400
})
//pixi自动创建canvas标签并添加到document文档中
document.body.append(game.view)

const { createApp } = createRenderer({
  createElement(type){
    if(type === 'rect'){
      const rect = new PIXI.Graphics();

      // Rectangle矩形
      rect.beginFill(0xDE3249);
      rect.drawRect(50, 50, 150, 150);
      rect.endFill();

      return rect
    }
  },
  patchProp(el, key, val) {
    el[key] = val;
  },
  insert(el, parent) {
    parent.addChild(el);
  },
})
// const rootContainer = document.querySelector('#app')
// game.stage根显示容器
createApp(App).mount(game.stage)