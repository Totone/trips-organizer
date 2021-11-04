import xhr from "./xhr"

/**
 * Books a trip depending on its ID
 * @param tripId Target id
 */
export const bookTrip = (tripId: number): Promise<void> => new Promise(
    (resolve, reject) => {
        xhr.bookTrip(tripId)
        .then(
            apiResponse => apiResponse.data.success ? resolve():reject()
        )
        .catch(reject)
    }
)