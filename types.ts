import type { Dayjs } from 'dayjs';

// auth
export const enum CookieTypes {
    ACCESS_TOKEN = 'accessToken',
    REFRESH_TOKEN = 'refreshToken',
    EXPIRES = 'expiresIn',
    AUTHORIZATION = 'Authorization',
}

// elevators
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
    creationDate: Dayjs | null;
    lastServiceDate: Dayjs | null;
}

export type ElevatorForm = Omit<ElevatorConfig, 'id'>;

export interface ElevatorState {
    id: number;
    enabled: boolean;
    currentFloor: number;
    queue: number[] | null;
    direction: Direction | null;
}

