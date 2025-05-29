import { defineStore } from 'pinia';
import type { ElevatorForm, ElevatorConfig } from '~/types';

export const useElevatorsStore = defineStore(
    'elevators',
    () => {
        const elevators = ref<ElevatorConfig[]>([]);

        function addElevator(params: ElevatorForm): ElevatorConfig {
            const id = new Date().getTime();
            const elevator: ElevatorConfig = {
                id,
                ...params
            };

            elevators.value.push(elevator);

            return elevator;
        }

        function removeElevator(id: number): ElevatorConfig {
            const index = elevators.value.findIndex((e: ElevatorConfig) => e.id === id);

            if (index === -1) {
                throw new Error(`Elevator with id ${id} not found`);
            }

            // remove from list and return
            return elevators.value.splice(index, 1)[0];
        }

        return {
            elevators,
            addElevator,
            removeElevator,
        };
    },
    {
        persist: {
            key: 'elevators',
            storage: piniaPluginPersistedstate.localStorage(),
            pick: ['elevators'],
        },
    }
);
