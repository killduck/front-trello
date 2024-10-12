import { createSlice } from '@reduxjs/toolkit'

export const windowModalReloadState = createSlice(
  {
    name: 'window_modal_reload',
    initialState: {
      value: false,
    },
    reducers: {
      setWindowModalReloadState: (state, action) => {
        // console.log('state =>', state.value, 'action =>', action.payload);
        state.value = action.payload;
        console.log('state =>', state.value, 'action =>', action.payload);
      }
    },
  }
)

// Action creators are generated for each case reducer function
export const { setWindowModalReloadState } = windowModalReloadState.actions

export default windowModalReloadState.reducer