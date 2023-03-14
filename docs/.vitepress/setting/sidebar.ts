import type { DefaultTheme } from "vitepress"
export const sidebar: DefaultTheme.Config['sidebar'] = {
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
    ]
}