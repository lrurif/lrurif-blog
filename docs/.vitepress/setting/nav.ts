import type { DefaultTheme } from "vitepress";
export const nav: DefaultTheme.Config["nav"] = [
    { text: "首页", link: "/" },
    {text: "导航", link: "/nav/main"},
    {
        text: "前端导览",
        items: [
            {
                text: "JavaScript",
                link: "/front-end/javascript/types",
            },
            {
                text: "HTML",
                link: "/front-end/html/semantization",
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
    { text: "踩坑记录", link: "/pit/mp/uview" },
    { text: "可视化", link: "/graphics/svg/stroke-animation" },
]