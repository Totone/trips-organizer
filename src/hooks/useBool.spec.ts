import { renderHook, act } from "@testing-library/react-hooks"
import { useBool, defaultValue } from "./useBool"

describe("useBook hook", () => {
    describe("returns an array with the value & a method", () => {
        test("output[0] is the boolean value", () => {
            const { result } = renderHook(useBool)
            expect(typeof result.current[0]).toEqual("boolean")
        })
        test("output[1] is the toggle method", () => {
            const { result } = renderHook(useBool)
            expect(typeof result.current[1]).toEqual("function")
        })
                    
    })
    describe("stores value passed on initial call as initial value", () => {
        it("has default value if no value is set on initial call", () => {
            const { result } = renderHook(useBool)
            expect(result.current[0]).toEqual(defaultValue)
        })
        it("handles case of `true` set on initial call", () => {
            const { result } = renderHook(() => useBool(true))
            expect(result.current[0]).toEqual(true)
        })
        it("handles case of `false` set on initial call", () => {
            const { result } = renderHook(() => useBool(false))
            expect(result.current[0]).toEqual(false)
        })
    })
    describe("`toggle()` method", () => {
        it("toggles value when called", () => {
            const { result } = renderHook(useBool)
            const previousValue: boolean = result.current[0]
            act(() => { result.current[1]() })
            expect(result.current[0]).toEqual(!previousValue)
        })
    })
})