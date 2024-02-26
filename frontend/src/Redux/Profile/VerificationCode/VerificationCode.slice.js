import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { $profile } from '../../../Api/http'; 

// email

export const fetchChangeEmail = createAsyncThunk(
  'changeEmail',
  async (email, {rejectWithValue}) => {
    try {
      const response = await $profile.post('change-email/', email);
    return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.error);
    }
  }
);

export const fetchConfirmEmail = createAsyncThunk(
  'confirmEmail',
  async (confirmation_code, {rejectWithValue}) => {
    try {
      const response = await $profile.post('confirm-email/', confirmation_code);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.error)
    }
  }
);

// phone

export const fetchChangePhone = createAsyncThunk(
  'changePhone',
  async (phone, {rejectWithValue}) => {
    try {
      const response = await $profile.post('change-phone/', phone);
    return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.error);
    }
  }
);

export const fetchConfirmPhone = createAsyncThunk(
  'confirmPhone',
  async (confirmation_code, {rejectWithValue}) => {
    try {
      const response = await $profile.post('confirm-phone/', confirmation_code);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.error)
    }
  }
);



const initialState = {
  verificationCodes: ['', '', '', '', '', ''],
  loadingChangeEmail: false,
  loadingConfirmEmail: false,
  showCode: false,
  errorsChangeEmail: null,
  errorsConfirm: null,
  messageEmail: null,
  messagePhone: null,
  messageCompletedProfile: {},
}

export const VerificationCode = createSlice({
  name: 'verificationCode',
  initialState,
  reducers: {
    setShowCode: (state, action) => {
      state.showCode = action.payload
    },
    setErrorsConfirm: (state, action) => {
      state.errorsConfirm = action.payload
    },
    setVerificationCodes: (state, action) => {
      state.verificationCodes = action.payload
    },
    setMessageCompleted: (state, action) => {
      state.messageCompletedProfile = action.payload
    },
  },
  extraReducers: (builder) => {
    // email
    builder.addCase(fetchChangeEmail.pending, (state) => {
      state.loadingChangeEmail = true;
    })
    builder.addCase(fetchChangeEmail.fulfilled, (state, action) => {
      state.loadingChangeEmail = false;
      state.showCode = true;
      state.messageEmail = action.payload;
      state.errorsChangeEmail = null;
      state.messageCompletedProfile = {}
    })
    builder.addCase(fetchChangeEmail.rejected, (state, action) => {
      state.errorsChangeEmail = action.payload;
      state.loadingChangeEmail = false;
    })


    builder.addCase(fetchConfirmEmail.pending, (state) => {
      state.loadingConfirmEmail = true;
    })
    builder.addCase(fetchConfirmEmail.fulfilled, (state, action) => {
      state.loadingConfirmEmail = false;
      state.showCode = false;
      state.messageCompletedProfile = action.payload;
      setTimeout(() => {
        state.messageCompletedProfile = {}
      }, 1);
      state.errorsConfirm = null;
    })
    builder.addCase(fetchConfirmEmail.rejected, (state, action) => {
      state.errorsConfirm = action.payload;
      state.loadingConfirmEmail = false;
      state.verificationCodes = ['', '', '', '', '', '']
    })

    // phone

    builder.addCase(fetchChangePhone.pending, (state) => {
      state.loadingChangeEmail = true;
    })
    builder.addCase(fetchChangePhone.fulfilled, (state, action) => {
      state.loadingChangeEmail = false;
      state.showCode = true;
      state.messagePhone = action.payload;
      state.errorsChangeEmail = null;
      state.messageCompletedProfile = {}
    })
    builder.addCase(fetchChangePhone.rejected, (state, action) => {
      state.errorsChangeEmail = action.payload;
      state.loadingChangeEmail = false;
    })


    builder.addCase(fetchConfirmPhone.pending, (state) => {
      state.loadingConfirmEmail = true;
    })
    builder.addCase(fetchConfirmPhone.fulfilled, (state, action) => {
      state.loadingConfirmEmail = false;
      state.showCode = false;
      state.messageCompletedProfile = action.payload;
      state.errorsConfirm = null;
    })
    builder.addCase(fetchConfirmPhone.rejected, (state, action) => {
      state.errorsConfirm = action.payload;
      state.loadingConfirmEmail = false;
      state.verificationCodes = ['', '', '', '', '', '']
    })
  },
})

export const { setShowCode, setVerificationCodes, setMessageCompleted, setErrorsConfirm  } = VerificationCode.actions

export default VerificationCode.reducer