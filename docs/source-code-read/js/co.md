# co源码阅读
## 准备工作
```
git clone git@github.com:tj/co.git
cd co
npm i
```

## 源码阅读
```javascript
// 定义slice方法
var slice = Array.prototype.slice;

// 导出
module.exports = co['default'] = co.co = co;

// 二次封装高阶函数，使fn不会立即执行
co.wrap = function (fn) {
  createPromise.__generatorFunction__ = fn;
  return createPromise;
  function createPromise() {
    return co.call(this, fn.apply(this, arguments));
  }
};

function co(gen) {
  // 获取this对象
  var ctx = this;
  // 获取此函数执行参数
  var args = slice.call(arguments, 1);

  return new Promise(function (resolve, reject) {
    // 如果gen为函数，则执行
    if (typeof gen === 'function') gen = gen.apply(ctx, args);
    // 如果gen不存在，或者它不是一个Generator函数返回的值，则直接resolve
    if (!gen || typeof gen.next !== 'function') return resolve(gen);
    // 开启流程
    onFulfilled();

    /**
     * @param {Mixed} res
     * @return {Promise}
     * @api private
     */

    function onFulfilled(res) {
      var ret;
      try {
        // 获取next方法返回值
        ret = gen.next(res);
      } catch (e) {
        return reject(e);
      }
      next(ret);
      return null;
    }

    /**
     * @param {Error} err
     * @return {Promise}
     * @api private
     */

    function onRejected(err) {
      var ret;
      try {
        ret = gen.throw(err);
      } catch (e) {
        return reject(e);
      }
      next(ret);
    }
    // 下一步操作
    function next(ret) {
      // 如果Generator函数执行完毕，则将Promise结果返回
      if (ret.done) return resolve(ret.value);
      // 尝试将返回值以Promise形式返回
      var value = toPromise.call(ctx, ret.value);
      // 如果value为Promise类型的话，则递归执行函数
      if (value && isPromise(value)) return value.then(onFulfilled, onRejected);
      return onRejected(new TypeError('You may only yield a function, promise, generator, array, or object, '
        + 'but the following object was passed: "' + String(ret.value) + '"'));
    }
  });
}
// 总入口：将一个值以Promise形式返回
function toPromise(obj) {
  // 如果obj不存在，则返回
  if (!obj) return obj;
  // 如果已经是个Promise，则返回
  if (isPromise(obj)) return obj;
  // 如果是Generator函数或者Generator执行完的对象，则交给co执行
  if (isGeneratorFunction(obj) || isGenerator(obj)) return co.call(this, obj);
  // 如果是个普通函数，则执行此函数，并返回一个Promise
  if ('function' == typeof obj) return thunkToPromise.call(this, obj);
  // 如果为数组，则使用Promise.all来执行，返回Promise.all结果
  if (Array.isArray(obj)) return arrayToPromise.call(this, obj);
  if (isObject(obj)) return objectToPromise.call(this, obj);
  return obj;
}

// 将函数执行以Promise值的形式返回
function thunkToPromise(fn) {
  var ctx = this;
  return new Promise(function (resolve, reject) {
    fn.call(ctx, function (err, res) {
      if (err) return reject(err);
      if (arguments.length > 2) res = slice.call(arguments, 1);
      resolve(res);
    });
  });
}

// 将数组以Promise值的形式返回
function arrayToPromise(obj) {
    ...
}

// 将一个对象以Promise值的形式返回
function objectToPromise(obj) {
  var results = new obj.constructor();
  var keys = Object.keys(obj);
  var promises = [];
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    var promise = toPromise.call(this, obj[key]);
    if (promise && isPromise(promise)) defer(promise, key);
    else results[key] = obj[key];
  }
  return Promise.all(promises).then(function () {
    return results;
  });

  function defer(promise, key) {
    // predefine the key in the result
    results[key] = undefined;
    promises.push(promise.then(function (res) {
      results[key] = res;
    }));
  }
}

// 判断是否为Promise
function isPromise(obj) {
    ...
}
// 判断是否为Generator函数执行完的返回值
function isGenerator(obj) {
    ...
}
// 判断是否为Generator函数
function isGeneratorFunction(obj) {
    ...
}
// 判断是否为对象
function isObject(val) {
    ...
}
```
## 流程
1. 传入一个Generator函数或者Generator函数返回值。
2. 执行onFulfilled方法，如果next函数返回值的done为true，则返回next函数返回值的value，否则获取value的Promise化，如果不符合条件类型，则抛出错误。
3. 将Promise化的值执行`then`方法，递归执行第二个步骤。

## 总结
1. co函数主要是将yield的返回值`普通化`，例如如果yield了一个Promise，则会提取Promise的返回值，作为yield的返回。
2. 学到了遍历对象，如果对象值为`Promise`，则可以执行Promise.then方法，当Promise成功了，则将返回值重新赋值给对象，这样你的对象中就不会包含Promise对象。

## 参考
[co源码地址](https://github.com/tj/co)