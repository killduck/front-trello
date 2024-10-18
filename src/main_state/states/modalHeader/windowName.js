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
      },
      setNewWindowName: (state, action) => {
        state.newWindowName = action.payload;
      },
      setNewNameField: (state, action) => {
        state.newNameField = action.payload;
      },
      setPreloaderWindowName: (state, action) => {
        state.preloaderWindowName = action.payload;
      },
    },
  }
)

export const { 
  setStatrtWindowName,
  setNewWindowName,
  setNewNameField,
  setPreloaderWindowName,
} = windowNameState.actions

export default windowNameState.reducer
