<template>
    <div v-if="route.meta.title" class="flex justify-between">
        <slot>
            <a-typography-title :level="2">{{ route.meta.title }}</a-typography-title>
        </slot>
        <slot name="actions"></slot>
    </div>
</template>

<script setup lang="ts">
    const route = useRoute()
</script>

<style scoped>

</style>
