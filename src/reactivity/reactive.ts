import { track, trigger } from "./effect";

export function reactive(raw){

  return new Proxy(raw,{
    get(target, property, receiver){
      // console.log(target, property, receiver);
      const res = Reflect.get(target,property)
      // TODO 依赖收集
      track(target,property)
      return res
      
    },

    set(target, property, value, receiver){
      const newValue = Reflect.set(target,property,value)
      // TODO 触发依赖
      trigger(target,property)
      return newValue
    }
  })
}