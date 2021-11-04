import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import api from "../../../../services/trips_api"
import { RootState, AsyncStatus } from "../../types"
import { Trip } from "../../../../types"

const SLICE_NAME = "book"
const ACTION_TYPES = {
    BOOK_TRIP: "book/bookTrip",
    CANCEL_BOOK_TRIP: "book/cancelBookedTrip",
}

export interface BookState {
    status: {
        book: AsyncStatus
        cancel: AsyncStatus
    }
    list: Trip[]
}

export const initialState: BookState = {
    status: {
        book: "idle",
        cancel: "idle"
    },
    list: [],
};

/** Books a trip according to its id */
export const bookTrip = createAsyncThunk(
    ACTION_TYPES.BOOK_TRIP,
    async (trip: Trip, thunkApi) => {
        const state = thunkApi.getState() as RootState
        if (!state.book.list.find(b => b.id === trip.id)) {
            await api.bookTrip(trip.id)
            return trip
        }
    }
)

/** Cancels a booked trip */
export const cancelBookedTrip = createAsyncThunk(
    ACTION_TYPES.CANCEL_BOOK_TRIP,
    async (tripId: Trip["id"]) => { 
        await api.cancelBookedTrip(tripId)
        return tripId
    }
)

export const bookSlice = createSlice({
    name: SLICE_NAME,
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(
            bookTrip.pending,
            (state) => { state.status.book = "loading" }
        )
        .addCase(
            bookTrip.rejected,
            (state) => { state.status.book = "failed" }
        )
        .addCase(
            bookTrip.fulfilled,
            (state, action) => { 
                state.status.book = "idle" 
                action.payload && state.list.push(action.payload)
            }
        )
        .addCase(
            cancelBookedTrip.pending,
            (state) => { state.status.cancel = "loading" }
        )
        .addCase(
            cancelBookedTrip.rejected,
            (state) => { state.status.cancel = "failed" }
        )
        .addCase(
            cancelBookedTrip.fulfilled,
            (state, action) => { 
                state.status.cancel = "idle"
                state.list = state.list.filter(
                    booked => booked.id !== action.payload
                )
            }
        )
    }
})

export const bookSelectors = {
    bookedList: (state: RootState) => state.book.list,
    bookReqStatus: (state: RootState) => state.book.status.book,
    unbookReqStatus: (state: RootState) => state.book.status.cancel,
}

export default bookSlice.reducer