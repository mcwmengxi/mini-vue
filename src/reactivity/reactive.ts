import { track, trigger } from "./effect";
import { mutableHandlers, readonlyHandlers, shallowReadonlyHandlers } from './baseHandler'


// 枚举类型标记
export const enum ReactiveFlags {
  IS_REACTIVE = '__v_isReactive',
  IS_READONLY = '__v_isReadonly'
}

export function reactive(raw){
  return createReactiveObject(raw, mutableHandlers)
}

// 用于创建一个只读的数据，并且是递归只读，无论多少层都是只读
export function readonly(raw){
  return createReactiveObject(raw, readonlyHandlers)
}
// 用于创建一个只读的数据，但是不是递归只读，只有第一层只读
export function shallowReadonly(raw){
  return createReactiveObject(raw, shallowReadonlyHandlers)
}

export function isReactive(value){
  return !! value[ReactiveFlags.IS_REACTIVE]
}

export function isReadonly(value){
  return !! value[ReactiveFlags.IS_READONLY]
}



function createReactiveObject(target,baseHandler){
  return new Proxy(target,baseHandler)
}