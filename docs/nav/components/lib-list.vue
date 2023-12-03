<script lang="ts" setup>
import LibItem from "./lib-item.vue";
import type { LibData } from "../data";
defineProps<{
  title: string;
  list: LibData[];
}>();
</script>
<template>
  <div>
    <h2 v-if="title" :id="title" tabindex="-1">
      {{ title }}
      <a class="header-anchor" :href="`#${title}`" aria-hidden="true">#</a>
    </h2>
    <LibItem v-for="item in list" v-bind="item" :key="item.title"></LibItem>
  </div>
</template>
