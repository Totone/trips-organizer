import { FC, ReactElement } from "react"
import Container from "react-bootstrap/Container"
import ListGroup from "react-bootstrap/ListGroup"
import Col from "react-bootstrap/Col"

import { BookedTripLine } from "../atoms/BookedTripLine"
import { Button } from "../atoms/Button"
import { WithTrip } from "../../types"

/** Represents data for a booked trip */
export const BookedTrip: FC<WithTrip> = ({ trip }): ReactElement => (
    <ListGroup.Item className="p-0 m-0">
        <Container fluid className="d-flex align-items-center ps-2 pe-0 m-0">
        <Col>
            <BookedTripLine isDateLine time={trip.departureTime} />
            <BookedTripLine stop={trip.departureStop} time={trip.departureTime} />
            <BookedTripLine stop={trip.arrivalStop} time={trip.arrivalTime} />
        </Col>
        <Col xs={3} md={2} xl={1} className="y-100 py-0 m-2">
            <Button unbook trip={trip}/>
        </Col>
        </Container>
    </ListGroup.Item>
)