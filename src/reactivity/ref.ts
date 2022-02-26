import { hasChanged, isObject } from './../shared/index';
import { isTracking, trackEffects, triggerEffects } from './effect';
import { reactive } from './reactive';

class RefImpl{
  private _value: any;
  private _rawValue: any;
  public dep;
  public readonly __v_isRef = true
  constructor(value){
    this._rawValue = value
    this._value = convert(value)
    this.dep = new Set()
  }

  // value访问器
  get value(){
    // TODO 追踪依赖
    trackRefValue(this)
    return this._value
  }

  set value(newValue){
    // 值发生变化才触发
    if(hasChanged(newValue,this._rawValue)){
      this._rawValue = newValue
      this._value = convert(newValue)
    // 触发依赖
      triggerEffects(this.dep)
    }
  }
  
}
export function ref(value){
  return new RefImpl(value)
}

export function isRef(ref){
  return !!(ref && ref.__v_isRef === true)
}

export function unRef(ref){
  return isRef(ref) ? ref.value : ref
}
function trackRefValue(ref){
  if(isTracking()){
    trackEffects(ref.dep)
  }
}

function convert(value){
  return isObject(value) ? reactive(value) : value
}