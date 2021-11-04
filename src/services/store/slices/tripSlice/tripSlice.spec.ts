import tripReducer, {
    initialState,
    fetchTripsList,
    resetTrips,
    updateTrips,
    TripState,
} from "./tripSlice"
import { Trip } from "../../../../types"

const initialMockState: TripState = {
    status: "idle",
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
    cached: [
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
        },{
            "id": 93,
            "departureStop": "Le quartier latin",
            "departureTime": "2022-01-01T16:59:00",
            "arrivalStop": "Belleville-Ménilmontant",
            "arrivalTime": "2022-01-01T17:20:00"
        }
    ]

}

describe("Redux trip slice", () => {
    let mockState: TripState = JSON.parse(JSON.stringify(initialMockState))
    let apiResponse: Trip[] = []
    beforeEach(() => {
        mockState = JSON.parse(JSON.stringify(initialMockState))
        apiResponse = [
            {
                "id": 4,
                "departureStop": "Saint-Germain-des-Prés",
                "departureTime": "2022-01-01T05:19:00",
                "arrivalStop": "Le Marais",
                "arrivalTime": "2022-01-01T06:05:00"
            },
            {
                "id": 5,
                "departureStop": "Les Tuileries et le Louvre",
                "departureTime": "2022-01-01T05:24:00",
                "arrivalStop": "Invalides-tour Eiffel",
                "arrivalTime": "2022-01-01T06:23:00"
            },
            {
                "id": 6,
                "departureStop": "Le Marais",
                "departureTime": "2022-01-01T00:33:00",
                "arrivalStop": "Montmartre",
                "arrivalTime": "2022-01-01T01:25:00"
            },
            {
                "id": 7,
                "departureStop": "Les Tuileries et le Louvre",
                "departureTime": "2022-01-01T01:29:00",
                "arrivalStop": "Champs-Élysées",
                "arrivalTime": "2022-01-01T02:02:00"
            },
            {
                "id": 8,
                "departureStop": "Opéra",
                "departureTime": "2022-01-01T20:06:00",
                "arrivalStop": "Invalides-tour Eiffel",
                "arrivalTime": "2022-01-01T20:43:00"
            },
            {
                "id": 9,
                "departureStop": "Bastille",
                "departureTime": "2022-01-01T11:49:00",
                "arrivalStop": "Invalides-tour Eiffel",
                "arrivalTime": "2022-01-01T12:10:00"
            },
        ]
    })

    it("handles initial state", () => {
        expect(tripReducer(
            undefined,
            { type: "unknown" }
        )).toEqual(initialState)
    })
    it("updates trips list on `update` action", () => {
        const expectedValue = apiResponse
        const actual = tripReducer(mockState, updateTrips(apiResponse))
        expect(actual.list).toEqual(expectedValue)
    })
    
    describe("clears trips & cached lists on `reset` action", () => {
        const expected = {
            list: [],
            cached: [],
        }
        it("works for `list` state property", () => {
            const actual = tripReducer(mockState, resetTrips())
            expect(actual.list).toEqual(expected.list)
        })
        it("works for `cached` state property", () => {
            const actual = tripReducer(mockState, resetTrips())
            expect(actual.cached).toEqual(expected.cached)
        })  
    })

    describe("fetchTripsList", () => {
        const busStopExample = "Opéra"
        it("sets `loading` value in `status` state property when request pending", async() => {
            const expectedStatus = "loading"

            const action = fetchTripsList.pending("", busStopExample)
            const actual = tripReducer(mockState, action)
            expect(actual.status).toEqual(expectedStatus)
        })
        it("sets `failed` value in `status` state property when request failed", async() => {
            const expectedStatus = "failed"

            const action = fetchTripsList.rejected(null, "", busStopExample)
            const actual = tripReducer(mockState, action)
            expect(actual.status).toEqual(expectedStatus)
        })
        it("stores api response in `list` state property when request successes", async() => {
            const expectedData = apiResponse
            const expectedStatus = "idle"

            const action = fetchTripsList.fulfilled(expectedData, "", busStopExample)
            const actual = tripReducer(mockState, action)
            expect(actual.list).toEqual(expectedData)
            expect(actual.status).toEqual(expectedStatus)
        })
        it("updates `cached` state property with received data when request successes", async() => {
            const expectedData = mockState.cached.concat(apiResponse)
            const action = fetchTripsList.fulfilled(apiResponse, "", busStopExample)
            const actual = tripReducer(mockState, action)
            expect(actual.cached).toEqual(expectedData)
        })
    })
})