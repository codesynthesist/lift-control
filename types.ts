export const enum ElevatorTypes {
    PASSENGER = 'passenger',
    CARGO = 'cargo',
}

export const enum Direction {
    UP = 'up',
    DOWN = 'down',
    IDLE = 'idle',
}

export interface ElevatorConfig {
    id: number;
    name: string;
    type: ElevatorTypes;
    capacity: number; // kg
    speed: number; // m/s
    creationDate: string;
    lastServiceDate: string;
}

export type ElevatorForm = Omit<ElevatorConfig, 'id'>;

export interface ElevatorState {
    id: number;
    enabled: boolean;
    currentFloor: number;
    queue: number[];
    direction: Direction;
}
