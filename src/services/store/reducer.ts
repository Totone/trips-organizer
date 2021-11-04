import stopReducer from "./slices/stopSlice"
import tripReducer from "./slices/tripSlice"
import bookReducer from "./slices/bookSlice"

export const reducer = {
    book: bookReducer,
    stop: stopReducer,
    trip: tripReducer,
}