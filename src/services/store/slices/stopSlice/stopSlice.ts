import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState, AsyncStatus } from "../../types"
import { fetchBusStops } from "../../../../services/trips_api"
import { Stop } from "../../../../types"
import CSTS from "../../../../_config/constants"

const SLICE_NAME = "stop"
const ACTION_TYPES = {
    FETCH_STOPS_LIST: "stop/fetchStopsList",
}

export interface StopState {
    status: AsyncStatus
    list: Stop[]
    cached: Stop[]
    current: Stop
}

export const initialState: StopState = {
    status: "idle",
    list: [],
    cached: [],
    current: "default",
}

/** Fetches stops list from API */
export const fetchStopsList = createAsyncThunk(
    ACTION_TYPES.FETCH_STOPS_LIST,
    async () => {
        const response = await fetchBusStops()
        return response.data
    }
)

export const stopSlice = createSlice({
    name: SLICE_NAME,
    initialState,
    reducers: {
        /** Resets the current selected stop & cached ones */
        reset: (state) => {
            state.current = CSTS.SELECT_DEFAULT_VALUE
            state.cached = []
        },
        /** Updates the current selected stop */
        update: (state, action: PayloadAction<Stop>) => {
            state.current = action.payload
        },
        /** Updates cached stops list */
        cache: (state, action: PayloadAction<Stop[]>) => {
            state.cached = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(
            fetchStopsList.pending,
            (state) => { 
                state.status = "loading" 
            }
        )
        .addCase(
            fetchStopsList.rejected,
            (state) => { 
                state.status = "failed" 
            }
        )
        .addCase(
            fetchStopsList.fulfilled,
            (state, action) => { 
                state.status = "idle"
                state.list = action.payload
            }
        )
    }
})

export const {
    reset: resetStop, 
    update: updateStop,
    cache: updateCachedStops,
} = stopSlice.actions

export const stopSelectors = {
    cachedStops: (state: RootState) => state.stop.cached,
    currentStop: (state: RootState) => state.stop.current,
    stopsList: (state: RootState) => state.stop.list,
    stopReqStatus: (state: RootState) => state.stop.status,
}

export default stopSlice.reducer