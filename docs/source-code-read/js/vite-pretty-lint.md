# 如何一键为 vite 项目添加 eslint 和 prettier

## 准备工作

```zsh
git clone git@github.com:tzsk/vite-pretty-lint.git
cd vite-pretty-lint
npm i
```

## 插件功能使用方法

```zsh
# 前置工作：创建一个vite项目，例如执行以下脚本
npm create vite@latest my-vue-app --template vue
cd my-vue-app
# 执行以下脚本，选择对应选项
npm init vite-pretty-lint
```

## 源码解析

### 首先查看外部依赖包

- `chalk`: 在控制台打印带有样式的文字
- `gradient-string`: 在控制台可以打印渐变色文字
- `nanospinner`: 一个终端加载图标
- `enquirer`: 一个用于和用户在终端交互的库
- `@babel/core`: babel编译核心库

### main.js 文件解析

```javascript
// 获取命令运行位置
const projectDirectory = process.cwd();

// 定义eslint放置位置
const eslintFile = path.join(projectDirectory, ".eslintrc.json");
// 定义prettier文件放置位置
const prettierFile = path.join(projectDirectory, ".prettierrc.json");
// 定义eslint忽略文件放置位置
const eslintIgnoreFile = path.join(projectDirectory, ".eslintignore");

async function run() {
    // 打印欢迎文字
    console.log(
        chalk.bold(
            gradient.morning(
                "\n🚀 Welcome to Eslint & Prettier Setup for Vite!\n"
            )
        )
    );
    let projectType, packageManager;

    try {
        // 通过enquirer来获取用户使用的模板以及使用的包管理器
        const answers = await askForProjectType();
        projectType = answers.projectType;
        packageManager = answers.packageManager;
    } catch (error) {
        console.log(chalk.blue("\n👋 Goodbye!"));
        return;
    }
    // 动态获取模板内容
    const { packages, eslintOverrides } = await import(
        `./templates/${projectType}.js`
    );
    // 定义需要获取的安装包名称列表
    const packageList = [...commonPackages, ...packages];
    // 定义eslint默认配置
    const eslintConfigOverrides = [
        ...eslintConfig.overrides,
        ...eslintOverrides,
    ];
    const eslint = { ...eslintConfig, overrides: eslintConfigOverrides };
    // 定义默认配置-end
    // 定义根据用户所选包管理器的执行命令
    const commandMap = {
        npm: `npm install --save-dev ${packageList.join(" ")}`,
        yarn: `yarn add --dev ${packageList.join(" ")}`,
        pnpm: `pnpm install --save-dev ${packageList.join(" ")}`,
    };
    // 获取用户的配置文件
    const viteConfigFiles = ["vite.config.js", "vite.config.ts"];
    const [viteFile] = viteConfigFiles
        .map((file) => path.join(projectDirectory, file))
        .filter((file) => fs.existsSync(file));
    // 如果没有这两个文件，则退出
    if (!viteFile) {
        console.log(
            chalk.red(
                "\n🚨 No vite config file found. Please run this command in a Vite project.\n"
            )
        );
        return;
    }
    // 获取使用babel解析过的code，里面插入了eslintPlugin插件。
    const viteConfig = viteEslint(fs.readFileSync(viteFile, "utf8"));
    // 获取安装npm包命令
    const installCommand = commandMap[packageManager];
    // 如果安装npm包命令不存在，则报错
    if (!installCommand) {
        console.log(
            chalk.red("\n✖ Sorry, we only support npm、yarn and pnpm!")
        );
        return;
    }
    // 执行加载中状态
    const spinner = createSpinner("Installing packages...").start();
    // 使用child_process模块下的exec命令执行命令
    exec(
        `${commandMap[packageManager]}`,
        { cwd: projectDirectory },
        (error) => {
            if (error) {
                spinner.error({
                    text: chalk.bold.red("Failed to install packages!"),
                    mark: "✖",
                });
                console.error(error);
                return;
            }
            // 将配置写入到文件中-start
            fs.writeFileSync(eslintFile, JSON.stringify(eslint, null, 2));
            fs.writeFileSync(
                prettierFile,
                JSON.stringify(prettierConfig, null, 2)
            );
            fs.writeFileSync(eslintIgnoreFile, eslintIgnore.join("\n"));
            fs.writeFileSync(viteFile, viteConfig);
            // 将配置写入到文件中-start

            spinner.success({
                text: chalk.bold.green("All done! 🎉"),
                mark: "✔",
            });
            console.log(
                chalk.bold.cyan(
                    "\n🔥 Reload your editor to activate the settings!"
                )
            );
        }
    );
}
// 执行脚本
run().catch((e) => {
    console.error(e);
});
```

## 流程

1. 获取`enquirer`用户所选 `vite` 模板以及 `npm` 包管理器。
2. 定义 eslint、pretty 配置文件内容以及所需要安装的包内容。
3. 使用 babel 的 `ast` 模块，来解析并获取修改后的`vite.config.[t|j]s`文件内容。
4. 使用`exec`命令安装所需依赖包。
5. 将配置文件写入到对应文件中。

## 总结
1. 当需要修改一个js文件时，可以通过babel的去解析成ast，然后修改ast树，最后生成js代码。
2. 一些配置文件可以单独放到文件中，通过不同的配置来获取不同文件的内容。
3. 一些炫酷的依赖包，例如上面用到的`chalk`和`gradient-string`,可以使你的提示效果展示的更加美观。
