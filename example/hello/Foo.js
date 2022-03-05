import { h } from "../../lib/guide-mini-vue.esm.js";

export const Foo = {
  setup(props) {
    // props.count
    console.log(props);

    // 3.
    // shallow readonly,warning警告
    props.count++
    console.log(props);

  },
  render() {
    return h("div", {}, "foo: " + this.count);
  },
};
