import { computed } from './../computed';
import { reactive } from "../reactive"
import {effect} from '../effect';

describe('computed',()=>{
  it('happy path',()=>{
    // 测试
    const user = reactive({
      age:25
    })
    const age = computed(()=>{
      return user.age
    })

    expect(age.value).toBe(25)
  })
  // 延时计算
  it('should return updated value',()=>{
    const value = reactive({foo:1})
    const getter = jest.fn(() => {
      return value.foo;
    });
    const cValue = computed(getter)
    // 只有当我们访问计算属性的时候，它才会真正运行 computed getter 函数计算
    expect(value.foo).toBe(1) 
    // 未被调用
    expect(getter).not.toHaveBeenCalled()
    expect(cValue.value).toBe(1)
    expect(getter).toHaveBeenCalledTimes(1)

    value.foo++
    expect(value.foo).toBe(2)
    // 此时还是之前计算属性读取被调用的那次
    expect(getter).toHaveBeenCalledTimes(1)
    expect(cValue.value).toBe(2)
    // 再次读取属性，getter被调用
    expect(getter).toHaveBeenCalledTimes(2)
    cValue.value
    // should not compute again，值未改变，不再计算
    expect(getter).toHaveBeenCalledTimes(2)
    
  })

  it('should trigger effect', () => {
    const value = reactive({
      foo:1
    })
    const cValue = computed(() => value.foo)
    let dummy
    effect(() => {
      dummy = cValue.value
    })
    // 触发器效应
    expect(dummy).toBe(1)
    value.foo = 2
    expect(dummy).toBe(1)
  })

  // TODO
  // it('should work when chained', () => {
  //   // 支持链式计算
  //   const value = reactive({ foo: 0 })
  //   const c1 = computed(() => value.foo)
  //   const c2 = computed(() => c1.value + 1)
  //   expect(c2.value).toBe(1)
  //   expect(c1.value).toBe(0)
  //   value.foo++
  //   expect(c2.value).toBe(2)
  //   expect(c1.value).toBe(1)
  // })
})