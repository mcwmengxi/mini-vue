import { h } from "../../lib/guide-mini-vue.esm.js";

export const Foo = {
  setup() {
    // props.count
    // console.log(props);

    // 3.
    // shallow readonly
    // props.count++
    // console.log(props);
    return{
      count:0
    }
  },
  render() {
    return h("div", {}, "foo: " + this.count);
  },
};
