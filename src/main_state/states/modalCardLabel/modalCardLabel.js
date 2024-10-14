import { createSlice } from '@reduxjs/toolkit'

export const modalCardLabelState = createSlice(
  {
    name: 'modal_card_label_state',
    initialState: {
        showLabelsWindow : false, //labelsWindow
        cardLabelStatus: false, //cardLabel
        showPreloderLabel: false,
    },
    reducers: {
      setShowLabelsWindow: (state, action) => { //setLabelsWindow
        state.showLabelsWindow = action.payload; 
        // console.log('state =>', state.showLabelsWindow, 'action =>', action.payload);
      },
      setCardLabelStatus: (state, action) => { //setCardLabel
        state.cardLabelStatus = action.payload;
        // console.log('state =>', state.cardLabelStatus, 'action =>', action.payload);
      },
      setShowPreloderLabel: (state, action) => { //setCardLabel
        state.showPreloderLabel = action.payload;
        // console.log('state =>', state.showPreloderLabel, 'action =>', action.payload);
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