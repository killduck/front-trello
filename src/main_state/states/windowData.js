import { createSlice } from '@reduxjs/toolkit'

export const windowData = createSlice(
  {
    name: 'window_data', 
    initialState: {
      value: {},
    },
    reducers: {
      setWindowData: (state, action) => {
        state.value = action.payload;
        // console.log('state =>', state.value, 'action =>', action.payload);
      }
    },
  }
)

export const { setWindowData } = windowData.actions

export default windowData.reducer