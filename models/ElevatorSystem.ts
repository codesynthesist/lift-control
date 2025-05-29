import { Direction, type ElevatorState } from '~/types';
import { Elevator } from './Elevator';

export class ElevatorSystem {
    private readonly elevators: Elevator[];
    private floors: number;

    constructor(elevators: Elevator[], numFloors: number) {
        this.elevators = elevators;
        this.floors = numFloors;
    }

    callElevator(floor: number, direction: Direction): void {
        const elevator = this.findBestElevator(floor, direction);

        if (elevator) {
            elevator.addFloorToQueue(floor);
        } else {
            console.log('No available elevators');
        }
    }

    private findBestElevator(floor: number, direction: Direction): Elevator | null {
        let bestElevator: Elevator | null = null;
        let minDistance = Infinity;

        for (const elevator of this.elevators) {
            const elevatorDirection = elevator.direction;
            const elevatorFloor = elevator.currentFloor;

            const distance = Math.abs(elevatorFloor - floor);

            if (
                (elevatorDirection === Direction.IDLE) ||
                (elevatorDirection === direction && (
                    (direction === Direction.UP && elevatorFloor <= floor) ||
                    (direction === Direction.DOWN && elevatorFloor >= floor)
                ))
            ) {
                if (distance < minDistance) {
                    minDistance = distance;
                    bestElevator = elevator;
                }
            }
        }

        return bestElevator;
    }

    step(): void {
        for (const elevator of this.elevators) {
            elevator.move();
        }
    }

    getStatus(): ElevatorState[] {
        return this.elevators.map(elevator => elevator.status);
    }
}
