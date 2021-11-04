import { FC, ReactElement, Fragment } from "react"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"

import { parseDate } from "../../services/date-handler/parseDate"

interface BookedTripLineProps {
    stop?: string
    time: string
    isDateLine?: boolean
    isArrival?: boolean
}

export const BookedTripLine: FC<BookedTripLineProps> = ({
    time,
    stop = undefined,
    isDateLine = false,
}): ReactElement => (
    <Row className="d-flex justify-content-start">
        {
            isDateLine ? <Col>{parseDate(time, true)}</Col> : (
                <Fragment>
                    <Col className="col-3 ps-4">{parseDate(time, false, true)}</Col>
                    <Col>{stop}</Col>
                </Fragment>
            )
        }
    </Row>
)