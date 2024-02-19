import { createSlice } from '@reduxjs/toolkit'


const initialState = {
  loadedProfile: true,
}

export const LoadedProfile = createSlice({
  name: 'profileLoaded',
  initialState,
  reducers: {
    setLoadedProfile:(state, action) => {
      state.loadedProfile = action.payload
    },
  },
})

export const { setLoadedProfile } = LoadedProfile.actions

export default LoadedProfile.reducer