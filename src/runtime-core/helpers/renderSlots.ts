import { createVNode } from "../vnode"

export function renderSlots(slots,name,props){
  // 获取对应slot,props为作用域插槽使用
  const slot = slots[name]
  if(slot){
    if(typeof slot === 'function'){
      return createVNode('div',{},slot(props))
    }
  }
}