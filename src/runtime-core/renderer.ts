import { isObject } from './../shared/index';
import { createComponentInstance, setupComponent } from "./component"

export function render(vnode:any, container:any){
  patch(vnode,container)
}

function patch(vnode,container){
  // 原生标签
  if(typeof vnode.type === 'string'){
    processElement(vnode,container)
  }else if(isObject(vnode.type)){
    // 处理组件
    processComponent(vnode,container)
  }
}

function processElement(vnode,container){
  mountElement(vnode,container)
}

function processComponent(vnode,container){
  mountcomponent(vnode,container)
}

function mountcomponent(vnode,container){
  const instance = createComponentInstance(vnode)

  setupComponent(instance)
  setupRenderEffect(instance,container)
}

function mountElement(vnode,container){
  // 创建真实dom

  const el = document.createElement(vnode.type)
  const { children, props } = vnode
  // 处理子节点，是文本还是标签
  if(typeof children === 'string'){
    el.textContent = children
  }else if(Array.isArray(children)){
    mountChildren(vnode,el)
  }

  // 属性
  for(const key in props){
    el.setAttribute(key,props[key])
  }
  // 添加到根标签上
  container.append(el)
}

function mountChildren(vnode,container){
  vnode.children.forEach(v => {
    // 递归添加子标签
    patch(v,container)
  });
}
function setupRenderEffect(instance,container){
  // 调用组件实例的render()
  let subTree
  if(instance.render){  
   subTree = instance.render()
  }

  patch(subTree,container)
}