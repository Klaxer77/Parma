import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { $map } from '../../Api/http';


export const fetchGrayPlace = createAsyncThunk(
  'grayPlace',
  async (numberPlace) => {
    try {
      const response = await $map.get(`map/place/list/${numberPlace}/`);
      return response.data
    } catch (error) {
      return error
    }
  },
)


const initialState = {
  loading: false,
  activeStatusPopup: null,
  numberPlace: null,
  infoGrayUser: [],
}

export const MapPopupInfo = createSlice({
  name: 'mapPopupInfo',
  initialState,
  reducers: {
    setActiveStatusPopup: (state, action) => {
      state.activeStatusPopup = action.payload
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    setNumberPlace: (state, action) => {
      state.numberPlace = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchGrayPlace.pending, (state) => {
      state.loading = true;
    })
    builder.addCase(fetchGrayPlace.fulfilled, (state, action) => {
      state.infoGrayUser = action.payload
      state.loading = false
    })
    builder.addCase(fetchGrayPlace.rejected, (state, action) => {
      state.loading = false
    })
  },
})


export const { setActiveStatusPopup, setNumberPlace, setLoading } = MapPopupInfo.actions

export default MapPopupInfo.reducer