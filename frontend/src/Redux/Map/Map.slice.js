import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isActivePopup: false,
  place: null,
  markers: [
    { id: 1, element: false },
    { id: 2, element: false },
    { id: 3, element:false },
    { id: 4, element:false },
    { id: 5, element:false },
    { id: 6, element:false },
    { id: 7, element:false },
    { id: 8, element:false },
    { id: 9, element:false },
    { id: 10, element:false },
    { id: 11, element:false },
    { id: 12, element:false },
    { id: 13, element:false },
    { id: 14, element:false },
    { id: 15, element:false },
    { id: 16, element:false },
    { id: 17, element:false },
    { id: 18, element:false },
    { id: 19, element:false },
    { id: 20, element:false },
    { id: 21, element:false },
    { id: 22, element:false },
    { id: 23, element:false },
    { id: 24, element:false },
    { id: 25, element:false },
    { id: 26, element:false },
    { id: 27, element:false },
]
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
    setMarkers: (state, action) => {
      const { id, newBool } = action.payload;
      const user = state.markers.find(user => user.id === id);
      if (user) {
        user.element = newBool;
      }
    },
    updateMarkers: (state) => {
      return state.markers.map(item => ({
          element: true
      }));
  }
  },
})


export const { setIsActivePopup, setPlace, setMarkers, updateMarkers  } = Map.actions

export default Map.reducer