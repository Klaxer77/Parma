import { createSlice } from '@reduxjs/toolkit'


const initialState = {
  infoActiveReselve: [],
  loading: false
}

export const ActiveReselve = createSlice({
  name: 'activeReselve',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    setInfoActiveReselve: (state, action) => {
      state.infoActiveReselve.push(action.payload)
    }
  },
})

export const { setLoading, setInfoActiveReselve } = ActiveReselve.actions

export default ActiveReselve.reducer