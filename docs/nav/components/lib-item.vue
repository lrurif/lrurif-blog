<script lang="ts" setup>
    defineProps({
        title: String,
        desc: String,
    })
</script>
<template>
    <div>
        {{ title }}
        {{ desc}}
    </div>
</template>