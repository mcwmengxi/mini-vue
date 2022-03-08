import { effect } from '../reactivity/effect';
import { ShapeFlags } from '../shared/shapeFlags';
import { EMPTY_OBJ, isObject } from './../shared/index';
import { createComponentInstance, setupComponent } from "./component"
import { createAppAPI } from './createApp';
import { Fragment, Text } from './vnode';

export function createRenderer(options){
  const {
    createElement: hostCreateElement,
    patchProp: hostPatchProp,
    insert: hostInsert,
    remove: hostRemove,
    setElementText:hostSetElementText
  } = options

  function render(vnode:any, container:any){
    patch(null,vnode,container,null,null)
  }
  
  /**
   * @params n1 oldVNode
   * @params n2 newVNode
   * @return 
   */
  function patch(n1, n2, container, parentComponent, anchor){
    // 原生标签,采用位运算符比较
    const { shapeFlag, type } = n2
  
    switch(type){
      case Fragment:
        processFragment(n1, n2, container,parentComponent, anchor)
        break
      case Text:
        processText(n1, n2, container)
        break
      default :
        // 按位与 相等的判断
        if(shapeFlag & ShapeFlags.ELEMENT){
          processElement(n1, n2, container,parentComponent, anchor)
        }else if(shapeFlag & ShapeFlags.STATEFUL_COMPONENT){
          // 处理组件
          processComponent(n1, n2,container,parentComponent, anchor)
        }
        break
    }
  }
  function processFragment(n1, n2, container,parentComponent, anchor){
    // 直接渲染子节点
    mountChildren(n2.children,container,parentComponent, anchor)
  }
  // 文本节点添加
  function processText(n1, n2, container){
    const { children } = n2
    const textNode  = (n2.el = document.createTextNode(children))
    container.append(textNode )
  }
  function processElement(n1, n2, container,parentComponent, anchor){
    if(!n1){
      mountElement(n2, container,parentComponent, anchor)
    }else{
      // 比较新旧element
      patchElement(n1, n2, container,parentComponent, anchor)
    }
  }
  function mountElement(vnode,container,parentComponent, anchor){
    // 创建真实dom,同时把el放在VNode节点上
    // const el = (vnode.el = document.createElement(vnode.type));
    const el = (vnode.el = hostCreateElement(vnode.type));
  
    const { children, props, shapeFlag } = vnode
    // 处理子节点，是文本还是标签
    if(shapeFlag & ShapeFlags.TEXT_CHILDREN){
      el.textContent = children
    }else if(shapeFlag & ShapeFlags.ARRAY_CHILDREN){
      mountChildren(vnode.children,el,parentComponent, anchor)
    }
  
    // 属性
    for(const key in props){
      // 判断是否是事件注册
      // const isOn = (key:string) => (/^on[A-Z]/.test(key))
      // if(isOn(key)){
      //   const event = key.slice(2).toLowerCase()
      //   el.addEventListener(event,props[key]) 
      // }else{
      //   el.setAttribute(key,props[key])
      // }
      const val = props[key]
      hostPatchProp(el,key,null,val)
    }
    // 添加到根标签上
    // container.append(el)
    // hostInsert(el,container)
    hostInsert(el,container,anchor)
  }
  function patchElement(n1, n2, container,parentComponent, anchor){
    console.log("patchElement");
    console.log("n1", n1);
    console.log("n2", n2);
    // 新旧属性对比
    const oldProps = n1.props || EMPTY_OBJ
    const newProps = n2.props || EMPTY_OBJ
    // 让新节点和旧节点el属性一致
    const el = (n2.el = n1.el)

    patchChildren(n1, n2, el, parentComponent, anchor)
    patchProps(el,oldProps,newProps)
  }

  function patchChildren(n1, n2, container, parentComponent, anchor){
    // 新旧标记和新旧children
    // const prevShapeFlag = n1.shapeFlag
    // const { shapeFlag } = n2
    // const c1 = n1.children
    // const c2 = n2.children
    const { shapeFlag: prevShapeFlag, children: c1 } = n1
    const { shapeFlag, children: c2 } = n2

    if(shapeFlag & ShapeFlags.TEXT_CHILDREN){
      // 新的children是string类型
      if(prevShapeFlag & ShapeFlags.ARRAY_CHILDREN){
        // 旧的children是array类型，直接重新渲染
        unmountChildren(c1)
      }
      if(c1 !== c2){
        // 新旧children都为string
        hostSetElementText(container,c2 as string)
      }
    }else{
      // 新的children是string类型
      if(prevShapeFlag & ShapeFlags.TEXT_CHILDREN){
        hostSetElementText(container,'')
        mountChildren(c2, container, parentComponent, anchor)
      }else{
        // 新的children是array类型
        patchKeyedChildren(c1, c2, container, parentComponent, anchor)
      }
    }
  }

  function patchProps(el,oldProps,newProps){
    if(oldProps !== newProps){
      for (const key in newProps) {
        // 新旧prop属性对比
        const prevProp = oldProps[key]
        const nextProp = newProps[key];
        // 更新
        if(prevProp !== nextProp){
          hostPatchProp(el, key, prevProp, nextProp)
        }
      }
    }
    if(oldProps !== EMPTY_OBJ){
      for (const key in oldProps) {
        // 不在新的props中
        if(!(key in newProps)){
          hostPatchProp(el, key, oldProps[key], null)
        }
      }
    }
  }
  function patchKeyedChildren(c1: any[], c2: any[], container, parentComponent, parentAnchor){
    const l2 = c2.length
    let i = 0
    let e1 = c1.length -1
    let e2 = c2.length -1
    function isSameTypeVNode(n1,n2){
      return n1.type === n2.type && n1.key === n2.key
    }
    // 1.从左至右依次比对
    while(i<=e1 && i<=e2){
      const n1 = c1[i]
      const n2 = c2[i]

      if(isSameTypeVNode(n1,n2)){
        patch(n1, n2, container, parentComponent, parentAnchor)
      }else{
        break
      }
      i++
    }
    // 2.从右至左依次比对
    while(i<=e1 && i<=e2){
      const n1 = c1[e1]
      const n2 = c2[e2]

      if(isSameTypeVNode(n1,n2)){
        patch(n1, n2, container, parentComponent, parentAnchor)
      }else{
        break
      }

      e1--
      e2--
    }
    // a b c 
    // a d b c
    // i=1 e1=0 e2=1 
    // 经过 1、2 直接将旧结点比对完，则剩下的新结点直接 mount，此时 i > e1
    if(i > e1){
      if(i<=e2){
        const nextPos = e2 + 1
        const anchor = nextPos < l2 ? c2[nextPos].el : null;
        // const anchor = nextPos<l2 ? c2[nextPos].el : parentAnchor
        while( i<=e2){
          patch(null,c2[i],container,parentComponent,anchor)
          i++
        }
      }
    }else if(i>e2){
      // a d b c
      // a b c 
      // i=1 e1=1 e2=0 
      // 经过 1、2 直接将新结点比对完，则剩下的旧结点直接 `unmount`，此时 `i > e2` 
      while (i <= e1) {
        hostRemove(c1[i].el);
        i++;
      }
    }else{
      // 若不满足 3，采用传统 diff 算法，但不真的添加和移动，只做标记和删除 取得一个 source 数组
      // 左右两边都比对完了，然后剩下的就是中间部位顺序变动的
      // a,b,[c,d,e],f,g
      // a,b,[e,c,d],f,g
      // i=2,e1=4,e2=4
      let s1 = i
      let s2 = i
      const keyToNewIndexMap  = new Map() 
      // 先把 key 和 newIndex 绑定好，方便后续基于 key 找到 newIndex
      // 时间复杂度是 O(1)
      for(let i=s2; i<=e2; i++){
        const nextChild = c2[i]
        keyToNewIndexMap.set(nextChild.key,i)
      }
      // 需要处理新节点的数量
      const toBePatched = e2 - s2 + 1;
      let patched = 0
      // 初始化 从新的index映射为老的index
      // 创建数组的时候给定数组的长度，这个是性能最快的写法
      // 初始化为 0 , 后面处理的时候 如果发现是 0 的话，那么就说明新值在老的里面不存在
      const newIndexToOldIndexMap = new Array(toBePatched).fill(0)
      // for(let i=0; i<toBePatched; i++) {
      //   newIndexToOldIndexMap[i] = 0
      // }

      // 遍历老节点
      // 1. 需要找出老节点有，而新节点没有的 -> 需要把这个节点删除掉
      // 2. 新老节点都有的，—> 需要 patch
      for(let i=s1; i<=e1; i++){
        const prevChild = c1[i]
        // 优化点
        // patched为已更新的节点数量，如果patched大于toBePatched需要处理新节点的数量的话，那么之后在处理老节点的时候就直接删除即可
        if(patched >= toBePatched){
          hostRemove(prevChild.el)
          continue
        }

        let newIndex 
        if(prevChild.key != null){
          // 旧节点在新节点中对应的下标
          newIndex = keyToNewIndexMap.get(prevChild.key)
        }else{
          // 如果没key 的话，那么只能是遍历所有的新节点来确定当前节点存在不存在了
          for(let j = s2; j <= e2; j++){
            if(isSameTypeVNode(prevChild,c2[j])){
              newIndex = j
              break
            }
          }
        }

        // 因为有可能 nextIndex 的值为0（0也是正常值）
        // 所以需要通过值是不是 undefined 或者 null 来判断
        if(newIndex === undefined){
          // 当前节点的key 不存在于新节点中，需要把当前节点给删除掉
          hostRemove(prevChild.el)
        }else{
          // 新老节点都存在
          console.log("新老节点都存在");
          patch(prevChild, c2[newIndex], container, parentComponent, null)
          patched++
        }
      }
    }
  }
  function mountChildren(children,container,parentComponent, anchor){
    children.forEach(v => {
      // 递归添加子标签
      patch(null, v, container, parentComponent, anchor)
    });
  }
  function unmountChildren(children){
    // children.forEach((element,index) => {
    //   const el = element.el
    //   hostRemove(el)
    // });
    for (let i = 0; i < children.length; i++) {
      const el = children[i].el;
      hostRemove(el);
    }
  }
  function processComponent(n1, n2, container,parentComponent, anchor){
    mountComponent(n2,container,parentComponent, anchor)
  }
  
  // vnode==>initialVNode 更加语义化
  function mountComponent(initialVNode,container,parentComponent, anchor){
    // 创建组件实例
    const instance = createComponentInstance(initialVNode,parentComponent)
  
    // setup的时候给组件添加代理对象
    setupComponent(instance)
    setupRenderEffect(instance,initialVNode,container, anchor)
  }
  
  // render渲染dom
  function setupRenderEffect(instance,initialVNode,container, anchor){
    // 调用组件实例的render()
    // 绑定到代理对象上
    // const { proxy }  = instance
    // const subTree = instance.render.call(proxy)
    // // if(instance.render){  
    // //  subTree 
    // // }
    // // 递归遍历
    // patch(subTree,container,instance)
    // initialVNode.el = subTree.el

    effect(()=>{
      if(!instance.isMounted){
        // 初始化
        console.log("初始化");
        
        const { proxy } = instance
        // 给实例的subTree赋值，给更新的时候使用
        const subTree = (instance.subTree = instance.render.call(proxy))
        
        // 递归遍历
        patch(null, subTree, container, instance, anchor)
        initialVNode.el = subTree.el
        instance.isMounted = true
      }else{
        // 组件更新
        console.log("组件更新");
        const { proxy } = instance
        const subTree = instance.render.call(proxy)     
    
        const prevSubTree = instance.subTree
        instance.subTree = subTree
        patch(prevSubTree,subTree,container,instance, anchor)
      }
    })
  
  }

  return {
    createApp:createAppAPI(render)
  }
}