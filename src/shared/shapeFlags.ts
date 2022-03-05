
// <<(左移位)
// 9<<2产生36，因为1001移位2比特向左变为100100，它是36。

export const enum ShapeFlags {
  ELEMENT = 1, // 节点
  FUNCTIONAL_COMPONENT = 1 << 1, // 函数组件
  STATEFUL_COMPONENT = 1 << 2,  // 普通组件
  TEXT_CHILDREN = 1 << 3,  //text_children
  ARRAY_CHILDREN = 1 << 4, //array_children
  SLOTS_CHILDREN = 1 << 5, //slots_children
  // TELEPORT = 1 << 6, // 传送门
  // SUSPENSE = 1 << 7, // 异步组件
  // COMPONENT_SHOULD_KEEP_ALIVE = 1 << 8,
  // COMPONENT_KEPT_ALIVE = 1 << 9, // kept alive组件
  COMPONENT = ShapeFlags.STATEFUL_COMPONENT | ShapeFlags.FUNCTIONAL_COMPONENT // 普通组件 | 函数组件
}


