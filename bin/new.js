// 由于text字段和文件path字段不同，所以不支持新建类目【苦】，只能在原有类目下快速新建文章（以后看下如何改造）。
import ts from "typescript";
import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';
import inquirer from 'inquirer';
import {execa} from 'execa';
const dirname = path.dirname(fileURLToPath(import.meta.url));
const sidebarPath = path.join(dirname, '../docs/.vitepress/setting/sidebar.ts')
// 读取 TypeScript 代码
const code = fs.readFileSync(sidebarPath, 'utf-8');
// 编译 TypeScript 代码为 JavaScript 字符串
const result = ts.transpileModule(code, {
    compilerOptions: {
        target: ts.ScriptTarget.ES5,
        module: ts.ModuleKind.CommonJS
    }
});
const exports = {};
// 获取sidebar内容
eval(result.outputText);
const { sidebar } = exports;

// 获取所有类别，目前只支持二级分类
function getAllCate(data) {
    let res = [];
    for (let key in data) {
        res = [...res, ...data[key]]
    }
    return res;
}
const allCate = getAllCate(sidebar);
// 定义一些问题
const questions = [
    {
        type: 'list',
        name: 'cate',
        message: '选择一个文章类目',
        choices: allCate.map(item => item.text),
        filter(val) {
            return val.toLowerCase();
        },
    },
    {
        type: 'input',
        name: 'filename',
        message: '请输入文件名',
        validate(value) {
            return value.length > 0;
        },
    },
    {
        type: 'input',
        name: 'title',
        message: '请输入文章标题',
        validate(value) {
            return value.length > 0;
        },
    },
];
inquirer.prompt(questions).then(async ({ cate, filename, title }) => {
    // 获取用户所选类别项
    let cateItem = allCate.find(item => item.text.toLowerCase() == cate.toLowerCase());
    let link = cateItem?.items?.[0].link;
    let pathArr = link.split("/");
    pathArr[pathArr.length - 1] = filename;
    let filePath = pathArr.join("/");
    cateItem.items.push({
        text: title,
        link: filePath,
    });
    // 将sidebar.ts内容写入 -start
    const templateText = `import type { DefaultTheme } from "vitepress";
    export const sidebar: DefaultTheme.Config["sidebar"] = ${JSON.stringify(sidebar, null, '    ')}`;
    fs.writeFileSync(sidebarPath, templateText);
    // 将sidebar.ts内容写入 -end
    // 新建文件
    const filePathUrl = path.join(dirname, `../docs${filePath}.md`);
    fs.writeFileSync(filePathUrl, `# ${title}`);
    console.log(`新建文档成功，文件路径为：${filePathUrl}`);
    // 新建文件
    try{
        await execa('code', [filePathUrl]);
        console.log("自动打开文件成功，请开始写博客吧");
    }catch(e){
        console.log("自动打开文件失败");
        console.log(e, 'error');
    }
});
