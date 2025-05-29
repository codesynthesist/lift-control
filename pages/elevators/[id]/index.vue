<template>
    <div class="flex justify-between">
        <slot>
            <a-typography-title :level="2">{{ elevator?.name }}</a-typography-title>
        </slot>
        <slot name="actions">
            <a-button type="primary">Удалить</a-button>
        </slot>
    </div>
</template>

<script setup lang="ts">
import type { ElevatorConfig } from '~/types';

const route = useRoute();
const { elevators } = useElevatorsStore();
const elevator = ref<ElevatorConfig>();

onMounted(() => {
    const foundElevator = elevators.find((e) => e.id === Number(route.params.id));

    if (!foundElevator) {
        throw createError({
            statusCode: 404,
            statusMessage: 'Лифт не найден',
        });
    }

    elevator.value = foundElevator;
});

watch(elevator, (value) => {
    if (value) {
        useSeoMeta({
            title: value.name,
        });
    }
}, { immediate: true })

</script>
