<template>
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
                    label="Email"
                    name="email"
                    :rules="[{ required: true, message: 'Email is required' }]"
                >
                    <a-input v-model:value="formData.email" type="email" />
                </a-form-item>

                <a-form-item
                    label="Password"
                    name="password"
                    :rules="[{ required: true, message: 'Password is required' }]"
                >
                    <a-input-password v-model:value="formData.password" />
                </a-form-item>

                <a-form-item :wrapper-col="{ offset: 11, span: 16 }">
                    <a-button type="primary" html-type="submit">Login</a-button>
                </a-form-item>
            </a-form>
        </a-col>
    </a-row>
</template>

<script setup lang="ts">
    import { notification } from 'ant-design-vue';
    import { type FetchError } from 'ofetch';

    definePageMeta({
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
            await signIn(values.email, values.password);
            await router.push('/');
        } catch (error) {
            notification.error({
                message: `Authorization error`,
                description: (error as FetchError).data.message,
            });
        }
    }
</script>
