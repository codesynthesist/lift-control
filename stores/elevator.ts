import { defineStore } from 'pinia';
import {
    Direction,
    type ElevatorForm,
    type ElevatorConfig,
    type ElevatorState,
} from '~/types';

export const useElevatorsStore = defineStore(
    'elevators',
    () => {
        const elevators = ref<ElevatorConfig[]>([]);
        const elevatorsState = ref<ElevatorState[]>([]);

        function addElevatorState(state: ElevatorState): ElevatorState {
            elevatorsState.value.push(state);

            return state;
        }

        function addElevator(params: ElevatorForm): ElevatorConfig {
            const id = new Date().getTime();
            const elevator: ElevatorConfig = {
                id,
                ...params,
            };

            elevators.value.push(elevator);
            addElevatorState({
                id: elevator.id,
                enabled: false,
                currentFloor: 1,
                queue: null,
                direction: Direction.IDLE,
            });

            return elevator;
        }

        function removeElevator(id: number): ElevatorConfig {
            const elevatorIndex = elevators.value.findIndex((e: ElevatorConfig) => e.id === id);
            const elevatorStateIndex = elevatorsState.value.findIndex((e: ElevatorState) => e.id === id);

            if (elevatorIndex === -1 || elevatorStateIndex === -1) {
                throw new Error(`Elevator with id ${id} not found`);
            }

            elevatorsState.value.splice(elevatorStateIndex, 1);

            return elevators.value.splice(elevatorIndex, 1)[0];
        }

        function clearElevators(): void {
            elevators.value = [];
            elevatorsState.value = [];
        }

        return {
            elevators,
            elevatorsState,
            addElevator,
            removeElevator,
            clearElevators,
        };
    },
    {
        persist: {
            key: 'elevators',
            storage: piniaPluginPersistedstate.localStorage(),
            pick: ['elevators', 'elevatorsState'],
        },
    },
);
