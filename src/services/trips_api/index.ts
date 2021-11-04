import { fetchBusStops } from "./fetchBusStops";
import { bookTrip } from "./bookTrip";
import { fetchTrips } from "./fetchTrips";
import { cancelBookedTrip } from "./cancelBookedTrip";

export { fetchBusStops }
export { bookTrip }
export { fetchTrips }
export { cancelBookedTrip }

const tripsApi = {
    fetchBusStops,
    bookTrip,
    fetchTrips,
    cancelBookedTrip,
}

export default tripsApi