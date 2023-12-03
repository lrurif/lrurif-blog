<script lang="ts" setup>
import type { label } from "../data";
defineProps<{
  title: string;
  icon: string;
  desc: string;
  link: string;
  labels: Array<label>;
}>();
</script>
<template>
  <a class="lib-item-wrapper" :href="link" target="_blank">
    <div class="lib-item-left">
      <img v-if="icon" :src="icon" class="icon" />
      <h4 class="title">{{ title }}</h4>
      <a
        v-for="item in labels"
        class="label"
        :href="item.link"
        target="_blank"
        :key="item.name"
        >{{ item.name }}</a
      >
    </div>
    <div class="lib-item-right">
      {{ desc }}
    </div>
  </a>
</template>
<style scoped lang="scss">
$colors: #f6e58d, #ffbe76, #ff7979, #badc58, #dff9fb, #f9ca24, #f0932b;
.lib-item-wrapper {
  padding: 25px 20px;
  display: flex;
  align-items: flex-start;
  font-size: 14px;
  color: rgb(85, 85, 85);
  cursor: pointer;
  &:not(:last-child) {
    border-bottom: 1px solid var(--vp-c-divider);
  }
  &:hover {
    background: #f5f5f5;
    text-decoration: none;
  }
  .lib-item-left {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    flex: 1;
    min-width: 0;
    .icon {
      width: 28px;
      height: 28px;
    }
    .title {
      margin-left: 5px;
    }
    .label {
      padding: 0 2px;
      color: #fff;
      border-radius: 4px;
      margin-left: 4px;
      font-size: 12px;
      line-height: 20px;
      background: #f6e58d;
      &:hover {
        text-decoration: none;
        opacity: 0.8;
      }
      @for $i from 1 through length($colors) {
        &:nth-child(#{$i}) {
          background: nth($colors, $i);
        }
      }
    }
  }
  .lib-item-right {
    flex: 3;
  }
}
</style>
