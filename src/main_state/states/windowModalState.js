import { createSlice } from '@reduxjs/toolkit'

export const windowModalState = createSlice(
  {
    name: 'window_modal_state',
    initialState: {
      windowModalReloadState: false,
      windowModalReloadBlur: false,
      modalIsOpen: false,
    },
    reducers: {
      setWindowModalReloadState: (state, action) => {
        state.windowModalReloadState = action.payload;
      },
      setWindowModalReloadBlur: (state, action) => {
        state.windowModalReloadBlur = action.payload;
      },
      setModalIsOpen: (state, action) => {
        state.modalIsOpen = action.payload;
      },
    },
  }
)

export const { 
  setWindowModalReloadState,
  setWindowModalReloadBlur,
  setModalIsOpen,
} = windowModalState.actions

export default windowModalState.reducer
