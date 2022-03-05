import { ShapeFlags } from "../shared/shapeFlags"

export function createVNode(type,props?,children?){
  const vnode = {
    type,
    props,
    children,
    // 类型标记
    shapeFlag: getShapeFlag(type),
    el:null
  }
  // Operator: x |= y Meaning:  x  = x | y 
  // 标签和子标签 按位或
  if(typeof children === 'string'){
    vnode.shapeFlag |= ShapeFlags.TEXT_CHILDREN
  }else if (Array.isArray(children)){
    vnode.shapeFlag |= ShapeFlags.ARRAY_CHILDREN
  }
  return vnode
}

function getShapeFlag(type){
  // 判断标签是文本还是普通组件
  return typeof type === 'string' ? ShapeFlags.ELEMENT : ShapeFlags.STATEFUL_COMPONENT
}