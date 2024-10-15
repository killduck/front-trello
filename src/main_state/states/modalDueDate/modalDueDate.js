import { createSlice } from '@reduxjs/toolkit'

export const  modalDueDateState = createSlice(
  {
    name: 'modal_duedate_state',
    initialState: {
        dueDateWindow: false,
        dueDateCheckbox: false,
    },
    reducers: {
      setDueDateWindow: (state, action) => {
        state.dueDateWindow = action.payload;
        // console.log('state =>', state.dueDateWindow, 'action =>', action.payload);
      },
      setDueDateCheckbox: (state, action) => {
        state.dueDateCheckbox = action.payload;
        // console.log('state =>', state.dueDateCheckbox, 'action =>', action.payload);
      },
    },
  }
)

export const { 
    setDueDateWindow,
    setDueDateCheckbox,
} = modalDueDateState.actions

export default modalDueDateState.reducer