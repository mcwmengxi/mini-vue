import { h } from "../../lib/guide-mini-vue.esm.js"

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
      },
      
      [h("p",{class:"green"},"hi"),h("p",{class:"blue"},"nangong, "+this.msg)]
      //  {id:"root"},"hi, " + this.msg
       );
  },

  setup() {
    return {
      msg: "mini-vue",
    };
  },
};
