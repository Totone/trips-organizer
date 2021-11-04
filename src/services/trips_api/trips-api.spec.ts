import { AxiosResponse } from "axios"
import { axiosInstance } from "./xhr"

import api from "."
import { Trip, Stop } from "../../types"

// jest.mock("axios")
// const m_axios = axios as jest.Mocked<typeof axios>

describe("trips-api", () => {
    let genericMockResponse: AxiosResponse
    let mockedGet: jest.SpyInstance
    let mockedPut: jest.SpyInstance

    beforeEach(() => {
        mockedGet = jest.spyOn(axiosInstance, "get")
        mockedPut = jest.spyOn(axiosInstance, "put")
        genericMockResponse = {
            status: 200,
            statusText: "OK",
            headers: {},
            config: {},
            data: undefined
        }
    })
    afterEach(() => {
        jest.clearAllMocks()
    })

    describe("fetchBusStops()", () => {
        it("throws an exception when request fails", async() => {
            mockedGet.mockRejectedValueOnce("")

            expect(mockedGet).not.toHaveBeenCalled()
            await expect(api.fetchBusStops()).rejects.not.toBeNull()
            expect(mockedGet).toHaveBeenCalled()
            // try {
            // } catch(error) {
            //     fail()
            //     expect(error).not.toBeNull()
            // }
        })
        it("returns the list of bus stops", async () => {
            const expectedData: Stop[] = [
                "A bus stop",
                "Another bus stop",
                "And again",
            ]
            mockedGet.mockResolvedValueOnce({
                ...genericMockResponse,
                data: expectedData,
            })

            expect(mockedGet).not.toHaveBeenCalled()
            const result = await api.fetchBusStops()
            expect(mockedGet).toHaveBeenCalled()
            expect(result).toEqual({ data: expectedData })
        })
    })
    describe("fetchTrips()", () => {
        it("throws an exception when request fails", async() => {
            mockedGet.mockRejectedValueOnce("")
            
            expect(mockedGet).not.toHaveBeenCalled()
            await expect(api.fetchTrips()).rejects.not.toBeNull()
            expect(mockedGet).toHaveBeenCalled()
            // try {
            //     fail()
            // } catch(error) {
            //     expect(error).not.toBeNull()
            // }
        })
        it("returns the list of available trips", async () => {
            const expectedData: Trip[] = [
                {
                    "id": 18,
                    "departureStop": "Opéra",
                    "departureTime": "2022-01-01T07:17:00",
                    "arrivalStop": "Bastille",
                    "arrivalTime": "2022-01-01T07:38:00"
                },
                {
                    "id": 19,
                    "departureStop": "Opéra",
                    "departureTime": "2022-01-01T19:44:00",
                    "arrivalStop": "Invalides-tour Eiffel",
                    "arrivalTime": "2022-01-01T20:12:00"
                },
                {
                    "id": 20,
                    "departureStop": "Le quartier latin",
                    "departureTime": "2022-01-01T00:26:00",
                    "arrivalStop": "Bastille",
                    "arrivalTime": "2022-01-01T00:49:00"
                },
                {
                    "id": 21,
                    "departureStop": "Les Tuileries et le Louvre",
                    "departureTime": "2022-01-01T13:45:00",
                    "arrivalStop": "Belleville-Ménilmontant",
                    "arrivalTime": "2022-01-01T14:30:00"
                },
                {
                    "id": 22,
                    "departureStop": "Le Marais",
                    "departureTime": "2022-01-01T15:43:00",
                    "arrivalStop": "Bastille",
                    "arrivalTime": "2022-01-01T16:42:00"
                },
                {
                    "id": 23,
                    "departureStop": "Montmartre",
                    "departureTime": "2022-01-01T13:53:00",
                    "arrivalStop": "Invalides-tour Eiffel",
                    "arrivalTime": "2022-01-01T14:46:00"
                },
            ]
            mockedGet.mockResolvedValueOnce({
                ...genericMockResponse,
                data: expectedData,
            })

            expect(mockedGet).not.toHaveBeenCalled()
            const result = await api.fetchTrips()
            expect(mockedGet).toHaveBeenCalled()
            expect(result).toEqual({ data: expectedData })
        })
    })
    describe("bookTrip()", () => {
        describe("throws an exception", () => {
            it("when api response `success` param is `false`", async() => {
                const bookedTripId: number = 13
                const expectedData = { success: false }
                mockedPut.mockResolvedValueOnce({
                    ...genericMockResponse,
                    data: expectedData,
                })


                expect(mockedPut).not.toHaveBeenCalled()
                await expect(api.bookTrip(bookedTripId)).rejects.not.toBeNull()
                expect(mockedPut).toHaveBeenCalled()

                // try {
                //     expect(mockedPut).not.toHaveBeenCalled()
                //     await api.bookTrip(bookedTripId)
                //     fail()
                // } catch (error) {
                //     expect(mockedPut).toHaveBeenCalled()
                //     expect(error).not.toBeNull()
                // }
            })
            it("when api response `success` param is undefined", async() => {
                const bookedTripId: number = 13
                const expectedData = {}
                mockedPut.mockResolvedValueOnce({
                    ...genericMockResponse,
                    data: expectedData,
                })
    
                expect(mockedPut).not.toHaveBeenCalled()
                await expect(api.bookTrip(bookedTripId)).rejects.not.toBeNull()
                expect(mockedPut).toHaveBeenCalled()
                // try {
                //     fail()
                // } catch (error) {
                //     expect(error).not.toBeNull()
                // }
            })
            it("when request is rejected", async() => {
                const bookedTripId: number = 13
                const expectedData = { success: true }
                mockedPut.mockRejectedValueOnce({
                    ...genericMockResponse,
                    data: expectedData,
                })

                expect(mockedPut).not.toHaveBeenCalled()
                await expect(api.bookTrip(bookedTripId)).rejects.not.toBeNull()
                expect(mockedPut).toHaveBeenCalled()
                
                // try {
                //     expect(mockedPut).not.toHaveBeenCalled()
                //     await api.bookTrip(bookedTripId)
                //     fail()
                // } catch (error) {
                //     expect(mockedPut).toHaveBeenCalled()
                //     expect(error).not.toBeNull()
                // }
            })
        })
        it("resolves when api response contains `success` param with value set to `true`", async() => {
            const bookedTripId: number = 13
            const expectedData = { success: true }
            mockedPut.mockResolvedValueOnce({
                ...genericMockResponse,
                data: expectedData,
            })

            expect(mockedPut).not.toHaveBeenCalled()
            await expect(api.bookTrip(bookedTripId)).resolves.not.toBeNull()
            expect(mockedPut).toHaveBeenCalled()
        })
    })
})