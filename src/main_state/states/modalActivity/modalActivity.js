

import { createSlice } from '@reduxjs/toolkit'

export const modalActivityState = createSlice(
  {
    name: 'modal_activity_state',
    initialState: {
      activityEditorShow: null, 
      cardActivityComments : [], 
      cardActivitymodules: {
        toolbar: [
          [{ header: []}],
          ["bold", "italic", "underline"], //"strike", "blockquote"
          [{color: []}],
          [{ list: "ordered" }, { list: "bullet" }],
          ["link", "image", "video"],
          ["clean"],
        ],
      },
    },
    reducers: {
      setActivityEditorShow: (state, action) => { 
        state.activityEditorShow = action.payload; 
      },
      setCardActivityComments: (state, action) => { 
        state.cardActivityComments = action.payload; 
      },
    },
  }
)

export const { 
  setActivityEditorShow,
  setCardActivityComments,
} = modalActivityState.actions

export default modalActivityState.reducer