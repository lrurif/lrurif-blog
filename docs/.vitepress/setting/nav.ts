import type { DefaultTheme } from "vitepress";
export const nav: DefaultTheme.Config["nav"] = [
    { text: "首页", link: "/" },
    {text: "导航", link: "/nav/main"},
    {
        text: "前端导览",
        items: [
            {
                text: "HTML",
                link: "/front-end/html/semantization",
            },
            {
                text: "CSS",
                link: "/front-end/css/grid",
            },
            {
                text: "JavaScript",
                link: "/front-end/javascript/types",
            },
            {
                text: "动画",
                link: "/front-end/animation/animejs",
            },
            {
                text: "Flutter",
                link: "/front-end/flutter/issue",
            },
        ],
    },
    {
        text: "前端工程化",
        items: [
            {
                text: "Git",
                link: "/engineering/git/tag",
            }
        ],
    },
    {
        text: "算法",
        link: "/algorithm/递归三部曲",
    },
    {
        text: "源码阅读",
        link: "/source-code-read/js/arrify"
    },
    { text: "踩坑记录", link: "/pit/js/toFixed" },
    { text: "可视化", link: "/graphics/svg/stroke-animation" },
    { text: "小技巧", link: "/tips/simple-methods/" },
]