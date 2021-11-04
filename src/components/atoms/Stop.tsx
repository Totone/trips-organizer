import { FC, ReactElement } from "react"
import { Stop as StopType } from "../../types"

interface StopProps {
    label: StopType
    value: string
}

/** Represents a bus stop */
export const Stop: FC<StopProps> = ({ label, value }): ReactElement => (
    <option value={label}>
        { value }
    </option>
)