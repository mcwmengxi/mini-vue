import { h } from "../../lib/guide-mini-vue.esm.js"

export const App = {
  render() {
    // ui
    return h(
      "div",
      {
        id:"root",
        class:["green","bold"],
      },
      
      [h("p",{class:"green"},"hi"),h("p",{class:"blue"},"nangong")]
      //  '',"hi, " + this.msg
       );
  },

  setup() {
    return {
      msg: "mini-vue",
    };
  },
};
