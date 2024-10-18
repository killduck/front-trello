import { createSlice } from '@reduxjs/toolkit'

export const modalCardLabelState = createSlice(
  {
    name: 'modal_card_label_state',
    initialState: {
        showLabelsWindow : false, 
        cardLabelStatus: false, 
        showPreloderLabel: false, 
    },
    reducers: {
      setShowLabelsWindow: (state, action) => { 
        state.showLabelsWindow = action.payload; 
      },
      setCardLabelStatus: (state, action) => { 
        state.cardLabelStatus = action.payload;
      },
      setShowPreloderLabel: (state, action) => { 
        state.showPreloderLabel = action.payload;
      },
    },
  }
)

export const { 
  setShowLabelsWindow,
  setCardLabelStatus,
  setShowPreloderLabel,
} = modalCardLabelState.actions

export default modalCardLabelState.reducer