import { FC, ReactElement } from "react"
import Col from "react-bootstrap/Col"

import CSTS from "../../_config/constants"
import { TripDataItem } from "../atoms/TripDataItem"
import { useClasses } from "../../hooks"
import { Stop } from "../../types"

interface GroupedTdProps {
    departure: Stop|string
    arrival: Stop|string
    isStopsGroup?: boolean
    xs: number
    lg: number
    xl?: number
    diff?: number
}

export const GroupedTd: FC<GroupedTdProps> = ({
    departure, 
    arrival,
    isStopsGroup = false,
    xs,
    lg,
    xl = undefined,
    diff = 0
}): ReactElement => {
    const classes = useClasses([
        "d-flex",
        "flex-column",
        "flex-xl-row",
        "justify-content-around",
        `align-items-${isStopsGroup ? "end":"center"}`,
        isStopsGroup && "align-items-lg-center"
    ])

    return (
        <Col as="td" className={classes} xs={xs} lg={lg} xl={xl||lg}>
            <TripDataItem 
                type={isStopsGroup ? "departureStop":"departureTime"} 
                value={departure}
            />
            <TripDataItem 
                type="arrow" 
                value={CSTS.ARROW}
            />
            <TripDataItem 
                type={isStopsGroup ? "arrivalStop":"arrivalTime"} 
                value={arrival}
                diff={diff}
            />
        </Col>
    )
}