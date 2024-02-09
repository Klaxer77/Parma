import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isActivePopup: false,
  place: null,
  markerClose: false
}

export const Map = createSlice({
  name: 'map',
  initialState,
  reducers: {
    setIsActivePopup: (state, action) => {
      state.isActivePopup = action.payload
    },
    setPlace: (state, action) => {
      state.place = action.payload
    },
    setMarkerClose: (state, action) => {
      state.markerClose = action.payload
    },
  },
})


export const { setIsActivePopup, setPlace, setMarkerClose  } = Map.actions

export default Map.reducer