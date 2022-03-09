import { proxyRefs } from "../reactivity"
import { shallowReadonly } from "../reactivity/reactive"
import { emit } from "./componentEmit"
import { initProps } from "./componentProps"
import { PublicInstanceProxyHandlers } from "./componentPublicInstance"
import { initSlots } from "./componentSlots"

export function createComponentInstance(vnode,parent){
  const component = {
    vnode,
    type:vnode.type,
    next:null,
    setupState:{},
    props:{},
    slots:{},
    emit:()=>{},
    parent:parent,
    provides:parent ? parent.provides : {},
    isMounted:false, 
    subTree:{}
  }

  component.emit = emit.bind(null,component) as any
  return component
}

export function setupComponent(instance){
  // TODO
  // initProps()初始化props, 传入虚拟节点的props
  initProps(instance,instance.vnode.props)
  // initSlots()
  initSlots(instance,instance.vnode.children)
  setupStatefulComponent(instance)  
}

function setupStatefulComponent(instance: any){
  const Component = instance.type
  // 给组件添加代理对象,代理对象处理器PublicInstanceProxyHandlers
  instance.proxy = new Proxy({_:instance}, PublicInstanceProxyHandlers )
  const { setup } = Component

  if(setup){
    setCurrentInstance(instance)
    // 调用组件的setup()方法，同时传入props参数,传入实例下的emit
    const setupResult = setup(shallowReadonly(instance.props),{
      emit:instance.emit
    })

    // 重置当前实例
    setCurrentInstance(null)
    handleSetupResult(instance,setupResult)
  }
}

function handleSetupResult(instance,setupResult){
    // function Object
  // TODO function
  if(typeof setupResult === 'object'){
    // 
    instance.setupState = proxyRefs(setupResult)
  }

  finishComponentSetup(instance)
}

function finishComponentSetup(instance){
  const Component = instance.type
  instance.render = Component.render
}
let currentInstance = null
export function setCurrentInstance(instance){
  currentInstance = instance
}

export function getCurrentInstance(){
  return currentInstance
}