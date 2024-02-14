import { createSlice } from '@reduxjs/toolkit'



const initialState = {
  infoActiveReselve: [],
  numberPlace: null,
  date_start: null,
  date_end: null,
  first_name: null,
  loading: false,
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
    },
    deleteInfoActiveReselve: (state) => {
      state.infoActiveReselve = []
    },
    setNumberPlace: (state, action) => {
      state.numberPlace = action.payload
    },
    setDateStart: (state, action) => {
      state.date_start = action.payload
    },
    setDateEnd: (state, action) => {
      state.date_end = action.payload
    },
    setFirstName: (state, action) => {
      state.date_end = action.payload
    },
  },
})

export const { setLoading, setInfoActiveReselve, setNumberPlace, setDateStart, setDateEnd, setFirstName, deleteInfoActiveReselve } = ActiveReselve.actions

export default ActiveReselve.reducer