import stopReducer, {
    initialState,
    fetchStopsList,
    resetStop,
    updateCachedStops,
    updateStop,
    StopState
} from "./stopSlice"
import CSTS from "../../../../_config/constants"

describe("Redux stop slice", () => {
    const mockState: StopState = {
        status: "idle",
        list: ["stop1","stop2","stop3","stop4","stop5","stop6"],
        cached: ["stop1","stop3"],
        current: "stop3"
    }
    it("handles initial state", () => {
        expect(stopReducer(
            undefined, 
            { type: "unknown" }
        )).toEqual(initialState)
    })
    it("handles cache update", () => {
        const expectedCache = ["stop1","stop3", "stop4"]
        const actual = stopReducer(mockState, updateCachedStops(expectedCache))
        expect(actual.cached).toEqual(expectedCache)
    })
    it("handles current stop update", () => {
        const expectedCurrent = "stop1"
        const actual = stopReducer(mockState, updateStop(expectedCurrent))
        expect(actual.current).toEqual(expectedCurrent)
    })
    it("handles current stop reset", () => {
        const expectedCurrent = CSTS.SELECT_DEFAULT_VALUE
        const actual = stopReducer(mockState, resetStop())
        expect(actual.current).toEqual(expectedCurrent)
    })
    describe("fetchStopsList()", () => {
        it("sets `loading` value in `status` state property when request pending", async() => {
            const previousState = { ...mockState }
            const expectedStatus = "loading"

            const action = fetchStopsList.pending("")
            const actual = stopReducer(previousState, action)
            expect(actual.status).toEqual(expectedStatus)
        })
        it("sets `failed` value in `status` state property when request failed", async() => {
            const previousState = { ...mockState }
            const expectedStatus = "failed"

            const action = fetchStopsList.rejected(null, "")
            const actual = stopReducer(previousState, action)
            expect(actual.status).toEqual(expectedStatus)
        })
        it("stores api response in `list` state property when request successes", async() => {
            const previousState = { ...mockState, list: [] }
            const expectedData = ["stop1","stop2","stop3","stop4","stop5","stop6"]
            const expectedStatus = "idle"

            const action = fetchStopsList.fulfilled(expectedData, "")
            const actual = stopReducer(previousState, action)
            expect(actual.list).toEqual(expectedData)
            expect(actual.status).toEqual(expectedStatus)
        })
    })
})