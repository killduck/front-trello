import { createSlice } from '@reduxjs/toolkit'

export const subscribeState = createSlice(
  {
    name: 'subscribe_state',
    initialState: {
      value: false,
    },
    reducers: {
      setSubscribeState: (state, action) => {
        state.value = action.payload;
        // console.log('state =>', state.value, 'action =>', action.payload);
      }
    },
  }
)

// Action creators are generated for each case reducer function
export const { setSubscribeState } = subscribeState.actions

export default subscribeState.reducer