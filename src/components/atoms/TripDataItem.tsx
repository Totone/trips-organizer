import { FC, ReactElement, useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import Col from "react-bootstrap/Col"

import { DaysDiffIndicator } from "../atoms/DaysDiffIndicator"
import { useBool, useClasses } from "../../hooks"
import { parseDate } from "../../services/date-handler"
import { TripDataItemType } from "../../types"

interface TripDataItemProps {
    type: TripDataItemType
    value: string
    diff?: number
}

/** Represents a part of a trip dataset */
export const TripDataItem: FC<TripDataItemProps> = ({
    type,
    value,
    diff = 0,
}): ReactElement => {
    const { t } = useTranslation()
    const classes = useClasses([
        ["departureStop"].includes(type) ? "text-end" :
        ["arrivalStop"].includes(type) ? "text-start" :
        "text-center",
        type === "arrow" && ["d-none", "d-xl-block", "col-xl-1"]
    ])
    const [output, setOutput] = useState<string>("")
    const [withDaysDiff, toggle] = useBool(false)

    useEffect(
        () => {
            setOutput(
                (!["arrivalTime", "departureTime", "date"].includes(type)) ? value :
                parseDate(value, type === "date", type !== "date")
            )

            if(type === "arrivalTime" && diff > 0) toggle()
        }, [diff, toggle, type, value]
    )
    return (
        <Col className={classes}>
            { output } { withDaysDiff && (
                <DaysDiffIndicator>
                    {t("Arrival is day after", { count: diff })}
                </DaysDiffIndicator>
            )}
        </Col>
    )
}