import { TRIPS_API_BASE_URL } from "./env"

export const TRIPS_API_ENDPOINTS = {
    BASE_URL: TRIPS_API_BASE_URL,
    FETCH_STOPS: {
        method: "get",
        uri: "/stops"
    },
    FETCH_TRIPS: {
        method: "get",
        uri: "/trips"
    },
    BOOK_TRIP: {
        method: "put",
        uri: "/book"
    },
    CANCEL_BOOK: {
        method: "delete",
        uri: "/book"
    },
}