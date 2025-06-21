<template>
    <client-only>
        <a-layout-header>
            <div class="logo" />
            <div class="flex justify-between" v-if="isAuthenticated">
                <a-menu
                    v-model:selectedKeys="current"
                    theme="dark"
                    mode="horizontal"
                    :items="items"
                ></a-menu>

                <!-- Правая часть -->
                <div class="flex" style="color: white">
                    <a-dropdown>
                        <a class="ant-dropdown-link" @click.prevent>
                            Пользователь: {{ user.name }}
                            <down-outlined />
                        </a>
                        <template #overlay>
                            <a-menu>
                                <a-menu-item @click.prevent="confirmSignOut">
                                    Выйти
                                </a-menu-item>
                            </a-menu>
                        </template>
                    </a-dropdown>
                </div>
            </div>
        </a-layout-header>
    </client-only>
</template>

<script setup lang="ts">
import { type MenuProps } from 'ant-design-vue';
import { createVNode } from 'vue';
import { NuxtLink, SwitcherFilled, ControlFilled, SettingFilled, ExclamationCircleOutlined } from "#components";

const router = useRouter();
const route = useRoute();
const { user, isAuthenticated, signOut } = useAuth();

const current = ref<string[]>(['dashboard']);
const items = ref<MenuProps['items']>([
    {
        key: 'dashboard',
        icon: h(SwitcherFilled),
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

function confirmSignOut() {
    Modal.confirm({
        title: 'Вы действительно хотите выйти?',
        icon: createVNode(ExclamationCircleOutlined),
        content: createVNode('div', {}, 'Вы будете перенаправлены на страницу авторизации'),
        okText: 'Выход',
        cancelText: 'Отмена',
        async onOk() {
            await signOut();
            await router.push('/login');
        },
    });
}

watch(() => route.path, () => {
    current.value = [route.path.split('/')[1] ?? ''];
}, { immediate: true});

</script>
