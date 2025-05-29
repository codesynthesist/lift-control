import { Direction, type ElevatorState } from '~/types';

export class Elevator implements ElevatorState {
    enabled: boolean;
    currentFloor: number;
    queue: number[];
    direction: Direction;

    constructor(public id: number, initialFloor: number = 0) {
        this.id = id;
        this.enabled = false;
        this.currentFloor = initialFloor;
        this.queue = [];
        this.direction = Direction.UP;
    }

    addFloorToQueue(floor: number): void {
        if (!this.queue.includes(floor)) {
            this.queue.push(floor);
            this.queue.sort((a, b) => a - b);

            this.updateDirection();
        }
    }

    private updateDirection(): void {
        if (this.queue.length === 0) {
            this.direction = Direction.IDLE;
        } else if (this.queue[0] > this.currentFloor) {
            this.direction = Direction.UP;
        } else if (this.queue[0] < this.currentFloor) {
            this.direction = Direction.DOWN;
        } else {
            this.direction = Direction.IDLE;
        }
    }

    move(): void {
        if (this.queue.length === 0) {
            return;
        }

        const nextFloor = this.queue[0];

        if (nextFloor > this.currentFloor) {
            this.currentFloor++;
        } else if (nextFloor < this.currentFloor) {
            this.currentFloor--;
        }

        if (this.currentFloor === nextFloor) {
            this.queue.shift();
            this.updateDirection();
        }
    }

    get status(): ElevatorState {
        return {
            id: this.id,
            enabled: this.enabled,
            queue: this.queue,
            currentFloor: this.currentFloor,
            direction: this.direction,
        };
    }
}
