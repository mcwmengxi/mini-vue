export const extend = Object.assign;

export const EMPTY_OBJ = {};


export const isObject = value => value !== null && typeof value === 'object'

export const hasChanged = (val,newValue) => !Object.is(val,newValue)

export const hasOwn = (val,key) => Object.prototype.hasOwnProperty.call(val,key)

// 转为驼峰形式 add-foo ==> addFoo
export const camelize = (str) => {
  return str.replace(/-(\w)/g, (_, c) => {
    return c ? c.toUpperCase() : "";
  });
};

// addFoo => AddFoo
const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
// 处理事件名 AddFoo => onAddFoo
export const toHandlerKey = (str:string)=> (str ? 'on'+ capitalize(str) : '')