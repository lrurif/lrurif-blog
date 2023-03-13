import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
    outDir: '../dist',
    base: "/lrurif-blog/",
    cleanUrls: true,
    title: "F",
    description: "fang’s blog",
    themeConfig: {
      logo: 'https://img2.baidu.com/it/u=4002314442,3709471545&fm=253&fmt=auto&app=138&f=JPEG?w=531&h=500',
        // https://vitepress.dev/reference/default-theme-config
        nav: [
            { text: "首页", link: "/" },
            { text: "案例", link: "/markdown-examples" },
            { text: "前端导览", link: "/front-end/javascript/types" },
            { text: "可视化", link: "/graphics/svg/stroke-animation" },
        ],
        sidebar: {
            "/Examples/": [
                {
                    text: "Examples",
                    items: [
                        {
                            text: "Markdown Examples",
                            link: "/markdown-examples",
                        },
                        { text: "Runtime API Examples", link: "/api-examples" },
                    ],
                },
            ],
            "/front-end/": [
                {
                    text: "JavaScript基础知识",
                    items: [
                        {
                            text: "类型",
                            link: "/front-end/javascript/types",
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
            ]
        },
        socialLinks: [{ icon: "github", link: "https://github.com/lrurif" }],
        footer: {
          message: '如有转载或 CV 的请标注本站原文地址',
          copyright: 'Copyright © 2023-present lrurif'
        },
    
    },
});
