import { effect } from '../reactivity/effect';
import { ShapeFlags } from '../shared/shapeFlags';
import { isObject } from './../shared/index';
import { createComponentInstance, setupComponent } from "./component"
import { createAppAPI } from './createApp';
import { Fragment, Text } from './vnode';

export function createRenderer(options){
  const {
    createElement: hostCreateElement,
    patchProp: hostPatchProp,
    insert: hostInsert,
  } = options

  function render(vnode:any, container:any){
    patch(null,vnode,container,null)
  }
  
  /**
   * @params n1 oldVNode
   * @params n2 newVNode
   * @return 
   */
  function patch(n1, n2, container, parentComponent){
    // 原生标签,采用位运算符比较
    const { shapeFlag, type } = n2
  
    switch(type){
      case Fragment:
        processFragment(n1, n2, container,parentComponent)
        break
      case Text:
        processText(n1, n2, container)
        break
      default :
        // 按位与 相等的判断
        if(shapeFlag & ShapeFlags.ELEMENT){
          processElement(n1, n2, container,parentComponent)
        }else if(shapeFlag & ShapeFlags.STATEFUL_COMPONENT){
          // 处理组件
          processComponent(n1, n2,container,parentComponent)
        }
        break
    }
  }
  function processFragment(n1, n2, container,parentComponent){
    // 直接渲染子节点
    mountChildren(n2,container,parentComponent)
  }
  // 文本节点添加
  function processText(n1, n2, container){
    const { children } = n2
    const textNode  = (n2.el = document.createTextNode(children))
    container.append(textNode )
  }
  function processElement(n1, n2, container,parentComponent){
    if(!n1){
      mountElement(n2, container,parentComponent)
    }else{
      // 比较新旧element
      patchElement(n1, n2, container)
    }
  }
  function mountElement(vnode,container,parentComponent){
    // 创建真实dom,同时把el放在VNode节点上
    // const el = (vnode.el = document.createElement(vnode.type));
    const el = (vnode.el = hostCreateElement(vnode.type));
  
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
      // const isOn = (key:string) => (/^on[A-Z]/.test(key))
      // if(isOn(key)){
      //   const event = key.slice(2).toLowerCase()
      //   el.addEventListener(event,props[key]) 
      // }else{
      //   el.setAttribute(key,props[key])
      // }
      hostPatchProp(el,key,props[key])
    }
    // 添加到根标签上
    // container.append(el)
    hostInsert(el,container)
  }
  function patchElement(n1, n2, container){
    console.log("patchElement");
    console.log("n1", n1);
    console.log("n2", n2);
  }
  function mountChildren(vnode,container,parentComponent){
    vnode.children.forEach(v => {
      // 递归添加子标签
      patch(null, v, container, parentComponent)
    });
  }
  function processComponent(n1, n2, container,parentComponent){
    mountComponent(n2,container,parentComponent)
  }
  
  // vnode==>initialVNode 更加语义化
  function mountComponent(initialVNode,container,parentComponent){
    // 创建组件实例
    const instance = createComponentInstance(initialVNode,parentComponent)
  
    // setup的时候给组件添加代理对象
    setupComponent(instance)
    setupRenderEffect(instance,initialVNode,container)
  }
  
  // render渲染dom
  function setupRenderEffect(instance,initialVNode,container){
    // 调用组件实例的render()
    // 绑定到代理对象上
    // const { proxy }  = instance
    // const subTree = instance.render.call(proxy)
    // // if(instance.render){  
    // //  subTree 
    // // }
    // // 递归遍历
    // patch(subTree,container,instance)
    // initialVNode.el = subTree.el

    effect(()=>{
      if(!instance.isMounted){
        // 初始化
        console.log("初始化");
        
        const { proxy } = instance
        const subTree = instance.render.call(proxy)
        // 递归遍历
        patch(null, subTree, container, instance)
        initialVNode.el = subTree.el
        instance.isMounted = true
      }else{
        // 组件更新
        console.log("组件更新");
        const { proxy } = instance
        const subTree = instance.render.call(proxy)
    
        const prevSubTree = instance.subTree
        instance.subTree = subTree
        patch(prevSubTree,subTree,container,instance)
      }
    })
  
  }

  return {
    createApp:createAppAPI(render)
  }
}