import { createVNode } from "./vnode"

// export function createApp(rootComponent){
//   return {
//     mount(rootContainer){
//       const vnode = createVNode(rootComponent)
//       render(vnode,rootContainer)
//     }
//   }
// }
export function createAppAPI(render){
  return function createApp(rootComponent){
    return {
      mount(rootContainer){
        const vnode = createVNode(rootComponent)
        render(vnode,rootContainer)
      }
    }
  }
}