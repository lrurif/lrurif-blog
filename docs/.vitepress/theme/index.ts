// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import Theme from 'vitepress/theme'
import './style.css'
// import DocBefore from "../components/docBefore.vue"
export default {
  ...Theme,
  Layout: () => {
    return h(Theme.Layout, null, {
      // "doc-before": () => h(DocBefore)
    })
  },
  enhanceApp({ app, router, siteData }) {
    // ...
  }
}
