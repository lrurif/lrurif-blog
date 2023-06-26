# p-limit 源码阅读

## 源码解析

```javascript
import Queue from "yocto-queue";

export default function pLimit(concurrency) {
    // 判断传入的参数是否合法
    if (
        !(
            (Number.isInteger(concurrency) ||
                concurrency === Number.POSITIVE_INFINITY) &&
            concurrency > 0
        )
    ) {
        throw new TypeError(
            "Expected `concurrency` to be a number from 1 and up"
        );
    }
    // 建立一个队列
    const queue = new Queue();
    // 定义一个当前正在执行的函数数量
    let activeCount = 0;
    // 当一个函数执行完后，调用下一个函数
    const next = () => {
        // 思考，这一步可以放到run函数内部
        // 将当前执行函数数量-1
        activeCount--;
        // 如果队列数量大于0，则执行队列顶部函数
        if (queue.size > 0) {
            queue.dequeue()();
        }
    };

    const run = async (fn, resolve, args) => {
        // 首先将当前执行函数数量+1
        activeCount++;
        // 获取异步函数返回的结果
        const result = (async () => fn(...args))();
        // 返回此结果
        resolve(result);
        // 如果结果为Promise的话，则等待执行
        try {
            await result;
        } catch {}
        // 执行下一个函数
        next();
    };
    // 入队列函数，会先将函数放到队列中先，在下一个微任务中判断是否可以执行。
    const enqueue = (fn, resolve, args) => {
        queue.enqueue(run.bind(undefined, fn, resolve, args));

        (async () => {
            // This function needs to wait until the next microtask before comparing
            // `activeCount` to `concurrency`, because `activeCount` is updated asynchronously
            // when the run function is dequeued and called. The comparison in the if-statement
            // needs to happen asynchronously as well to get an up-to-date value for `activeCount`.
            await Promise.resolve();
            // 如果当前执行函数小于最大执行函数数量的话，且队列中有函数，则会执行队列最前面的函数
            if (activeCount < concurrency && queue.size > 0) {
                queue.dequeue()();
            }
        })();
    };
    // 函数：返回一个Promise，如果activeCount小与concurrency时会异步执行此函数。
    const generator = (fn, ...args) =>
        new Promise((resolve) => {
            enqueue(fn, resolve, args);
        });
    // 将三个属性定义在generator函数上
    Object.defineProperties(generator, {
        // 获取正在执行的数量
        activeCount: {
            get: () => activeCount,
        },
        // 获取等待执行的函数数量
        pendingCount: {
            get: () => queue.size,
        },
        // 清空函数执行队列
        clearQueue: {
            value: () => {
                queue.clear();
            },
        },
    });

    return generator;
}
```

## 学到了什么

1. 可以利用`Object.defineProperties`来定义多个对象属性（之前只知道有这个方法，但是没怎么用过😂），这样可以更方便的管理一些零散的变量，例如：

```javascript
let _num = 0;
let res = {};
Object.defineProperties(res, {
    num: {
        get: () => _num,
    },
});
```
