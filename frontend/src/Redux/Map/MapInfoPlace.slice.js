import { createSlice } from '@reduxjs/toolkit'


const initialState = {
  loading: false,
  statusPlace: ''
}

export const MapInfoPlace = createSlice({
  name: 'mapInfoPlace',
  initialState,
  reducers: {
    setStatusPlace: (state, action) => {
      state.statusPlace = action.payload
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    }
  },
})


export const { setStatusPlace, setLoading } = MapInfoPlace.actions

export default MapInfoPlace.reducer