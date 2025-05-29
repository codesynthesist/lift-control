<template>
    <a-layout class="layout">
       <Header/>
        <a-layout-content class="layout-content">
            <Breadcrumbs v-if="routeLevel > 2"/>
            <slot></slot>
        </a-layout-content>
        <a-layout-footer style="text-align: center">
            Configuration was last updated on {{ new Date() }}
        </a-layout-footer>
    </a-layout>
</template>

<script setup lang="ts">
    const route = useRoute();

    const routeLevel = computed(() => route.path.split('/').length);
</script>

<style scoped lang="scss">
.layout {
    // sticky footer
    display: grid;
    min-height: 100vh;
    grid-template-rows: auto 1fr auto;
    padding-inline: 0;
}

.layout-content {
    background: #fff;
    padding: 24px 0;
    padding-inline: 50px;
}
</style>
