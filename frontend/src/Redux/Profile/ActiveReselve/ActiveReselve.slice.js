import { createSlice } from '@reduxjs/toolkit'



const initialState = {
  loading: false,
  infoActiveReselve: null,
  numberPlace: null,
  romm: null,
  date_start: null,
  date_end: null,
  first_name: null,
  checkData: false
}

export const ActiveReselve = createSlice({
  name: 'activeReselve',
  initialState,
  reducers: {
    setInfoActiveReselve: (state, action) => {
      state.infoActiveReselve = action.payload
    },
    setNumberPlace: (state, action) => {
      state.numberPlace = action.payload
    },
    setRoom: (state, action) => {
      state.room = action.payload
    },
    setDateStart: (state, action) => {
      state.date_start = action.payload
    },
    setDateEnd: (state, action) => {
      state.date_end = action.payload
    },
    setFirstName: (state, action) => {
      state.first_name = action.payload
    },
    setCheckData: (state, action) => {
      state.checkData = action.payload
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    }
  },
})

export const { setInfoActiveReselve, setNumberPlace, setRoom, setDateStart, setDateEnd, setFirstName, setCheckData, setLoading } = ActiveReselve.actions

export default ActiveReselve.reducer