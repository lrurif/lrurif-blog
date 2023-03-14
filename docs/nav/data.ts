import type { NavLinkType } from "./type";

type NavData = {
    title: string;
    items: NavLinkType[];
};

export const NAV_DATA: NavData[] = [
    {
        title: "官网",
        items: [
            {
                icon: "https://cn.vuejs.org/logo.svg",
                title: "Vue3",
                desc: "Vue3官网",
                link: "https://cn.vuejs.org/",
            },
        ],
    },
    {
        title: "常用工具",
        items: [
            {
                icon: "https://caniuse.com/img/favicon-128.png",
                title: "Can I use",
                desc: "前端 API 兼容性查询",
                link: "https://caniuse.com",
            },
            {
                icon: "https://tinypng.com/images/apple-touch-icon.png",
                title: "TinyPNG",
                desc: "在线图片压缩工具",
                link: "https://tinypng.com",
            },
            {
                icon: "https://tool.lu/favicon.ico",
                title: "在线工具",
                desc: "开发人员的工具箱",
                link: "https://tool.lu",
            },
            {
                icon: "https://www.json.cn/favicon.ico",
                title: "Json 中文网",
                desc: "JSON 在线解析及格式化验证",
                link: "https://www.json.cn",
            },
        ],
    },
];
