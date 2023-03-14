---
    layoutClass: m-nav-layout
    outline: [2, 3, 4]
---
<script setup>
import NavLinkList from './components/NavLinkList.vue'
import "./index.scss"
import { NAV_DATA } from './data'
</script>

# 前端导航

<div class="m-nav-layout">
<NavLinkList v-for="{title, items} in NAV_DATA" :title="title" :items="items"/>
</div>

