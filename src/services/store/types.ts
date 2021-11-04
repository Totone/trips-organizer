import { ThunkAction, Action } from "@reduxjs/toolkit"
import { store } from "."

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>

export type AsyncStatus = "idle" | "loading" | "failed" 