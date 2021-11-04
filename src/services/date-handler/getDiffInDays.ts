import { createDateFromString } from "./createDateFromString"

/**
 * Get the difference in days between 2 dates  
 */
export function getDiffInDays(strDate1: string, strDate2: string): number {
    const [date1, date2] = createDateFromString(strDate1, strDate2) as Date[]

    // time set to 00:00:00 to compute only dates diff
    [date1, date2].forEach(
        date => {
            date.setHours(0)
            date.setMinutes(0)
            date.setSeconds(0)
            date.setMilliseconds(0)
        }
    )

    const fromMsToDay: number = 1000 * 60 * 60 * 24;
    const diffInMs = Math.abs(date2.getTime() - date1.getTime())
    return Math.trunc(diffInMs/fromMsToDay)
}