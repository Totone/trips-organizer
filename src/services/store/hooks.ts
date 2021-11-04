import { useCallback } from "react"
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"
import type { RootState, AppDispatch } from "./types"
import type { Stop, Trip } from "../../types"

import {
    resetStop,
    updateStop,
    stopSelectors,
    fetchStopsList,
    updateCachedStops,
} from "./slices/stopSlice"

import {
    resetTrips,
    updateTrips,
    tripSelectors,
    fetchTripsList,
} from "./slices/tripSlice"

import {
    bookTrip,
    bookSelectors,
    cancelBookedTrip,
} from "./slices/bookSlice"


export const useStore = () => {
    const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
    const useAppDispatch = () => useDispatch<AppDispatch>()
    const dispatch = useAppDispatch()
    
    /** Current selected stop */
    const currentStop = useAppSelector(stopSelectors.currentStop)
    /** List containing all trips starting from already requested stops */
    const cachedStops = useAppSelector(stopSelectors.cachedStops)
    /** List of all avalable stops */
    const stopsList = useAppSelector(stopSelectors.stopsList)
    /** Status for stop resquest status */
    const stopReqStatus = useAppSelector(stopSelectors.stopReqStatus)

    /** List of all available trips starting from selected stop */
    const tripsList = useAppSelector(tripSelectors.tripsList)
    /** List containing all trips already requested */
    const cachedTrips = useAppSelector(tripSelectors.cachedTrips)

    /** Status for trip request status */
    const tripReqStatus = useAppSelector(tripSelectors.tripReqStatus)

    /** Status for trip book request status */
    const bookReqStatus = useAppSelector(bookSelectors.bookReqStatus)
    /** Status for trip book cancellation request status */
    const unbookReqStatus = useAppSelector(bookSelectors.unbookReqStatus)
    /** List of booked trips */
    const bookedList = useAppSelector(bookSelectors.bookedList)

    const handleTripsUpdate = useCallback(
        (input: Stop|Trip[] = "") => {
            if(Array.isArray(input)) {
                dispatch(updateTrips(input))
            }
            else {
                const departureStop = input
                if(cachedStops.includes(departureStop)) {
                    const newTripsList = cachedTrips.filter(
                        trip => trip.departureStop === departureStop
                    )
                    dispatch(updateTrips(newTripsList))
                }
                else {
                    dispatch(fetchTripsList(departureStop))
                    if(input !== "")
                        dispatch(updateCachedStops(cachedStops.concat(departureStop)))
                    else {
                        dispatch(updateCachedStops(stopsList))
                    }
                }
            }
        }, [cachedStops, cachedTrips, dispatch, stopsList]
    )

    return {
        currentStop,
        stopsList,
        stopReqStatus,
        tripsList,
        tripReqStatus,
        bookedList,
        bookReqStatus,
        unbookReqStatus,

        resetStop: () => dispatch(resetStop()),
        updateStop: (newStop: Stop) => dispatch(updateStop(newStop)),
        resetTrips: () => dispatch(resetTrips()),
        updateTrips: handleTripsUpdate,
        fetchStopsList: () => dispatch(fetchStopsList()),
        fetchTripsList: (from: Stop) => dispatch(fetchTripsList(from)),
        bookTrip: (trip: Trip) => dispatch(bookTrip(trip)),
        cancelBookedTrip: (tripId: Trip["id"]) => dispatch(cancelBookedTrip(tripId)),
    }
}