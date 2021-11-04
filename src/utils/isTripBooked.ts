import { Trip } from "../types";

/** Checks if a trip is in the list of booked ones */
export const isTripBooked = (
    tripId: number, 
    bookedList: Trip[]
): boolean => bookedList.some(trip => trip.id === tripId)