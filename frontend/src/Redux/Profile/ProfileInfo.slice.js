import { createSlice } from '@reduxjs/toolkit'


const initialState = {
  infoUser: {},
  loaded: false,
  loadedProfile: true,
  textEmail: '',
  textNumber: ''
}

export const ProfileInfo = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setLoaded:(state, action) => {
      state.loaded = action.payload
    },
    setLoadedProfile:(state, action) => {
      state.loadedProfile = action.payload
    },
    setInfoUser:(state, action) => {
      state.infoUser = action.payload
    },
    setTextEmail:(state, action) => {
      state.textEmail = action.payload
    },
    setTextNumber:(state, action) => {
      state.textNumber = action.payload
    }
  },
})

export const { setLoaded, setLoadedProfile, setInfoUser, setTextEmail, setTextNumber } = ProfileInfo.actions

export default ProfileInfo.reducer