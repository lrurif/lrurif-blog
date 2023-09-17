import type { DefaultTheme } from "vitepress";
    export const sidebar: DefaultTheme.Config["sidebar"] = {
    "/front-end/": [
        {
            "text": "JavaScript基础知识",
            "items": [
                {
                    "text": "JavaScript类型",
                    "link": "/front-end/javascript/types"
                },
                {
                    "text": "Iterator和Generator详解",
                    "link": "/front-end/javascript/iterator"
                }
            ]
        },
        {
            "text": "HTML",
            "items": [
                {
                    "text": "HTML语义化",
                    "link": "/front-end/html/semantization"
                }
            ]
        },
        {
            "text": "CSS",
            "items": [
                {
                    "text": "Grid布局",
                    "link": "/front-end/css/grid"
                },
                {
                    "text": "BFC",
                    "link": "/front-end/css/bfc"
                },
                {
                    "text": "行内元素的动画",
                    "link": "/front-end/css/span-animation"
                },
                {
                    "text": "box-shadow实现拟态风格样式",
                    "link": "/front-end/css/box-shadow"
                },
                {
                    "text": "实现一个手电筒照亮效果",
                    "link": "/front-end/css/light"
                },
                {
                    "text": "position: sticky的理解",
                    "link": "/front-end/css/sticky"
                }
            ]
        },
        {
            "text": "动画",
            "items": [
                {
                    "text": "animejs的使用",
                    "link": "/front-end/animation/animejs"
                }
            ]
        },
        {
            "text": "Flutter",
            "items": [
                {
                    "text": "Flutter的坑",
                    "link": "/front-end/flutter/issue"
                },
                {
                    "text": "Flutter打包",
                    "link": "/front-end/flutter/build"
                }
            ]
        },
        {
            "text": "浏览器",
            "items": [
                {
                    "text": "HTML渲染的一些结论",
                    "link": "/front-end/browser/HTML渲染"
                },
                {
                    "text": "浏览器调试-替换代码",
                    "link": "/front-end/browser/replace-code"
                },
                {
                    "text": "style对domcontentloaded的影响",
                    "link": "/front-end/browser/style对domcontentloaded的影响"
                }
            ]
        }
    ],
    "/graphics/": [
        {
            "text": "SVG",
            "items": [
                {
                    "text": "stroke-dasharray和stroke-dashoffset理解",
                    "link": "/graphics/svg/stroke-animation"
                }
            ]
        },
        {
            "text": "THREE",
            "items": [
                {
                    "text": "THREE学习",
                    "link": "/graphics/three/learning"
                }
            ]
        },
        {
            "text": "小技巧",
            "items": [
                {
                    "text": "可视化小技巧",
                    "link": "/graphics/tips/"
                },
                {
                    "text": "echarts如何自定义图形",
                    "link": "/graphics/tips/echarts-custom"
                }
            ]
        },
        {
            "text": "d3",
            "items": [
                {
                    "text": "d3绘制地图",
                    "link": "/graphics/d3/map"
                }
            ]
        }
    ],
    "/pit/": [
        {
            "text": "JS",
            "items": [
                {
                    "text": "js中toFixed的坑",
                    "link": "/pit/js/toFixed"
                },
                {
                    "text": "navigator.clipboard的坑",
                    "link": "/pit/js/clipboard"
                }
            ]
        },
        {
            "text": "CSS",
            "items": [
                {
                    "text": "transform-origin引发的坑",
                    "link": "/pit/css/transform-origin-pit"
                },
                {
                    "text": "父元素flex布局，子元素scale缩放引发的坑",
                    "link": "/pit/css/flex-scale-pit"
                }
            ]
        },
        {
            "text": "小程序",
            "items": [
                {
                    "text": "uview的坑",
                    "link": "/pit/mp/uview"
                },
                {
                    "text": "微信小程序web-view通信的坑",
                    "link": "/pit/mp/微信小程序web-view通信"
                }
            ]
        }
    ],
    "/source-code-read/": [
        {
            "text": "工具类",
            "items": [
                {
                    "text": "arrify",
                    "link": "/source-code-read/js/arrify"
                },
                {
                    "text": "launch-editor-middleware",
                    "link": "/source-code-read/tools/launch-editor-middleware"
                },
                {
                    "text": "vue3源码之工具函数",
                    "link": "/source-code-read/tools/vue3-tools"
                },
                {
                    "text": "vue2中this如何能够直接拿到data和methods?",
                    "link": "/source-code-read/vue/data-proxy"
                },
                {
                    "text": "nextTick 简单实现",
                    "link": "/source-code-read/vue/nextTick"
                },
                {
                    "text": "剖析 element-ui 中新建组件的命令",
                    "link": "/source-code-read/tools/element-ui-new"
                },
                {
                    "text": "koa-compose源码",
                    "link": "/source-code-read/js/koa-compose"
                },
                {
                    "text": "configstore源码学习",
                    "link": "/source-code-read/js/configstore"
                },
                {
                    "text": "如何一键为vite项目添加eslint和prettier",
                    "link": "/source-code-read/js/vite-pretty-lint"
                },
                {
                    "text": "classnames源码解读",
                    "link": "/source-code-read/js/classnames"
                },
                {
                    "text": "co源码阅读",
                    "link": "/source-code-read/js/co"
                },
                {
                    "text": "vuex",
                    "link": "/source-code-read/js/vuex"
                }
            ]
        }
    ],
    "/tips/": [
        {
            "text": "一些简单的方法",
            "items": [
                {
                    "text": "一些简单的方法",
                    "link": "/tips/simple-methods/"
                }
            ]
        },
        {
            "text": "node.js",
            "items": [
                {
                    "text": "node小技巧",
                    "link": "/tips/node/run-path"
                }
            ]
        },
        {
            "text": "日常",
            "items": [
                {
                    "text": "日常",
                    "link": "/tips/daily/normal"
                }
            ]
        }
    ],
    "/algorithm/": [
        {
            "text": "递归",
            "items": [
                {
                    "text": "递归三部曲",
                    "link": "/algorithm/递归三部曲"
                }
            ]
        },
        {
            "text": "回溯",
            "items": [
                {
                    "text": "回溯模板",
                    "link": "/algorithm/回溯模板"
                }
            ]
        }
    ],
    "/engineering/": [
        {
            "text": "git",
            "items": [
                {
                    "text": "Git中Tag的使用",
                    "link": "/engineering/git/tag"
                },
                {
                    "text": "记录一次git瘦身",
                    "link": "/engineering/git/clean"
                }
            ]
        }
    ]
}