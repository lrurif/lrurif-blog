import type { DefaultTheme } from "vitepress";
export const sidebar: DefaultTheme.Config["sidebar"] = {
    "/front-end/": [
        {
            text: "JavaScript基础知识",
            items: [
                {
                    text: "JavaScript类型",
                    link: "/front-end/javascript/types",
                },
                {
                    text: "Iterator和Generator详解",
                    link: "/front-end/javascript/iterator",
                },
            ],
        },
        {
            text: "HTML",
            items: [
                {
                    text: "HTML语义化",
                    link: "/front-end/html/semantization",
                },
            ],
        },
        {
            text: "CSS",
            items: [
                {
                    text: "Grid布局",
                    link: "/front-end/css/grid",
                },
                {
                    text: "BFC",
                    link: "/front-end/css/bfc",
                },
                {
                    text: "行内元素的动画",
                    link: "/front-end/css/span-animation",
                },
                {
                    text: "box-shadow实现拟态风格样式",
                    link: "/front-end/css/box-shadow",
                },
                {
                    text: "实现一个手电筒照亮效果",
                    link: "/front-end/css/light",
                },
            ],
        },
        {
            text: "动画",
            items: [
                {
                    text: "animejs的使用",
                    link: "/front-end/animation/animejs",
                },
            ],
        },
        {
            text: "Flutter",
            items: [
                {
                    text: "Flutter的坑",
                    link: "/front-end/flutter/issue",
                },
                {
                    text: "Flutter打包",
                    link: "/front-end/flutter/build",
                },
            ],
        },
        {
            text: "浏览器",
            items: [
                {
                    text: "HTML渲染的一些结论",
                    link: "/front-end/browser/HTML渲染",
                },
            ],
        },
    ],
    "/graphics/": [
        {
            text: "SVG",
            items: [
                {
                    text: "stroke-dasharray和stroke-dashoffset理解",
                    link: "/graphics/svg/stroke-animation",
                },
            ],
        },
        {
            text: "THREE",
            items: [
                {
                    text: "THREE学习",
                    link: "/graphics/three/learning",
                },
            ],
        },
        {
            text: "小技巧",
            items: [
                {
                    text: "可视化小技巧",
                    link: "/graphics/tips/",
                },
            ],
        },
    ],
    "/pit/": [
        {
            text: "JS",
            items: [
                {
                    text: "js中toFixed的坑",
                    link: "/pit/js/toFixed",
                },
                {
                    text: "navigator.clipboard的坑",
                    link: "/pit/js/clipboard",
                },
            ],
        },
        {
            text: "CSS",
            items: [
                {
                    text: "transform-origin引发的坑",
                    link: "/pit/css/transform-origin-pit",
                },
            ],
        },
        {
            text: "小程序",
            items: [
                {
                    text: "uview的坑",
                    link: "/pit/mp/uview",
                },
            ],
        },
    ],
    "/source-code-read/": [
        {
            text: "工具类",
            items: [
                {
                    text: "arrify",
                    link: "/source-code-read/js/arrify",
                },
                {
                    text: "launch-editor-middleware",
                    link: "/source-code-read/tools/launch-editor-middleware",
                },
                {
                    text: "vue3源码之工具函数",
                    link: "/source-code-read/tools/vue3-tools",
                },
                {
                    text: "vue2中this如何能够直接拿到data和methods?",
                    link: "/source-code-read/vue/data-proxy",
                },
                {
                    text: "nextTick 简单实现",
                    link: "/source-code-read/vue/nextTick",
                },
                {
                    text: "剖析 element-ui 中新建组件的命令",
                    link: "/source-code-read/tools/element-ui-new",
                },
            ],
        },
    ],
    "/tips/": [
        {
            text: "一些简单的方法",
            items: [
                {
                    text: "一些简单的方法",
                    link: "/tips/simple-methods/",
                },
            ],
        },
        {
            text: "node.js",
            items: [
                {
                    text: "node小技巧",
                    link: "/tips/node/run-path",
                },
            ],
        },
        {
            text: "日常",
            items: [
                {
                    text: "日常",
                    link: "/tips/daily/normal",
                },
            ],
        },
    ],
    "/algorithm/": [
        {
            text: "递归",
            items: [
                {
                    text: "递归三部曲",
                    link: "/algorithm/递归三部曲",
                },
            ],
        },
        {
            text: "回溯",
            items: [
                {
                    text: "回溯模板",
                    link: "/algorithm/回溯模板",
                },
            ],
        }
    ],
};
