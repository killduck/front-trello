import { createSlice } from '@reduxjs/toolkit'

export const windowNameState = createSlice(
  {
    name: 'window_name_state',
    initialState: {
        startWindowName: '',
        newWindowName: '',
        newNameField: false,
        preloaderWindowName: false,
    },
    reducers: {
      setStatrtWindowName: (state, action) => {
        state.startWindowName = action.payload;
        // console.log('state =>', state.startWindowName, 'action =>', action.payload);
      },
      setNewWindowName: (state, action) => {
        state.newWindowName = action.payload;
        // console.log('state =>', state.newWindowName, 'action =>', action.payload);
      },
      setNewNameField: (state, action) => {
        state.newNameField = action.payload;
        // console.log('state =>', state.newNameField, 'action =>', action.payload);
      },
      setPreloaderWindowName: (state, action) => {
        state.preloaderWindowName = action.payload;
        // console.log('state =>', state.preloaderWindowName, 'action =>', action.payload);
      },
    },
  }
)

// Action creators are generated for each case reducer function
export const { 
  setStatrtWindowName,
  setNewWindowName,
  setNewNameField,
  setPreloaderWindowName,
} = windowNameState.actions

export default windowNameState.reducer