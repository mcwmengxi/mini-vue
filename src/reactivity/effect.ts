import { extend } from "../shared";

let activeEffect;
class ReactiveEffect{
  private _fn: any;
  public scheduler : Function | undefined;
  deps = [];
  active = true;
  onStop?:()=>void
  constructor(fn, scheduler?:Function){
    this._fn = fn
    this.scheduler = scheduler
  }

  run(){
    activeEffect = this
    // this._fn()
    return this._fn()
  }
  stop(){
    // 删除掉对应的dep
    if(this.active){
      cleanEffect(this)
      if(this.onStop){
        this.onStop()
      }
    }
    this.active = false
  }
}
function cleanEffect(effect){
    effect.deps.forEach((dep:any) => {
      dep.delete(effect)
    });
}
export function effect(fn,options:any = {}){
  const _effect = new ReactiveEffect(fn,options.scheduler)
  // _effect.scheduler = options.scheduler
  extend(_effect,options)
  _effect.run()

  const runner : any = _effect.run.bind(_effect)
  runner.effect = _effect

  return runner
}

const targetMaps = new Map()
export function track(target,property){

  // target -> property -> dep
  let depsMap = targetMaps.get(target)
  // 考虑初始化的情况
  if(!depsMap){
    depsMap = new Map()
    targetMaps.set(target,depsMap)
  }

  let dep = depsMap.get(property)
  
  if(!dep){
    dep = new Set()
    depsMap.set(property,dep)
  }

  if(!activeEffect) return
  dep.add(activeEffect)
  activeEffect.deps.push(dep)
  // 创建不重复的依赖容器，Set
  // let dep = new Set()
}


export function trigger(target,property){
  // 取出dep,调用fn
  const depsMap = targetMaps.get(target)
  const dep = depsMap.get(property)
  for (const effect of dep) {
    if(effect.scheduler){
      effect.scheduler()
    }else{
      effect.run()  
    }
  }
}

export function stop(runner){
  runner.effect.stop()
}