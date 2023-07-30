# classnames源码解读
## 介绍
一个简单的 JavaScript 工具，用于有条件地将类名连接在一起。
## 使用方法
```javascript
classNames('foo', 'bar'); // => 'foo bar'
classNames('foo', { bar: true }); // => 'foo bar'
classNames({ 'foo-bar': true }); // => 'foo-bar'
classNames({ 'foo-bar': false }); // => ''
classNames({ foo: true }, { bar: true }); // => 'foo bar'
classNames({ foo: true, bar: true }); // => 'foo bar'

// lots of arguments of various types
classNames('foo', { bar: true, duck: false }, 'baz', { quux: true }); // => 'foo bar baz quux'

// other falsy values are just ignored
classNames(null, false, 'bar', undefined, 0, 1, { baz: null }, ''); // => 'bar 1'
```
## 源码阅读
### 准备
```
git clone git@github.com:JedWatson/classnames.git
cd classnames
npm i
```
### 源码解读
```javascript
// 自执行函数，支持cmd、amd以及window，不支持esm。
(function () {
	'use strict';
	var hasOwn = {}.hasOwnProperty;

	function classNames() {
		// 存储类名的数组
		var classes = [];

		for (var i = 0; i < arguments.length; i++) {
			var arg = arguments[i];
			// 如果内容==false的话，则不取。
			if (!arg) continue;
			// 获取内容的type（不用考虑null的情况，因为上面已经过滤了）
			var argType = typeof arg;
			// 如果为string或者number类型，则将数组项push到结果集中
			if (argType === 'string' || argType === 'number') {
				classes.push(arg);
			// 如果数组项为数组，则递归执行。
			} else if (Array.isArray(arg)) {
				if (arg.length) {
					var inner = classNames.apply(null, arg);
					if (inner) {
						classes.push(inner);
					}
				}
			// 如果为对象的情况
			} else if (argType === 'object') {
				// 如果此对象的toString方法被重写且toString方法的不是原生的方法。
				if (arg.toString !== Object.prototype.toString && !arg.toString.toString().includes('[native code]')) {
					// push内容到结果集中
					classes.push(arg.toString());
					continue;
				}
				// 遍历对象，如果为自身属性，且为true，则push到结果集中
				for (var key in arg) {
					if (hasOwn.call(arg, key) && arg[key]) {
						classes.push(key);
					}
				}
			}
		}
		// 返回由空格隔开的结果
		return classes.join(' ');
	}
	// 如果为cmd格式
	if (typeof module !== 'undefined' && module.exports) {
		classNames.default = classNames;
		module.exports = classNames;
	// 如果为amd格式
	} else if (typeof define === 'function' && typeof define.amd === 'object' && define.amd) {
		// register as 'classnames', consistent with npm package name
		define('classnames', [], function () {
			return classNames;
		});
	// 如果为浏览器环境
	} else {
		window.classNames = classNames;
	}
}());
```
### 执行流程
1. 遍历传入参数
2. 如果数组项为false，则跳过
3. 如果数组项为string或number类型，则放到结果集中
4. 如果数组项为数组，则递归执行。
5. 如果为对象，分为两种情况，
    5.1 toString方法为重写且不是原生方法，则直接执行toString方法并将结果塞入到结果集中
    5.2 遍历对象，如果为自身属性且值为true，则插入到结果集中
6. 使用join方法输出结果
### 其他两个版本
1. bind版本：使用classNames先bind一个对象，然后使用返回函数进行执行，每次都会取这个对象中的属性是否为true来判断是否加入到结果集中。
2. dedupe：使用一个对象属性不能重复来进行去重的一个版本。

## 总结
当项目中有些类名基于条件判断的时候，一个个处理有些麻烦，这个时候就可以使用classnames这个工具函数，来进行统一管理。
## 参考
[classnames源码地址](https://github.com/JedWatson/classnames)