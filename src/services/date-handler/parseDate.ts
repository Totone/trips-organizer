import { createDateFromString } from "./createDateFromString"

/**
 * Parse a date from Date object to a string corresponding to the date
 * @param strDate Targeted date
 * @param withoutHours `true` to not display hours
 * @param withoutDate `true` to not display date
 * @returns A string representing the datetime
 */
export function parseDate(
    strDate: string, 
    withoutHours: boolean = false, 
    withoutDate: boolean = false
): string {
    const date = createDateFromString(strDate) as Date
    const normalizeDate =(n: number) => n < 10 ? "0" + n : n
    let parsed: string = ""

    if (!withoutDate) {
        const day = normalizeDate(date.getDate())
        const month = normalizeDate(date.getMonth() + 1)
        const year = date.getFullYear()
        parsed += `${day}/${month}/${year} `
    }

    if (!withoutHours) {
        const hour = normalizeDate(date.getHours())
        const minute = normalizeDate(date.getMinutes())
        parsed += `${hour}:${minute}`
    }

    return parsed
}