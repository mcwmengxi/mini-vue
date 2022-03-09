import {
  h,
  ref,
  nextTick
} from "../../lib/guide-mini-vue.esm.js";

export default {
  name: "App",
  setup() {
    const count = ref(0);
    const add = () => {
      count.value++;
      count.value++;
      count.value++;
    };

    return {
      count,
      add,
    };
  },
  render() {
    console.log('render');
    const divNode = document.getElementById('div')
    if(divNode){
      console.log(divNode.innerHTML);
      setTimeout(()=>{
        console.log("setTimeout",divNode.innerHTML);
      },0)
      nextTick(()=>{
        console.log("nextTick",divNode.innerHTML);
      })
      setTimeout( async()=>{
        await nextTick()
      },0)
    }
    const button =h(
      'button',
      {
        id:'btn',
        onClick: this.add,
      },
      'add'
    )
    const div = h('div', {id:'div'}, `count: ${this.count}`)
    return h("div", {}, [div,button]);;
  },
};
