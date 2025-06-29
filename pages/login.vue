<template>
    <PageTitle>
        <template #actions>
            <div class="flex gap-1">
                <nuxt-link to="/register">
                    <a-button type="primary" class="gap-1">Зарегистрироваться</a-button>
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
                    label="Адрес электронной почты"
                    name="email"
                    :rules="[{ required: true, message: 'Введите адрес электроной почты' }]"
                >
                    <a-input v-model:value="formData.email" type="email" />
                </a-form-item>
                <a-form-item
                    label="Пароль"
                    name="password"
                    :rules="[{ required: true, message: 'Введите пароль' }]"
                >
                    <a-input-password v-model:value="formData.password" />
                </a-form-item>

                <a-form-item :wrapper-col="{ offset: 11, span: 16 }">
                    <a-button type="primary" html-type="submit">Войти</a-button>
                </a-form-item>
            </a-form>
        </a-col>
    </a-row>
</template>

<script setup lang="ts">
    import { notification } from 'ant-design-vue';
    import { type FetchError } from 'ofetch';

    definePageMeta({
        title: 'Авторизация',
        public: true,
    });

    const router = useRouter();
    const { signIn } = useAuth();

    interface IFormData {
        email: string,
        password: string,
    }

    const formData = reactive<IFormData>({
        email: '',
        password: '',
    });

    async function onFinish(values: IFormData) {
        try {
            await signIn(values);
            await router.push('/');
        } catch (error) {
            notification.error({
                message: `Ошибка авторизации`,
                description: (error as FetchError).data.message,
            });
        }
    }
</script>
