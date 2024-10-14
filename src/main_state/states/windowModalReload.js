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
        // console.log('state =>', state.value, 'action =>', action.payload);
      },
      setWindowModalReloadBlur: (state, action) => {
        state.blur = action.payload;
        // console.log('state =>', state.blur, 'action =>', action.payload);
      },
    },
  }
)

// Action creators are generated for each case reducer function
export const { 
  setWindowModalReloadState,
  setWindowModalReloadBlur,
} = windowModalReloadState.actions

export default windowModalReloadState.reducer