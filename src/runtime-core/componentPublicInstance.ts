const publicPropertiesMap = {
  $el: (i) => i.vnode.el,
};

export const PublicInstanceProxyHandlers =  {
  get({_:instance} , key){
    // setup中的状态state
    const {setupState} = instance
    // 返回键在setupState的值
    if(key in setupState){
      return setupState[key]
    }

    // el
    const publicGetter = publicPropertiesMap[key]
    if(publicGetter){
      return publicGetter(instance)
    }
  }
}