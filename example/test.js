const camelize = (str) => {
  return str.replace(/-(\w)/g, (_, c) => {
      console.log(_,c)
    return c ? c.toUpperCase() : "";
  });
};
const capitalize = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
// 处理事件名
 const toHandlerKey = (str)=> (str ? 'on'+ capitalize(str) : '')
console.log(camelize('add-foo'))
console.log(capitalize(camelize('add-foo')))
console.log(toHandlerKey(capitalize(camelize('add-foo'))))