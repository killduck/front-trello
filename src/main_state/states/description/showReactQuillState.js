import { createSlice } from '@reduxjs/toolkit'

export const showReactQuillState = createSlice(
  {
    name: 'show_react_quill',
    initialState: {
      value: false,
    },
    reducers: {
      setShowReactQuillState: (state, action) => {
        state.value = action.payload;
      }
    },
  }
)

export const { setShowReactQuillState } = showReactQuillState.actions

export default showReactQuillState.reducer