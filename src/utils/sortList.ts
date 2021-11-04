import { Trip, SortBy } from "../types"

/** Sorts a given list by stop or date */
export const sortList = (list: Trip[], sortBy: SortBy) => {
    const newList = [...list]
    const sortMethod = (a: Trip, b: Trip) => (
        sortBy === "stop" ? (
            a.departureStop.localeCompare(b.departureStop) || 
            a.arrivalStop.localeCompare(b.arrivalStop)
        ) :
        new Date(a.departureTime).getTime() - new Date(b.departureTime).getTime()
    )
    return newList.sort(sortMethod)
}