import xhr from "./xhr"
import { Stop } from "../../types"
/**
 * Fetches the list of available bus stops
 * @returns The lis of all bus stops
 */
export const fetchBusStops = (): Promise<{data: Stop[]}> => new Promise(
    (resolve, reject) => {
        xhr.fetchBusStops()
        .then(
            (apiResponse) => resolve({ data: apiResponse.data })
        )
        .catch(reject)
    }
)