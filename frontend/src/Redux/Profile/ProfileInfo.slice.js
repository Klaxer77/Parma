import { createSlice } from '@reduxjs/toolkit'


const initialState = {
  infoUser: {},
  loaded: false,
  textEmail: '',
  textNumber: '',
}

export const ProfileInfo = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setLoaded:(state, action) => {
      state.loaded = action.payload
    },
    setInfoUser:(state, action) => {
      state.infoUser = action.payload
    },
    setTextEmail:(state, action) => {
      state.textEmail = action.payload
    },
    setTextNumber:(state, action) => {
      state.textNumber = action.payload
    },
  },
})

export const { setLoaded, setInfoUser, setTextEmail, setTextNumber } = ProfileInfo.actions

export default ProfileInfo.reducer