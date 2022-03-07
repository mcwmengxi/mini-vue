import { createRenderer } from "../runtime-core";

// 初始化createRenderer的options参数
function createElement(type){
  return document.createElement(type)
}

function patchProp(el,key,prevVal,nextVal){
  const isOn = (key:string) => /^on[A-Z]/.test(key)

  if(isOn(key)){
    const event = key.slice(2).toLowerCase()
    el.addEventListener(event,nextVal)
  }else{
    if(nextVal===undefined || nextVal === null){
      // key移除，删除原来的key
      el.removeAttribute(key)
    }else{
      el.setAttribute(key,nextVal)
    }
  }
}

function insert(el,parent){
  parent.append(el)
}

const renderer:any = createRenderer({
  createElement,
  patchProp,
  insert,  
})

export function createApp(...args){
  return renderer.createApp(...args)
}
export * from "../runtime-core";