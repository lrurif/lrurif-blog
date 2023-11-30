<script lang="ts" setup>
import LibItem from "./lib-item.vue"
defineProps({
    title: String,
    list: Array,
})
</script>
<template>
    <div>{{ title }}</div>
    <!-- <a class="header-anchor" :href="`#${formatTitle}`" aria-hidden="true">#</a> -->
    <LibItem v-for="item in list" v-bind="item"></LibItem>
</template>