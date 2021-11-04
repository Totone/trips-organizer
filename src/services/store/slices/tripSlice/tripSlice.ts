import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState, AsyncStatus } from "../../types"
import type { Stop, Trip } from "../../../../types"
import { fetchTrips } from "../../../../services/trips_api"

const SLICE_NAME = "trip"
const ACTION_TYPES = {
    FETCH_TRIPS_LIST: "trip/fetchTripsList",
}

export interface TripState {
    status: AsyncStatus
    list: Trip[]
    cached: Trip[]
}

export const initialState: TripState = {
    status: "idle",
    list: [],
    cached: [],
};

/** Fetches available trips list depending on given departure stop */
export const fetchTripsList = createAsyncThunk(
    ACTION_TYPES.FETCH_TRIPS_LIST,
    async (departureStop: Stop) => {
        const response = await fetchTrips(departureStop)
        return response.data
    }
)

export const tripSlice = createSlice({
    name: SLICE_NAME,
    initialState,
    reducers: {
        /** Resets cached & displayed lists */
        reset: (state) => {
            state.cached = []
            state.list = []
        },
        /** Updates displayed list using cached data */
        update: (state, action: PayloadAction<Trip[]>) => {
            state.list = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(
            fetchTripsList.pending,
            (state) => { state.status = "loading" }
        ).addCase(
            fetchTripsList.rejected,
            (state) => { state.status = "failed" }
        ).addCase(
            fetchTripsList.fulfilled,
            (state, action) => { 
                state.status = "idle"
                state.list = action.payload
                state.cached = state.cached.concat(action.payload)
            }
        )
    }
})

export const { 
    reset: resetTrips, 
    update: updateTrips, 
} = tripSlice.actions

export const tripSelectors = {
    cachedTrips: (state: RootState) => state.trip.cached,
    tripsList: (state: RootState) => state.trip.list,
    tripReqStatus: (state: RootState) => state.trip.status,
}

export default tripSlice.reducer