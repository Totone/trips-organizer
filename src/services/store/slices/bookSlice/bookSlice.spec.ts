import bookReducer, {
    initialState,
    cancelBookedTrip,
    bookTrip,
    BookState,
} from "./bookSlice"
import { Trip } from "../../../../types"

const initialMockState: BookState = {
    status: {
        book: "idle",
        cancel: "idle",
    },
    list: [
        {
            "id": 3,
            "departureStop": "Le quartier latin",
            "departureTime": "2022-01-01T14:04:00",
            "arrivalStop": "Opéra",
            "arrivalTime": "2022-01-01T14:41:00"
        },
        {
            "id": 13,
            "departureStop": "Opéra",
            "departureTime": "2022-01-01T17:06:00",
            "arrivalStop": "Saint-Germain-des-Prés",
            "arrivalTime": "2022-01-01T17:58:00"
        }
    ],
}

describe("Redux stop slice", () => {
    let mockState: BookState
    beforeEach(() => {
        mockState = JSON.parse(JSON.stringify(initialMockState))
    })

    it("handles initial state", () => {
        expect(bookReducer(
            undefined,
            { type: "unknown" }
        )).toEqual(initialState)
    })
    
    describe("bookTrip()", () => {
        const newTrip: Trip = { 
            "id": 93,
            "departureStop": "Le quartier latin",
            "departureTime": "2022-01-01T16:59:00",
            "arrivalStop": "Belleville-Ménilmontant",
            "arrivalTime": "2022-01-01T17:20:00"
        }
        it("sets `loading` value in `status.cancel` state property when request pending", async () => {
            const expectedStatus = "loading"

            const action = bookTrip.pending("", newTrip)
            const actual = bookReducer(mockState, action)
            expect(actual.status.book).toEqual(expectedStatus)
        })
        it("sets `failed` value in `status.cancel` state property when request failed", async () => {
            const expectedStatus = "failed"

            const action = bookTrip.rejected(null, "", newTrip)
            const actual = bookReducer(mockState, action)
            expect(actual.status.book).toEqual(expectedStatus)
        })
        it("adds booked trip to `list` state property when request successes", async () => {
            const expectedData = mockState.list.concat(newTrip)
            const expectedStatus = "idle"

            const action = bookTrip.fulfilled(newTrip, "", newTrip)
            const actual = bookReducer(mockState, action)
            expect(actual.list).toEqual(expectedData)
            expect(actual.status.book).toEqual(expectedStatus)
        })
    })

    describe("cancelBookedTrip()", () => {
        const unbookedTripId: number = 13
        it("sets `loading` value in `status.cancel` state property when request pending", async () => {
            const expectedStatus = "loading"

            const action = cancelBookedTrip.pending("", unbookedTripId)
            const actual = bookReducer(mockState, action)
            expect(actual.status.cancel).toEqual(expectedStatus)
        })
        it("sets `failed` value in `status.cancel` state property when request failed", async () => {
            const expectedStatus = "failed"

            const action = cancelBookedTrip.rejected(null, "", unbookedTripId)
            const actual = bookReducer(mockState, action)
            expect(actual.status.cancel).toEqual(expectedStatus)
        })
        it("removes booked trip from `list` state property when request successes", async () => {
            const expectedData = mockState.list.filter(booked => booked.id !== unbookedTripId)
            const expectedStatus = "idle"

            const action = cancelBookedTrip.fulfilled(unbookedTripId, "", unbookedTripId)
            const actual = bookReducer(mockState, action)
            expect(actual.list).toEqual(expectedData)
            expect(actual.status.cancel).toEqual(expectedStatus)
        })
    })
})