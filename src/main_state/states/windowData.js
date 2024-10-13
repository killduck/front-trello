import { createSlice } from '@reduxjs/toolkit'

export const windowData = createSlice(
  {
    name: 'window_data',
    initialState: {
      value: {},
    },
    reducers: {
      setWindowData: (state, action) => {
        // console.log('state =>', state.value, 'action =>', action.payload);
        state.value = action.payload;
        // console.log('state =>', state.value, 'action =>', action.payload);
      }
    },
  }
)

// Action creators are generated for each case reducer function
export const { setWindowData } = windowData.actions

export default windowData.reducer