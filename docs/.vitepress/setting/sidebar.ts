import type { DefaultTheme } from "vitepress"
export const sidebar: DefaultTheme.Config['sidebar'] = {
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
    ],
    "/pit/": [
        {
          text: "小程序",
          items: [
            {
              text: "uview的坑",
              link: "/pit/mp/uview"
            }
          ]
        }
      ],
      "/source-code-read/": [
        {
          text: "工具类",
          items: [
            {
              text: "arrify",
              link: "/source-code-read/js/arrify"
            },
            {
                text: "launch-editor-middleware",
                link: "/source-code-read/tools/launch-editor-middleware"
            },
            {
                text: "vue3源码之工具函数",
                link: "/source-code-read/tools/vue3-tools"
            }
          ]
        }
      ]
}