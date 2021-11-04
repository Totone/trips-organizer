import { useState, useEffect } from "react"

type Conditions = Array<string|boolean|Array<string|boolean>>

export const defaultValue = []

/** 
 * Custom hook which creates a string for a 
 * component className depending on given conditions
 * @param conditions list of classNames or `false` - only strings 
 * are used to compute the className string
 */
export const useClasses = (conditions: Conditions = defaultValue): string => {
    const [strClasses, setStrClasses] = useState<string>("")
    useEffect(
        () => {
            setStrClasses(
                conditions.flat().filter(
                    rule => typeof rule !== "boolean"
                ).join(" ")
            )
        }, [conditions]
    )
    return strClasses
}