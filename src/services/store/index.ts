import { configureStore } from "@reduxjs/toolkit"
import { reducer } from "./reducer"
export { useStore } from "./hooks"

export const store = configureStore({ reducer })