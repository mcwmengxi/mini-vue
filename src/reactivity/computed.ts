import {ReactiveEffect} from "./effect"

class ComputedRefImpl{
  private _effect: ReactiveEffect
  private _dirty: boolean = true
  private _value : any

  constructor(getter){
    this._effect = new ReactiveEffect(getter,()=>{
      // 调度任务执行，触发tigger，设置数据为脏数据
      if(!this._dirty){
        this._dirty = true
      }
    })
  }

  get value(){
    if(this._dirty){
      this._value = this._effect.run()
      this._dirty = false
    }
    return this._value
  }
} 


export const computed = (getter)=>{
  return new ComputedRefImpl(getter)
}