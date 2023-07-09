# koa-compose源码阅读
## 准备工作
```shell
# 可以直接克隆我的仓库，我的仓库保留的 compose 仓库的 git 记录
git clone https://github.com/lxchuan12/koa-compose-analysis.git
cd koa-compose/compose
npm i
```
## 源码解析
```javascript
// 调用next进行下一步的执行，有点类似递归回溯。
function compose (middleware) {
  // 当传入的中间件不是一个数组是，抛出错误
  if (!Array.isArray(middleware)) throw new TypeError('Middleware stack must be an array!')
  // 当数组里面不是一个函数的时候则会抛出错误
  for (const fn of middleware) {
    if (typeof fn !== 'function') throw new TypeError('Middleware must be composed of functions!')
  }

  /**
   * @param {Object} context
   * @return {Promise}
   * @api public
   */

  return function (context, next) {
    // last called middleware #
    let index = -1
    // 调用执行函数
    return dispatch(0)
    function dispatch (i) {
      // 防止next函数被调用多次
      if (i <= index) return Promise.reject(new Error('next() called multiple times'))
      index = i
      // 获取中间件函数
      let fn = middleware[i]
      // 如果中间件函数都执行完了，则调用最先传进来的next方法
      if (i === middleware.length) fn = next
      // 如果fn为空，则直接返回一个fulfilled的Promise，两种情况：middleware数组长度为空，或者执行此匿名函数没有传入next方法
      if (!fn) return Promise.resolve()
      try {
        // 重点：返回一个Promise，且fn函数如果也返回一个Promise的话，则执行权会被新的Promise“接管”
        return Promise.resolve(fn(context, dispatch.bind(null, i + 1)))
      } catch (err) {
        return Promise.reject(err)
      }
    }
  }
}
```
## 总结
1. `next`函数主要是来一步步执行数组中的方法，且利用i来判断执行位置。
2. 此源码使用了`i`和`index`来判断`next`方法是否执行了多次，执行多次的话会报错。
3. 传入的`middleware`里面的函数可以返回`Promise`或者其他内容，如果为`Promise`的话，则会判断此`promise`的状态来决定是否执行`await next()`下面的方法。

## 参考
[50行代码串行Promise，koa洋葱模型原来是这么实现？](https://github.com/lxchuan12/koa-compose-analysis)