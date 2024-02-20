import { createSlice } from '@reduxjs/toolkit'


const initialState = {
  checkData: []
}

export const History = createSlice({
  name: 'history',
  initialState,
  reducers: {
    setCheckData:(state, action) => {
      state.checkData = action.payload
    }
  },
})

export const { setCheckData } = History.actions

export default History.reducer