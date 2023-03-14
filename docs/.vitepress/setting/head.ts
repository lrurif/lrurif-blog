import type { HeadConfig } from 'vitepress'
import {BASE_URL} from "./setting"
export const head: HeadConfig[] = [
  ["meta", {name: "author", content: "lrurif"}],
  ["meta", {name: "description", content: "方的博客"}],
  ["meta", {name: "keywords", content: "blog,front-end"}],
  ['link', { rel: 'icon', href: `${BASE_URL}favicon.ico` }],
]