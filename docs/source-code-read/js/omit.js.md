# omit.js源码

## 功能
剔除对象中的某些属性
## 源码分析
```javascript
function omit(obj, fields) {
  // eslint-disable-next-line prefer-object-spread
  // 浅拷贝一个对象
  const shallowCopy = Object.assign({}, obj);
  for (let i = 0; i < fields.length; i += 1) {
    const key = fields[i];
    delete shallowCopy[key];
  }
  return shallowCopy;
}

export default omit;
```
## 实现流程
1. 首先浅拷贝这个对象
2. 遍历数据中的key，使用delete方法删除属性。
3. 返回这个复制的对象