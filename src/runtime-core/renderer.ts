import { createComponentInstance, setupComponent } from "./component"

export function render(vnode:any, container:any){
  patch(vnode,container)
}

function patch(vnode,container){
  processComponent(vnode,container)
}

function processComponent(vnode,container){
  mountcomponent(vnode,container)
}

function mountcomponent(vnode,container){
  const instance = createComponentInstance(vnode)

  setupComponent(instance)
  setupRenderEffect(instance,container)
}

function setupRenderEffect(instance,container){
  // 调用组件实例的render()
  let subTree
  if(instance.render){  
   subTree = instance.render()
  }

  patch(subTree,container)
}