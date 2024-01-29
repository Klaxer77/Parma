import { configureStore } from '@reduxjs/toolkit'
import { counterSlice } from './Test-slice/Test.slice'

export const store = configureStore({
  reducer: {
    counterSlice
  },
})