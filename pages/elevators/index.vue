<template>
    <PageTitle>
        <template #actions>
            <div class="flex gap-1">
                <a-button type="primary" danger @click="clear">Очистить</a-button>
                <nuxt-link to="/elevators/add">
                    <a-button type="primary" class="gap-1">Добавить</a-button>
                </nuxt-link>
            </div>
        </template>
    </PageTitle>

    <client-only>
        <div class="flex flex-wrap w-full">
            <nuxt-link
                v-for="elevator of elevators"
                :key="elevator.id"
                :to="`/elevators/${elevator.id}`"
            >
                    <ElevatorCard
                        :elevator="elevator"
                        :state="getElevatorState(elevator.id)"
                    ></ElevatorCard>

            </nuxt-link>
        </div>
        <template #fallback>
            <a-empty/>
        </template>
    </client-only>
</template>

<script setup lang="ts">
import { useElevatorsStore } from '~/stores/elevator';
import ElevatorCard from '~/components/ElevatorCard.vue';
import type { ElevatorState } from '~/types';

definePageMeta({
    title: 'Лифты',
});

const elevatorsStore = useElevatorsStore();

const { elevators, elevatorsState } = storeToRefs(elevatorsStore);

function getElevatorState(id: number): ElevatorState {
    return elevatorsState.value.find((e: ElevatorState) => e.id === id) as ElevatorState;
}

function clear() {
    elevatorsStore.clearElevators();
}
</script>
