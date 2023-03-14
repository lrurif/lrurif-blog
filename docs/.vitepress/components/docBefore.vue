<!--.vitepress/theme/MyLayout.vue-->
<script setup>
import { useData } from 'vitepress'
const { frontmatter } = useData() //这里的frontmatter就是各个md文件中自己写在最上面的东西
</script>

<template>
    <div>
        <span class="page-info"><span class="icon">✍️</span>{{ frontmatter.author }}</span>
    </div>
</template>

<style>
.page-info>.icon{
    margin-right: 20px;
}
</style>