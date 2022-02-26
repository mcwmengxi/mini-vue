import { extend } from "../shared";

let activeEffect;
let shouldTrack = false
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
    if(!this.active){
      return this._fn()
    }

    // 应该收集
    shouldTrack = true;
    activeEffect = this
    const fun = this._fn()

    // 重置
    shouldTrack = false;

    return fun
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
// 清除当前依赖
function cleanEffect(effect){
  effect.deps.forEach((dep:any) => {
    dep.delete(effect)
  });
  // 把 effect.deps 清空
  effect.deps.length = 0;
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
  if(!isTracking()) return
  // target -> property -> dep
  // 获取的某个对象的值
  let depsMap = targetMaps.get(target)
  // 考虑初始化的情况
  if(!depsMap){
    depsMap = new Map()
    targetMaps.set(target,depsMap)
  }

  let dep = depsMap.get(property)
  
  if(!dep){
    // 创建不重复的依赖容器，Set
    dep = new Set()
    depsMap.set(property,dep)
  }
  // 看看 dep 之前有没有添加过，添加过的话 那么就不添加了
  if(dep.has(activeEffect)) return

  // 把当前的对象存贮到容器中
  dep.add(activeEffect)
  activeEffect.deps.push(dep)

}

function isTracking(){
  return shouldTrack && activeEffect !== undefined;
}

export function trigger(target,property){
  // 取出dep中的依赖,调用fn
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