import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  menuActive: -1,
  mapButtonActive: false
}

export const Menu = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    setMenuActive: (state, action) => {
      state.menuActive = action.payload
    },
    setMapButtonActive: (state, action) => {
      state.mapButtonActive = action.payload
    }
  },
})


export const { setMenuActive, setMapButtonActive  } = Menu.actions

export default Menu.reducer