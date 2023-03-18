import type { HeadConfig } from "vitepress";
import { BASE_URL } from "./setting";
export const head: HeadConfig[] = [
    ["meta", { name: "author", content: "lrurif" }],
    ["meta", { name: "description", content: "方的博客" }],
    ["meta", { name: "keywords", content: "blog,front-end" }],
    ["link", { rel: "icon", href: `${BASE_URL}favicon.ico` }],
    ["link",{rel: "stylesheet",href: "https://cdn.jsdelivr.net/npm/@fancyapps/ui/dist/fancybox.css"}],
    ["script",{src: "https://cdn.jsdelivr.net/npm/@fancyapps/ui@4.0/dist/fancybox.umd.js"}],
];
