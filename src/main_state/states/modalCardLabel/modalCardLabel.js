import { createSlice } from '@reduxjs/toolkit'

export const modalCardLabelState = createSlice(
  {
    name: 'modal_card_label_state',
    initialState: {
        showLabelsWindow : false, 
        showLabelsWindowText: false,
        cardLabelStatus: false, 
        showPreloderLabel: false, 
        labelWindowText: '',
    },
    reducers: {
      setShowLabelsWindow: (state, action) => { 
        state.showLabelsWindow = action.payload; 
      },
      setShowLabelsWindowText: (state, action) => { 
        state.showLabelsWindowText = action.payload; 
      },
      setCardLabelStatus: (state, action) => { 
        state.cardLabelStatus = action.payload;
      },
      setShowPreloderLabel: (state, action) => { 
        state.showPreloderLabel = action.payload;
      },
      setLabelWindowText: (state, action) => { 
        state.labelWindowText = action.payload;
      },
    },
  }
)

export const { 
  setShowLabelsWindow,
  setShowLabelsWindowText,
  setCardLabelStatus,
  setShowPreloderLabel,
  setLabelWindowText,
} = modalCardLabelState.actions

export default modalCardLabelState.reducer