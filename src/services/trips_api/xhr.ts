import axios, { AxiosInstance, AxiosRequestConfig } from "axios"
import { TRIPS_API_ENDPOINTS } from "../../_config/trips-api"

export const axiosInstance: AxiosInstance = axios.create({
    baseURL: TRIPS_API_ENDPOINTS.BASE_URL,
    timeout: 10000
})

const fetchBusStops = () => axiosInstance.get(
    TRIPS_API_ENDPOINTS.FETCH_STOPS.uri,
)

const fetchTrips = (params: AxiosRequestConfig = {}) => axiosInstance.get(
    TRIPS_API_ENDPOINTS.FETCH_TRIPS.uri,
    params
)

const bookTrip = (tripId: number) => axiosInstance.put(
    TRIPS_API_ENDPOINTS.BOOK_TRIP.uri + "/" + tripId
)

const cancelBookedTrip = (tripId: number) => axiosInstance.delete(
    TRIPS_API_ENDPOINTS.CANCEL_BOOK.uri + "/" + tripId
)

const xhr = {
    fetchBusStops,
    fetchTrips,
    bookTrip,
    cancelBookedTrip,
}

export default xhr