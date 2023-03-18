<a name="LHtLU"></a>
## 源码库介绍
一个将值转化为数组的一个库
<a name="yka35"></a>
## 源码解析
```javascript
export default function arrify(value) {
  // 如果为null或者undefined，直接返回空数组
  if (value === null || value === undefined) {
    return [];
  }
  // 如果value为数组，返回自身
  if (Array.isArray(value)) {
    return value;
  }
  // 如果value为字符串类型，则返回包裹着自身的数组
  if (typeof value === 'string') {
    return [value];
  }
  // 如果value的迭代器是个函数，则返回解构赋值后的数组
  if (typeof value[Symbol.iterator] === 'function') {
    return [...value];
  }
  // 都不满足的情况下则返回包裹着自身的数组
  return [value];
}

```

参考：  
[额外知识点](../../front-end/javascript/iterator)  
[源码地址](https://github.com/sindresorhus/arrify)