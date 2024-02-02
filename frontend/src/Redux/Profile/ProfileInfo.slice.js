import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { $profile } from '../../Api/http'
import { config } from '../../Api/http' 


export const fetchUser = createAsyncThunk(
  'infoUser',
  async () => {
    const response = await $profile.get('profile/', config)
    return response.data
  },
)

const initialState = {
  infoUser: {},
  loaded: false
}

export const ProfileInfo = createSlice({
  name: 'profile',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUser.pending, (state) => {
    })
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.infoUser = action.payload;
      state.loaded = true
    })
    builder.addCase(fetchUser.rejected, (state, action) => {
    })
  },
})


export default ProfileInfo.reducer