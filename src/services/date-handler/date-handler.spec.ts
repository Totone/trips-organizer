import {
    getDiffInDays,
    // isSameDate,
    parseDate,
} from "."

describe("date-handler", () => {
    describe("getDiffInDays()", () => {
        it("throws an exception if first argument is not a valid date string", () => {
            const validStrDate = "2022-01-01T07:38:00"
            const invalidStrDate = "invalid"
            const funct = () => getDiffInDays(invalidStrDate, validStrDate)
            expect(funct).toThrow()
        })
        it("throws an exception if second argument is not a valid date string", () => {
            const validStrDate = "2022-01-01T07:38:00"
            const invalidStrDate = "invalid"
            const funct = () => getDiffInDays(validStrDate, invalidStrDate)
            expect(funct).toThrow()
        })
        it("returns a number", () => {
            const strDate1 = "2022-01-01T07:38:00"
            const strDate2 = "2021-03-04T05:08:00"
            const result = getDiffInDays(strDate1, strDate2)
            expect(typeof result).toBe("number")
        })
        it("returns an integer number", () => {
            const strDate1 = "2022-01-01T07:38:00"
            const strDate2 = "2021-03-04T05:08:00"
            const result = getDiffInDays(strDate1, strDate2)
            expect(Number.isInteger(result)).toBeTruthy()
        })
        it("always returns a positive number", () => {
            const strDate1 = "2022-01-01T07:38:00"
            const strDate2 = "2021-03-04T05:08:00"            
            const result1 = getDiffInDays(strDate1, strDate2)
            expect(result1).toBeGreaterThanOrEqual(0)
            const result2 = getDiffInDays(strDate2, strDate1)
            expect(result2).toBeGreaterThanOrEqual(0)
        })
        it("returns the difference between days, regardless of hours", () => {
            //? difference between dates is 1 second but across 2 days
            const strDate1 = "2022-01-01T23:59:59"
            const strDate2 = "2022-01-02T00:00:00"
            const result = getDiffInDays(strDate1, strDate2)
            expect(result).toEqual(1)
        })
    })
    describe("parseDate()", () => {
        const isDateDisplayed = (
            str: string
        ): boolean => Boolean(str.match(/[\d]{2}\/[\d]{2}\/[\d]{2}/))

        const areHoursDisplayed = (
            str: string
        ): boolean => Boolean(str.match(/[\d]{2}:[\d]{2}/))
        
        it("throws an exception when given argument is not a valid date string", () => {
            const invalidStrDate = "invalid"
            const funct = () => parseDate(invalidStrDate)
            expect(funct).toThrow()
        })
        it("returns a string", () => {
            const strDate = "2022-01-01T07:38:00"
            const result = parseDate(strDate)
            expect(typeof result).toBe("string")
        })
        it("returns an empty string when `withoutDate` & `withoutHours` set to `true`", () => {
            const strDate = "2022-01-01T07:38:00"
            const result = parseDate(strDate, true, true)
            expect(areHoursDisplayed(result)).toBeFalsy()
            expect(isDateDisplayed(result)).toBeFalsy()
        })
        it("does not display hours when `withoutHours` set to `true`", () => {
            const strDate = "2022-01-01T07:38:00"
            const result = parseDate(strDate, true)
            expect(areHoursDisplayed(result)).toBeFalsy()
            expect(isDateDisplayed(result)).toBeTruthy()
        })
        it("does not display date when `withoutDate` set to `true`", () => {
            const strDate = "2022-01-01T07:38:00"
            const result = parseDate(strDate, false, true)
            expect(areHoursDisplayed(result)).toBeTruthy()
            expect(isDateDisplayed(result)).toBeFalsy()
        })
        it("returns a string containing date & hour when `withoutDate` & `withoutHours` undefined or set to `false`", () => {
            const strDate = "2022-01-01T07:38:00"
            const result = parseDate(strDate)
            expect(areHoursDisplayed(result)).toBeTruthy()
            expect(isDateDisplayed(result)).toBeTruthy()
        })
    })
})