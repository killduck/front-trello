import { createSlice } from '@reduxjs/toolkit'

export const taskCardState = createSlice(
  {
    name: 'task_card_state', 
    initialState: {
      DNDIsOn: false,
    },
    reducers: {
      setDNDIsOn: (state, action) => {
        state.DNDIsOn = action.payload;
      }
    },
  }
)

export const { setDNDIsOn } = taskCardState.actions

export default taskCardState.reducer