import { track, trigger } from "./effect";
import { mutableHandlers, readonlyHandlers } from './baseHandler'
export function reactive(raw){
  return createReactiveObject(raw, mutableHandlers)
}

export function readonly(raw){
  return createReactiveObject(raw, readonlyHandlers)
}

function createReactiveObject(target,baseHandle){
  return new Proxy(target,baseHandle)
}