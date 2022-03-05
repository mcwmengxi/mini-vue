import { h } from "../../lib/guide-mini-vue.esm.js"
import {Foo} from './Foo.js'

window.self = null;
export const App = {
  render() {
    window.self = this
    // ui
    return h(
      "div",
      {
        id:"root",
        class:["green","bold"],
        onClick() {
          console.log("click事件注册测试");
        },
        onMousedown(){
          console.log("mousedown事件注册测试")
        }
      },
      
      [
        h("p",{class:"green"},"hi"),h("p",{class:"blue"},"nangong, "+this.msg),
        h(Foo)
      ]
      //  {id:"root"},"hi, " + this.msg
       );
  },

  setup() {
    return {
      msg: "mini-vue",
    };
  },
};
