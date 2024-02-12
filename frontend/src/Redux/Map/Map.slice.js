import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isActivePopup: false,
  place: null,
  markers: [
    { id: 1, element: false },
    { id: 2, element: false },
    { id: 3, element:false },
    { id: 4, element:false }
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