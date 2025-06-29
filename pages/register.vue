<template>
    <PageTitle>
        <template #actions>
            <div class="flex gap-1">
                <nuxt-link to="/login">
                    <a-button type="primary" class="gap-1">Войти</a-button>
                </nuxt-link>
            </div>
        </template>
    </PageTitle>

    <a-row type="flex" justify="center" class="min-h-screen">
        <a-col :span="6">
            <a-form
                layout="vertical"
                :model="formData"
                name="basic"
                autocomplete="on"
                @finish="onFinish"
            >
                <a-form-item
                    label="Имя"
                    name="name"
                    :rules="[{ required: true, message: 'Введите Ваше имя' }]"
                >
                    <a-input v-model:value="formData.name" />
                </a-form-item>
                <a-form-item
                    label="Адрес электронной почты"
                    name="email"
                    :rules="[{ required: true, message: 'Введите адрес электронной почты' }]"
                >
                    <a-input v-model:value.trim="formData.email" type="email" />
                </a-form-item>
                <a-form-item
                    label="Пароль"
                    name="password"
                    :rules="[{ required: true, message: 'Введите пароль' }]"
                >
                    <a-input-password v-model:value="formData.password" />
                </a-form-item>
                <a-form-item
                    label="Повторите пароль"
                    name="passwordRepeat"
                    :rules="[{ required: true, message: 'Введите пароль повторно' }]"
                >
                    <a-input-password v-model:value="formData.passwordRepeat" />
                </a-form-item>

                <a-form-item :wrapper-col="{ offset: 11, span: 16 }">
                    <a-button type="primary" html-type="submit">Продолжить</a-button>
                </a-form-item>
            </a-form>
        </a-col>
    </a-row>
</template>

<script setup lang="ts">
import { notification } from 'ant-design-vue';
import { type FetchError } from 'ofetch';

definePageMeta({
    title: 'Регистрация',
    public: true,
});

const router = useRouter();
const { signUp, checkAuth, user } = useAuth();

interface IFormData {
    name: string;
    email: string,
    password: string,
    passwordRepeat: string;
}

const formData = reactive<IFormData>({
    name: '',
    email: '',
    password: '',
    passwordRepeat: '',
});

async function onFinish({ name, email, password, passwordRepeat }: IFormData) {
    if (password !== passwordRepeat) {
        notification.error({
            message: `Пароли не совпадают`,
            description: 'Пароли должны совпадать',
        });

        return;
    }

    try {
        const session = await signUp({ name, email, password });

        if (session) {
            await checkAuth();
        }

        if (user.value) {
            notification.success({
                message: `Добро пожаловать, ${user.value.name}!`,
                description: 'Вы были зарегистрированы',
            });

            await router.push('/');
        }
    } catch (error) {
        notification.error({
            message: `Ошибка регистрации`,
            description: (error as FetchError).data.message,
        });
    }
}
</script>
