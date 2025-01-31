import { createSlice } from '@reduxjs/toolkit'



const initialState = {
  loading: false,
  infoActiveReselve: null,
  numberPlace: null,
  room: null,
  date_start: null,
  date_end: null,
  first_name: null,
  deleteReservation: null,
  remainingTime: null,
  checkData: false,
  messageCompleted: false
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
    },
    setRemainingTime: (state, action) => {
      state.remainingTime = action.payload
    },
    setDeleteReservation: (state, action) => {
      state.deleteReservation = action.payload
    },
    setMessageCompleted: (state, action) => {
      state.messageCompleted = action.payload
    }
  },
})

export const { setInfoActiveReselve, setNumberPlace, setRoom, setDateStart, setDateEnd, setFirstName, setRemainingTime, setDeleteReservation, setCheckData, setLoading, setMessageCompleted } = ActiveReselve.actions

export default ActiveReselve.reducer