// import xhr from "./xhr"

/**
 * Cancels a previously booked trip
 * @param tripId Target id
 */
export const cancelBookedTrip = (tripId: number): Promise<void> => new Promise(
    (resolve, reject) => {
        /* 
        xhr.cancelBookedTrip(tripId)
        .then(
            (apiResponse) => {
                //* Resolves if apiResponse is correct or rejects
                if (true) resolve()
                else reject()
            }
        )
        .catch(reject)
        */
        setTimeout(resolve, 1000)
    }
)