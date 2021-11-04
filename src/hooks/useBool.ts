import { useState } from "react"

type UseBool = [boolean, () => void]
export const defaultValue: boolean = false

export const useBool = (initial: boolean = defaultValue): UseBool => {
    const [value, setValue] = useState<boolean>(initial)
    const toggleValue = () => setValue(!value)

    return [
        value,
        toggleValue,
    ]
}