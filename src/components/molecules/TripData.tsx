import { FC, ReactElement } from "react"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"

import { Button } from "../atoms/Button"
import { TripDataItem } from "../atoms/TripDataItem"
import { GroupedTd } from "../molecules/GroupedTd"
import { getDiffInDays } from "../../services/date-handler"
import { WithTrip } from "../../types"

/** Represents all data for an available trip */
export const TripData: FC<WithTrip> = ({ trip }): ReactElement => (
    <Row as="tr" className="d-flex flex-row flex-1 m-0 p-0" >
        <GroupedTd xs={5} lg={6}
            departure={trip.departureStop}
            arrival={trip.arrivalStop}
            isStopsGroup
        />
        <Col 
            as="td" 
            className="d-flex justify-content-center align-items-center" 
            xs={{span: 3, order: "first"}} lg={{span: 1, order: 0}} xl={2}
        >
            <TripDataItem type="date" value={trip.departureTime}/>
        </Col>
        <GroupedTd xs={2} lg={3} xl={3}
            departure={trip.departureTime}
            arrival={trip.arrivalTime}
            diff={getDiffInDays(trip.departureTime, trip.arrivalTime)}
        />
        <Col as="td" xs={2} xl={1} className="d-flex justify-content-center align-items-center">
            <Button book trip={trip}/>
        </Col>
    </Row>
)