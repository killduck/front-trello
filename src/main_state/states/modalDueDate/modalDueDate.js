import { createSlice } from '@reduxjs/toolkit'

export const  modalDueDateState = createSlice(
  {
    name: 'modal_duedate_state',
    initialState: {
        dueDateWindow: false,
      blur: false,
    },
    reducers: {
        setDueDateWindow: (state, action) => {
        state.dueDateWindow = action.payload;
        // console.log('state =>', state.value, 'action =>', action.payload);
      },
    },
  }
)

// Action creators are generated for each case reducer function
export const { 
    setDueDateWindow,
} = modalDueDateState.actions

export default modalDueDateState.reducer