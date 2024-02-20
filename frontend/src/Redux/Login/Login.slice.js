import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { $login } from '../../Api/http'; 
import { LoadedProfile } from '../Profile/LoadedProfile.slice';


export const fetchLogin = createAsyncThunk(
  'login',
  async (user, { rejectWithValue }) => {
    try {
      const response = await $login.post('/create/', user);
      return response.data.access
    } catch (error) {
      return rejectWithValue([error.response.data.detail, error.response.data.email, error.response.data.password]);
    }
  },
)

const initialState = {
  access: null,
  loading: false,
  isAuth: false,
  errors: [],
}

export const Login = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    setIsAuth: (state, action) => {
      state.isAuth = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchLogin.pending, (state) => {
      state.loading = true;
      state.errors = []
    })
    builder.addCase(fetchLogin.fulfilled, (state, action) => {
      state.loading = false;
      state.isAuth = true;
      state.access = localStorage.setItem('access', action.payload);
      LoadedProfile.reducer(LoadedProfile.getInitialState(), LoadedProfile.actions.setLoadedProfile(true));
    })
    builder.addCase(fetchLogin.rejected, (state, action) => {
      state.errors = action.payload;
      state.loading = false
    })
  },
})


export const { setLoading, setIsAuth } = Login.actions

export default Login.reducer