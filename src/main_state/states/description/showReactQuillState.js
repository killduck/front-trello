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
        // console.log('state =>', state.value, 'action =>', action.payload);
      }
    },
  }
)

// Action creators are generated for each case reducer function
export const { setShowReactQuillState } = showReactQuillState.actions

export default showReactQuillState.reducer