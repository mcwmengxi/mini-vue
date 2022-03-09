import { hasOwn } from './../shared/index';
const publicPropertiesMap = {
  $el: (i) => i.vnode.el,
  $slots: (i) => i.slots,
  $props: (i) => i.props
};

export const PublicInstanceProxyHandlers =  {
  get({_:instance} , key){
    // setup中的状态state
    const {setupState,props} = instance
    // 判断该属性是props还是state
    if(hasOwn(setupState,key)){
      return setupState[key]
    }else if(hasOwn(props,key)){
      return props[key]
    }


    // el
    const publicGetter = publicPropertiesMap[key]
    if(publicGetter){
      return publicGetter(instance)
    }
  }
}