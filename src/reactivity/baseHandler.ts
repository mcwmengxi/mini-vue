import { isObject } from './../shared/index';
import { track, trigger } from "./effect";
import { ReactiveFlags, readonly, reactive } from './reactive'
const set = createSetter()


function createSetter(){
  return function set(target, property, value, receiver){
      const newValue = Reflect.set(target,property,value)

      // TODO 触发依赖
      trigger(target,property)
      return newValue
    }
}

const get = createGetter()
const readonlyGet = createGetter(true)

function createGetter(isReadonly = false){
  return function get(target, property, receiver){
      // console.log(target, property, receiver);
      // 判断键的类型
      if(property === ReactiveFlags.IS_REACTIVE){
        return !isReadonly
      }else if(property === ReactiveFlags.IS_READONLY){
        return isReadonly
      }
      const res = Reflect.get(target,property)

      // 对象类型的数据转换
      if(isObject(res)){
        return isReadonly ? readonly(res) : reactive(res)
      }

      // 是否是只读的
      if(!isReadonly){
      // TODO 依赖收集
        track(target,property)
      }
      return res
    }
}

// 可变类型
export const mutableHandlers = {
  get,
  set
}

// 只读类型

export const readonlyHandlers = {
  get:readonlyGet,
  set(target,key){
    // 设置警告
    console.warn(`key: "${String(key)}"不能被set,target对象是readonly(只读属性的)`,target)
    return true
  }
}