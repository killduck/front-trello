import { createSlice } from '@reduxjs/toolkit'

export const cardDescriptionState = createSlice(
  {
    name: 'card_description',
    initialState: {
      startValue: '',
      newValue: '',
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
        // console.log('state =>', state.startValue, 'action =>', action.payload);
      },
      setNewCardDescriptionState: (state, action) => {
        state.newValue = action.payload;
        // console.log('state =>', state.newValue, 'action =>', action.payload);
      },
    },
  }
)

// Action creators are generated for each case reducer function
export const { setNewCardDescriptionState, setStartCardDescriptionState } = cardDescriptionState.actions

export default cardDescriptionState.reducer