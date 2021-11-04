import type { Stop } from "./Stop"
export type Trip = {
    id: number
    departureStop: Stop
    departureTime: string
    arrivalStop: Stop
    arrivalTime: string
}