import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { $map } from '../../Api/http';


export const fetchUserReservation = createAsyncThunk(
  'userReservation',
  async (reservationUser, {rejectWithValue}) => {
    try {
      const response = await $map.post('user/reservation/', reservationUser);
      return response.data
    } catch (error) {
      return rejectWithValue([error.response.data.error, error.response.data.place])
    }
  },
)


const initialState = {
  loading: false,
  error: null,
  messageCompletedReservation: null
}

export const MapReservation = createSlice({
  name: 'mapPopupInfo',
  initialState,
  reducers: {
    setMessageCompletedReservation: (state, action) => {
      state.messageCompletedReservation = action.payload
    },
    setError: (state, action) => {
      state.error = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserReservation.pending, (state) => {
      state.loading = true;
    })
    builder.addCase(fetchUserReservation.fulfilled, (state, action) => {
      state.loading = false;
      state.messageCompletedReservation = action.payload;
      state.error = null
    })
    builder.addCase(fetchUserReservation.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload
    })
  },
})


export const { setMessageCompletedReservation, setError } = MapReservation.actions

export default MapReservation.reducer