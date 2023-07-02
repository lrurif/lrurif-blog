# 剖析 element-ui 中新建组件的命令

## 1. 命令

```
new:
	node build/bin/new.js $(filter-out $@,$(MAKECMDGOALS))
```

## 2. 作用

快速生成一个新组件相关的文件，不用一个个去手动新建且修改内容。

## 3. 源码解析

### 3.1 判断组件名是否合法

```javascript
"use strict";

console.log();
process.on("exit", () => {
    console.log();
});

if (!process.argv[2]) {
    console.error("[组件名]必填 - Please enter new component name");
    process.exit(1);
}
```

### 3.2 引入依赖

```javascript
// 路径模块
const path = require("path");
// 读写文件需要
const fs = require("fs");
// 文件保存
const fileSave = require("file-save");
// 转驼峰工具
const uppercamelcase = require("uppercamelcase");
```

### 3.3 定义文件内容模板

```javascript
// 定义一系列文件模板
const Files = [
    {
        filename: "index.js",
        content: `import ${ComponentName} from './src/main';

/* istanbul ignore next */
${ComponentName}.install = function(Vue) {
  Vue.component(${ComponentName}.name, ${ComponentName});
};

export default ${ComponentName};`,
    },
    {
        filename: "src/main.vue",
        content: `<template>
  <div class="el-${componentname}"></div>
</template>

<script>
export default {
  name: 'El${ComponentName}'
};
</script>`,
    },
    {
        filename: path.join("../../examples/docs/zh-CN", `${componentname}.md`),
        content: `## ${ComponentName} ${chineseName}`,
    },
    ...省略,
];
```
### 3.4 将组件添加到components.json中
```javascript
// 添加到 components.json
const componentsFile = require('../../components.json');
// 判断是否此组件名已存在
if (componentsFile[componentname]) {
  console.error(`${componentname} 已存在.`);
  process.exit(1);
}
componentsFile[componentname] = `./packages/${componentname}/index.js`;
fileSave(path.join(__dirname, '../../components.json'))
  .write(JSON.stringify(componentsFile, null, '  '), 'utf8')
  .end('\n');
```
### 3.5 将scss文件添加到index.scss中
```javascript
// 添加到 index.scss
const sassPath = path.join(__dirname, '../../packages/theme-chalk/src/index.scss');
const sassImportText = `${fs.readFileSync(sassPath)}@import "./${componentname}.scss";`;
fileSave(sassPath)
  .write(sassImportText, 'utf8')
  .end('\n');
```
### 3.6 将组件ts类型文件 添加到 element-ui.d.ts
```javascript
// 添加到 element-ui.d.ts
const elementTsPath = path.join(__dirname, '../../types/element-ui.d.ts');

let elementTsText = `${fs.readFileSync(elementTsPath)}
/** ${ComponentName} Component */
export class ${ComponentName} extends El${ComponentName} {}`;

const index = elementTsText.indexOf('export') - 1;
const importString = `import { El${ComponentName} } from './${componentname}'`;

elementTsText = elementTsText.slice(0, index) + importString + '\n' + elementTsText.slice(index);

fileSave(elementTsPath)
  .write(elementTsText, 'utf8')
  .end('\n');
```
### 3.7 将上面定义的模板写入到文件中
```javascript
// 创建 package，将模版内容写入到对应文件中
Files.forEach(file => {
  fileSave(path.join(PackagePath, file.filename))
    .write(file.content, 'utf8')
    .end('\n');
});
```
### 3.8 将新增的组件添加到nav.config.json中
```javascript
// 添加到 nav.config.json
const navConfigFile = require('../../examples/nav.config.json');

Object.keys(navConfigFile).forEach(lang => {
  let groups = navConfigFile[lang][4].groups;
  groups[groups.length - 1].list.push({
    path: `/${componentname}`,
    title: lang === 'zh-CN' && componentname !== chineseName
      ? `${ComponentName} ${chineseName}`
      : ComponentName
  });
});

fileSave(path.join(__dirname, '../../examples/nav.config.json'))
  .write(JSON.stringify(navConfigFile, null, '  '), 'utf8')
  .end('\n');
```
