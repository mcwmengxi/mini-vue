export function createComponentInstance(vnode){
  const component = {
    vnode,
    type:vnode.type
  }

  return component
}

export function setupComponent(instance){
  // TODO
  // initProps()
  // initSlots()
  setupStatefulComponent(instance)  
}

function setupStatefulComponent(instance){
  const Component = instance.type
  const {setup} = Component

  if(setup){
    // 调用组件的setup()方法
    const setupResult = setup()

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