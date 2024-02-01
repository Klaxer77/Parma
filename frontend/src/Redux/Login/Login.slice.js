import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';

export const fetchLogin = createAsyncThunk(
  'login',
  async (user, thunkAPI) => {
    try {
      const response = await axios.post('http://localhost:8000/auth/jwt/create/', user)
    } catch (error) {
      thunkAPI.rejectWithValue(error.message);
      throw error;
    }
  },
)

const initialState = {
  loading: false,
  error: null,
}

export const Login = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    setMenuActive: (state, action) => {
      state.menuActive = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchLogin.pending, (state, action) => {
      state.entities.push(action.payload);
      state.loading = true
    })
    builder.addCase(fetchLogin.fulfilled, (state, action) => {
      state.entities.push(action.payload);
      state.loading = false
    })
    builder.addCase(fetchLogin.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false
    })
  },
})


export const { setMenuActive, setMapButtonActive  } = Login.actions

export default Login.reducer