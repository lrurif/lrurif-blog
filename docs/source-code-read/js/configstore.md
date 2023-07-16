# configstore源码学习

## 准备工作
```bash
git clone https://github.com/yeoman/configstore
npm i
```
## 依赖包
1. xdg-basedir: 此包适用于linux，获取用户主目录下的配置路径
2. graceful-fs: fs模块的替代品，算是兼容各个平台的fs模块
3. write-file-atomic: `fs.writeFile`的拓展
4. dot-prop: 可以使用点路径从嵌套对象中获取、设置或删除属性
5. unique-string: 生成唯一的随机字符串

## 源码阅读
### 构造函数
```javascript
class Configstore {
	constructor(id, defaults, options = {}) {
		// 如果globalConfigPath为true，则使用id作为路径前缀，否则固定在configstore文件夹下，id作为文件名。
		const pathPrefix = options.globalConfigPath ?
			path.join(id, 'config.json') :
			path.join('configstore', `${id}.json`);
		// 是否自定义配置了文件存储路径，如果是则采用用户传入的路径(_path指定了此对象存储文件的路径)
		this._path = options.configPath || path.join(configDirectory, pathPrefix);
		// 如果默认值存在，则进行合并(默认值的优先级比之前写入文件的优先级低)
		if (defaults) {
			this.all = {
				...defaults,
				...this.all
			};
		}
	}

	...省略
}
```
### all属性的set、get方法
```javascript
get all() {
    try {
        // 获取此文件路径的内容，如果不存在则会走catch方法。
        return JSON.parse(fs.readFileSync(this._path, 'utf8'));
    } catch (error) {
        // Create directory if it doesn't exist
        // 如果此文件不存在，则返回一个空对象
        if (error.code === 'ENOENT') {
            return {};
        }
        // 如果权限不足，则进行提示
        // Improve the message of permission errors
        if (error.code === 'EACCES') {
            error.message = `${error.message}\n${permissionError}\n`;
        }
        // 如果文件内容不是一个合法的JSON字符串，则清空此文件为空字符串。
        // Empty the file if it encounters invalid JSON
        if (error.name === 'SyntaxError') {
            writeFileAtomic.sync(this._path, '', writeFileOptions);
            return {};
        }

        throw error;
    }
}

set all(value) {
    try {
        // 首先确保此文件夹存在
        // Make sure the folder exists as it could have been deleted in the meantime
        fs.mkdirSync(path.dirname(this._path), mkdirOptions);

        writeFileAtomic.sync(this._path, JSON.stringify(value, undefined, '\t'), writeFileOptions);
    } catch (error) {
        // 无权限时的处理
        // Improve the message of permission errors
        if (error.code === 'EACCES') {
            error.message = `${error.message}\n${permissionError}\n`;
        }

        throw error;
    }
}
```
### size的get方法
```javascript
// 获取此配置对象的key的数量
get size() {
    return Object.keys(this.all || {}).length;
}
```
### get方法
```javascript
// 获取属性值，使用dot-prop库，支持点连接
get(key) {
    return dotProp.get(this.all, key);
}
```
### set方法
```javascript
// 获取属性值，使用dot-prop库，支持点连接
get(key) {
    return dotProp.get(this.all, key);
}
```
### has方法
```javascript
// 判断all对象是否有此属性。
has(key) {
    return dotProp.has(this.all, key);
}
```
### delete方法
```javascript
// 删除某个key
delete(key) {
    const config = this.all;
    dotProp.delete(config, key);
    this.all = config;
}
```
### clear方法
```javascript
// 将对象进行清空
clear() {
    this.all = {};
}
```
### path的get方法
```javascript
// 获取文件存储路径
get path() {
    return this._path;
}
```
## 总结
1. `configstore`这个库主要是用来存储一些配置文件的，主要功能就是对`all`属性的一些操作，增删改查等，当修改完all属性之后，则会自动执行写入文件方法。
2. 主要的操作是靠`dot-prop`这个库来实现。

## 参考
[configstore源码地址](https://github.com/yeoman/configstore)
