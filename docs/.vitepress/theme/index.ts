// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import { useData } from 'vitepress'
import Theme from 'vitepress/theme'
import './style.css'
// import DocBefore from "../components/docBefore.vue"
export default {
  ...Theme,
  Layout: () => {
    const props: Record<string, any> = {}
    // 获取 frontmatter
    const { frontmatter } = useData()
    /* 添加自定义 class */
    if (frontmatter.value?.layoutClass) {
      props.class = frontmatter.value.layoutClass
    }
    return h(Theme.Layout, props, {
      // "doc-before": () => h(DocBefore)
    })
  },
  enhanceApp({ app, router, siteData }) {
    // ...
  }
}
