import { FC, ReactElement } from "react"

/** Indicates that arrival date is not the same date as departure */
export const DaysDiffIndicator: FC = ({ children }): ReactElement => (
    <span 
        style={{color: "#d6cd52"}} 
        title={children as string}
    >
        +
    </span>
)