import { createSlice } from '@reduxjs/toolkit'

export const cardDescriptionState = createSlice(
  {
    name: 'card_description',
    initialState: {
      startValue: '',
      newValue: '',
      descriptionPreloder: false,
      modules: {
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
      setStartCardDescriptionState: (state, action) => {
        state.startValue = action.payload;
      },
      setNewCardDescriptionState: (state, action) => {
        state.newValue = action.payload;
      },
      setDescriptionPreloder: (state, action) => {  
        state.descriptionPreloder = action.payload; 
      },
    },
  }
)

export const { 
  setNewCardDescriptionState, 
  setStartCardDescriptionState, 
  setDescriptionPreloder, 
} = cardDescriptionState.actions

export default cardDescriptionState.reducer