---
    layoutClass: m-nav-layout
    outline: [2, 3, 4]
---
<script setup>
import LibList from "./components/lib-list.vue"
import { LIB_LIST } from "./data"
</script>

# 收藏库

<div class="m-nav-layout">
    <lib-list v-for="item in LIB_LIST" :key="item.title" v-bind="item"></lib-list>
</div>

