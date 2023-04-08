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
    ]
};
