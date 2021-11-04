import xhr from "./xhr"
import { Stop, Trip } from "../../types"

interface FetchTripsParams { departureStop?: string }

/**
 * Fetches the list for available trips starting from `departureStop`  
 * If `departureStop` is an empty string, fetches all available trips
 * @param departureStop Bus stop where trip starts
 * @returns The list of available trips
 */
export const fetchTrips = (
    departureStop: Stop = ""
): Promise<{data: Trip[]}> => new Promise(
    (resolve, reject) => {
        const params: FetchTripsParams = {}
        if (departureStop !== "") params.departureStop = departureStop

        xhr.fetchTrips({ params })
        .then(
            apiResponse => resolve({ data: apiResponse.data })
        )
        .catch(reject)
    }
)