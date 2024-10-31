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
      }
    },
  }
)

export const { setSubscribeState } = subscribeState.actions

export default subscribeState.reducer