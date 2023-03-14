import { defineConfig } from "vitepress";
import { nav, head, sidebar } from "./setting/index"
// https://vitepress.dev/reference/site-config
export default defineConfig({
    outDir: "../dist",
    base: "/lrurif-blog/",
    cleanUrls: true,
    title: "lrurif",
    lastUpdated: true,
    description: "fang’s blog",
    head,
    themeConfig: {
        logo: "https://img2.baidu.com/it/u=4002314442,3709471545&fm=253&fmt=auto&app=138&f=JPEG?w=531&h=500",
        // https://vitepress.dev/reference/default-theme-config
        /* 右侧大纲配置 */
        outline: {
            level: "deep",
            label: "本页目录",
        },
        docFooter: {
          prev: '上一篇',
          next: '下一篇'
        },
        nav,
        sidebar,
        socialLinks: [{ icon: "github", link: "https://github.com/lrurif" }],
        footer: {
            message: "如有转载或 CV 的请标注本站原文地址",
            copyright: "Copyright © 2023-present lrurif",
        },
    },
});
