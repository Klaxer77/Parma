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
  loading: false,
  infoUser: {},
}

export const ProfileInfo = createSlice({
  name: 'profile',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUser.pending, (state) => {
      state.loading = true;
      state.infoUser = {}
    })
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.loading = false
      state.infoUser = action.payload
    })
    builder.addCase(fetchUser.rejected, (state, action) => {
      state.loading = false
    })
  },
})


export default ProfileInfo.reducer