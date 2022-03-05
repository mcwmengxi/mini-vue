import { shallowReadonly } from "../reactivity/reactive"
import { initProps } from "./componentProps"
import { PublicInstanceProxyHandlers } from "./componentPublicInstance"

export function createComponentInstance(vnode){
  const component = {
    vnode,
    type:vnode.type,
    setupState:{},
    props:{}
  }

  return component
}

export function setupComponent(instance){
  // TODO
  // initProps()初始化props, 传入虚拟节点的props
  initProps(instance,instance.vnode.props)
  // initSlots()
  setupStatefulComponent(instance)  
}

function setupStatefulComponent(instance: any){
  const Component = instance.type
  // 给组件添加代理对象,代理对象处理器PublicInstanceProxyHandlers
  instance.proxy = new Proxy({_:instance}, PublicInstanceProxyHandlers )
  const { setup } = Component

  if(setup){
    // 调用组件的setup()方法，同时传入props参数
    const setupResult = setup(shallowReadonly(instance.props))

    handleSetupResult(instance,setupResult)
  }
}

function handleSetupResult(instance,setupResult){
    // function Object
  // TODO function
  if(typeof setupResult === 'object'){
    instance.setupState = setupResult
  }

  finishComponentSetup(instance)
}

function finishComponentSetup(instance){
  const Component = instance.type
  instance.render = Component.render
}