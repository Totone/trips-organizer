/** 
 * Creates & validates a date from a given string
 * Throws an exception if string is not valid date
 * @param dates List of string dates
 */
export function createDateFromString(...dates: string[]): Date|Array<Date> {
    const output: Date[] = []
    dates.forEach(
        strDate => {
            const date = new Date(strDate)
            if (isNaN(date.getTime()))
                throw new Error("Invalid string dates given: " + strDate)
            else output.push(date)
        }
    )
    return output.length === 1 ? output[0] : output
}