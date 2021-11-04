import { FC, ReactElement } from "react"
import {useTranslation} from "react-i18next"
import BootstrapButton from "react-bootstrap/Button"

import { useClasses } from "../../hooks"
import { useStore } from "../../services/store"
import { Trip, SortBy } from "../../types"
import { sortList, isTripBooked } from "../../utils"

interface ButtonProps {
    trip?: Trip
    book?: boolean
    unbook?: boolean
    resetCache?: boolean
    sortTable?: boolean
    fetchAll?: boolean
    sortBy?: SortBy
}

/** Displays a button to book a trip, cancel a booked one or sort a list */
export const Button: FC<ButtonProps> = ({
    trip = undefined,
    book = false,
    unbook = false,
    resetCache = false,
    fetchAll = false,
    sortTable = false,
    sortBy = undefined
}): ReactElement => {
    const { t } = useTranslation()
    const { 
        tripsList,
        bookedList,
        bookTrip,
        bookReqStatus,
        cancelBookedTrip,
        resetTrips,
        updateTrips,
        resetStop
    } = useStore()

    const classes = useClasses([
        (book || unbook) &&"w-100",
        "h-100",
        "text-center",
        "p-0",
        unbook && ["fs-4", "fw-bold"],
        (sortTable || resetCache || fetchAll) && [
            "fs-1",
            "py-auto",
        ],
    ])

    const handleClick = () => {
        if (book && bookReqStatus !== "loading") bookTrip(trip as Trip)
        if (unbook) cancelBookedTrip((trip as Trip).id)
        if (resetCache) {
            resetTrips()
            resetStop()
        }
        if (sortTable) updateTrips(sortList(tripsList, sortBy as SortBy))
        if (fetchAll) {
            resetStop()
            resetTrips()
            updateTrips()
        }
    }
    
    return (
        <BootstrapButton 
            className={classes}
            onClick={handleClick} 
            variant={
                book ? "outline-warning" :
                unbook ? "outline-danger":
                "outline-primary"
            }
            disabled={ 
                book ? isTripBooked((trip as Trip).id, bookedList) : 
                false
            }
            title={
                unbook ? t("Cancel book") : 
                sortTable ? (
                    sortBy === "date" ? t("Sort by time"):t("Sort by stop")
                ) : 
                resetCache ? t("Clear cache") :
                fetchAll ? t("Fetch all trips") :
                ""
            }
            style={{width: (resetCache || sortTable || fetchAll) ? 75 :""}}
        >
            { 
                book ? "💾" :
                unbook ? "✖" :
                resetCache ? "🧹" :
                fetchAll ? "📋" :
                sortTable ? sortBy === "stop" ? "🚩" : "🕔" :
                "---"    
            }
        </BootstrapButton>
    )
}