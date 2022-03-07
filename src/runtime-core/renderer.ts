import { ShapeFlags } from '../shared/shapeFlags';
import { isObject } from './../shared/index';
import { createComponentInstance, setupComponent } from "./component"
import { Fragment, Text } from './vnode';

export function render(vnode:any, container:any){
  patch(vnode,container,null)
}

// 
function patch(vnode,container,parentComponent){
  // 原生标签,采用位运算符比较
  const { shapeFlag, type } = vnode

  switch(type){
    case Fragment:
      processFragment(vnode,container,parentComponent)
      break
    case Text:
      processText(vnode,container)
      break
    default :
      // 按位与 相等的判断
      if(shapeFlag & ShapeFlags.ELEMENT){
        processElement(vnode,container,parentComponent)
      }else if(shapeFlag & ShapeFlags.STATEFUL_COMPONENT){
        // 处理组件
        processComponent(vnode,container,parentComponent)
      }
      break
  }
}
function processFragment(vnode,container,parentComponent){
  // 直接渲染子节点
  mountChildren(vnode,container,parentComponent)
}
// 文本节点添加
function processText(vnode,container){
  const { children } = vnode
  const textNode  = (vnode.el = document.createTextNode(children))
  container.append(textNode )
}
function processElement(vnode,container,parentComponent){
  mountElement(vnode,container,parentComponent)
}

function processComponent(vnode,container,parentComponent){
  mountComponent(vnode,container,parentComponent)
}

// vnode==>initialVNode 更加语义化
function mountComponent(initialVNode,container,parentComponent){
  // 创建组件实例
  const instance = createComponentInstance(initialVNode,parentComponent)

   // setup的时候给组件添加代理对象
  setupComponent(instance)
  setupRenderEffect(instance,initialVNode,container)
}

function mountElement(vnode,container,parentComponent){
  // 创建真实dom,同时把el放在VNode节点上
  // const el = document.createElement(vnode.type)
  const el = (vnode.el = document.createElement(vnode.type));
  const { children, props, shapeFlag } = vnode
  // 处理子节点，是文本还是标签
  if(shapeFlag & ShapeFlags.TEXT_CHILDREN){
    el.textContent = children
  }else if(shapeFlag & ShapeFlags.ARRAY_CHILDREN){
    mountChildren(vnode,el,parentComponent)
  }

  // 属性
  for(const key in props){
    // 判断是否是事件注册
    const isOn = (key:string) => (/^on[A-Z]/.test(key))
    if(isOn(key)){
      const event = key.slice(2).toLowerCase()
      el.addEventListener(event,props[key]) 
    }else{
      el.setAttribute(key,props[key])
    }
  }
  // 添加到根标签上
  container.append(el)
}

function mountChildren(vnode,container,parentComponent){
  vnode.children.forEach(v => {
    // 递归添加子标签
    patch(v,container,parentComponent)
  });
}

// render渲染dom
function setupRenderEffect(instance,initialVNode,container){
  // 调用组件实例的render()
  // 绑定到代理对象上
  const { proxy }  = instance
  const subTree = instance.render.call(proxy)
  // if(instance.render){  
  //  subTree 
  // }

  // 递归遍历
  patch(subTree,container,instance)

  initialVNode.el = subTree.el

}