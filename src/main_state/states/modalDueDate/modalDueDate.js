import { createSlice } from '@reduxjs/toolkit'

export const  modalDueDateState = createSlice(
  {
    name: 'modal_duedate_state',
    initialState: {
        dueDateWindow: false, 
        dueDateCheckbox: false, 
        dueDatePreloder: false,
    },
    reducers: {
      setDueDateWindow: (state, action) => { 
        state.dueDateWindow = action.payload; 
      },
      setDueDateCheckbox: (state, action) => {  
        state.dueDateCheckbox = action.payload; 
      },
      setDueDatePreloder: (state, action) => {  
        state.dueDatePreloder = action.payload; 
      },
    },
  }
)

export const { 
    setDueDateWindow,
    setDueDateCheckbox,
    setDueDatePreloder,
} = modalDueDateState.actions

export default modalDueDateState.reducer