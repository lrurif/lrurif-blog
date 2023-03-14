import type { HeadConfig } from 'vitepress'
import BASE_URL from "../config"

export const head: HeadConfig[] = [
  ['link', { rel: 'icon', href: `${BASE_URL}favicon.ico` }],
]