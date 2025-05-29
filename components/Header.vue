<template>
    <a-layout-header>
        <div class="logo" />
        <a-menu
            v-model:selectedKeys="current"
            theme="dark"
            mode="horizontal"
            :items="items"
            :style="{ lineHeight: '64px' }"
        ></a-menu>
    </a-layout-header>
</template>

<script setup lang="ts">
import { type MenuProps } from 'ant-design-vue';
import { NuxtLink, SwitcherFilled, ControlFilled, SettingFilled } from "#components";

const route = useRoute();
const current = ref<string[]>(['dashboard']);
const items = ref<MenuProps['items']>([
    {
        key: 'dashboard',
        icon: () => h(SwitcherFilled),
        label: h(NuxtLink, { to: '/dashboard' }, () => 'Состояние'),
    },
    {
        key: 'elevators',
        icon: h(ControlFilled),
        label: h(NuxtLink, { to: '/elevators' }, () => 'Лифты'),
    },

    {
        key: 'settings',
        icon: h(SettingFilled),
        label: h(NuxtLink, { to: '/settings' }, () => 'Настройки'),
    },
]);

watch(() => route.path, () => {
    current.value = [route.path.split('/')[1] ?? ''];
}, { immediate: true});

</script>

<style scoped>

</style>
