import { ShapeFlags } from "../shared/shapeFlags";

export function initSlots(instance,children){
  const { vnode } = instance
  // children是slots的情况
  if(vnode.shapeFlag & ShapeFlags.SLOTS_CHILDREN){
    normalizeObjectSlots(children, instance.slots); 
  }
}

function normalizeObjectSlots(children:any,slots:any){
  for(const key in children){
    const value = children[key]
    // 把children存放在实例的slots上，可供$slot获取
    
    slots[key] = (props) =>  normalizeSlotValue(value(props)) 
  }
}

function normalizeSlotValue(value) {
  // value为h函数调用结果，用做children进行再次渲染，需要转成数组形式
  return Array.isArray(value) ? value : [value];
}