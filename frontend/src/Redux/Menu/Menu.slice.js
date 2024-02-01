import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  menuActive: -1
}

export const Menu = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    setMenuActive: (state, action) => {
      state.menuActive = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { setMenuActive  } = Menu.actions

export default Menu.reducer