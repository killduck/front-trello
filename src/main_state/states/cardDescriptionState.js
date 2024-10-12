import { createSlice } from '@reduxjs/toolkit'

export const cardDescriptionState = createSlice(
  {
    name: 'card_description',
    initialState: {
      startValue: '',
      newValue: '',
    },
    reducers: {
      setStartCardDescriptionState: (state, action) => {
        // console.log('state =>', state.value, 'action =>', action.payload);
        state.startValue = action.payload;
        console.log('state =>', state.startValue, 'action =>', action.payload);
      },
      setNewCardDescriptionState: (state, action) => {
        // console.log('state =>', state.value, 'action =>', action.payload);
        state.newValue = action.payload;
        console.log('state =>', state.newValue, 'action =>', action.payload);
      },
    },
  }
)

// Action creators are generated for each case reducer function
export const { setNewCardDescriptionState, setStartCardDescriptionState } = cardDescriptionState.actions

export default cardDescriptionState.reducer