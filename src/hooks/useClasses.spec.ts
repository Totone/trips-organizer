import { renderHook } from "@testing-library/react-hooks"
import { useClasses } from "./useClasses"

describe("useClasses hook", () => {
    it("returns an empty string if no input is set", () => {
        const { result } = renderHook(useClasses)
        expect(result.current).toEqual("")
    })
    it("returns a string joining all strings given in input", () => {
        const input = ["I", "am", "a", "test", "input"]
        const { result } = renderHook(() => useClasses(input))
        expect(result.current).toEqual("I am a test input")
    })
    it("avoids boolean entries in given input to compute the output string", () => {
        const input = ["I", false, "am", false, "a", false, "test", false, "input"]
        const { result } = renderHook(() => useClasses(input))
        expect(result.current).toEqual("I am a test input")
    })
    it("handles nested arrays", () => {
        const input = ["I", ["am", "a"], ["test", "input"]]
        const { result } = renderHook(() => useClasses(input))
        expect(result.current).toEqual("I am a test input")
    })
})