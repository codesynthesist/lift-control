<template>
    <a-form
        :model="formData"
        :rules="formRules"
        layout="vertical"
        ref="formRef"
    >
        <a-form-item name="name" label="Название">
            <a-input v-model:value="formData.name"/>
        </a-form-item>
        <a-form-item name="type" label="Тип">
            <a-select v-model:value="formData.type">
                <a-select-option
                    v-for="option of elevatorTypeOptions"
                    :value="option.value"
                >
                    {{ option.label }}
                </a-select-option>
            </a-select>
        </a-form-item>
        <a-form-item name="capacity" label="Грузоподъемность (кг)">
            <a-input
                v-model:value="formData.capacity"
                type="number"
                min="0"
                max="5000"
            />
        </a-form-item>
        <a-form-item name="speed" label="Скорость (м\с)">
            <a-input
                v-model:value="formData.speed"
                type="number"
                min="0"
                max="10"
                step="0.1"
            />
        </a-form-item>
        <a-form-item name="creationDate" label="Дата ввода в эксплуатацию">
            <a-date-picker
                v-model:value="formData.creationDate"
                picker="month"
            />
        </a-form-item>
        <a-form-item name="lastServiceDate" label="Дата последнего техобслуживания">
            <a-date-picker
                v-model:value="formData.lastServiceDate"
                picker="month"
            />
        </a-form-item>
        <a-form-item>
            <a-button
                type="primary"
                html-type="submit"
                @click="onSubmit"
            >Добавить
            </a-button>
        </a-form-item>
    </a-form>
</template>

<script setup lang="ts">
import dayjs from 'dayjs';
import type { SelectProps } from 'ant-design-vue';
import type { Rule } from 'ant-design-vue/es/form';
import { ElevatorTypes, type ElevatorForm } from '~/types';
import { useElevatorsStore } from '~/stores/elevator';

const elevatorStore = useElevatorsStore();
const router = useRouter();
const formRef = ref();

definePageMeta({
    title: 'Добавить лифт',
});

const formRules: Record<keyof ElevatorForm, Rule[]> = {
    name: [
        { required: true, message: 'Введите название' },
    ],
    type: [
        { required: true, message: 'Укажите тип' },
    ],
    capacity: [
        { required: true, message: 'Укажите грузоподъемность' },
    ],
    speed: [
        { required: true, message: 'Укажите скорость' },
        // { min, max } TODO: Заюзать специальный инпут
    ],
    creationDate: [
        { required: true, message: 'Укажите дату производства' },
    ],
    lastServiceDate: [
        { required: true, message: 'Укажите дату последнего обслуживания' },
    ],
};

const formData = reactive<ElevatorForm>({
    name: '',
    capacity: 320,
    speed: 1.5,
    type: ElevatorTypes.PASSENGER,
    creationDate: dayjs(),
    lastServiceDate: null,
});

const elevatorTypeOptions: SelectProps['options'] = [
    {
        value: ElevatorTypes.PASSENGER,
        label: 'Пассажирский',
    },
    {
        value: ElevatorTypes.CARGO,
        label: 'Грузовой',
    },
];

async function onSubmit() {
    try {
        await formRef.value.validate();

        const { id } = elevatorStore.addElevator({
            ...formData,
            creationDate: dayjs(formData.creationDate),
            lastServiceDate: dayjs(formData.lastServiceDate),
        });

        await router.push({ path: `/elevators/${id}` });
    } catch (error) {
        console.log('error', error, formData);
    }
}
</script>
