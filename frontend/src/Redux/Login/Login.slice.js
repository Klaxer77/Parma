import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { $login } from '../../Api/http';

export const fetchLogin = createAsyncThunk(
  'login',
  async (user, { rejectWithValue }) => {
    try {
      const response = await $login.post('/create/', user);
      localStorage.setItem('access', response.data.access)
    } catch (error) {
      return rejectWithValue([error.response.data.detail, error.response.data.email, error.response.data.password]);
    }
  },
)

const initialState = {
  loading: false,
  errors: [],
}

export const Login = createSlice({
  name: 'login',
  initialState,
  reducers: {
    
  },
  extraReducers: (builder) => {
    builder.addCase(fetchLogin.pending, (state, action) => {
      state.loading = true;
      state.errors = []
    })
    builder.addCase(fetchLogin.fulfilled, (state, action) => {
      state.loading = false
    })
    builder.addCase(fetchLogin.rejected, (state, action) => {
      state.errors = action.payload;
      state.loading = false
    })
  },
})


export const { setMenuActive, setMapButtonActive  } = Login.actions

export default Login.reducer