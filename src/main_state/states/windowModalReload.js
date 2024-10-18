import { createSlice } from '@reduxjs/toolkit'

export const windowModalReloadState = createSlice(
  {
    name: 'window_modal_reload',
    initialState: {
      value: false,
      blur: false,
    },
    reducers: {
      setWindowModalReloadState: (state, action) => {
        state.value = action.payload;
      },
      setWindowModalReloadBlur: (state, action) => {
        state.blur = action.payload;
      },
    },
  }
)

export const { 
  setWindowModalReloadState,
  setWindowModalReloadBlur,
} = windowModalReloadState.actions

export default windowModalReloadState.reducer
