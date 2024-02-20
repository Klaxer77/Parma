import { createSlice } from '@reduxjs/toolkit'


const initialState = {
  activeStatusPopup: false
}

export const MapPopupInfo = createSlice({
  name: 'mapPopupInfo',
  initialState,
  reducers: {
    setActiveStatusPopup: (state, action) => {
      state.activeStatusPopup = action.payload
    }
  },
})


export const { setActiveStatusPopup } = MapPopupInfo.actions

export default MapPopupInfo.reducer