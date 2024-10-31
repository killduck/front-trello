import { createSlice } from '@reduxjs/toolkit'

export const modalCardDelState = createSlice(
  {
    name: 'modal_card_del_state',
    initialState: {
      showCardDel: false,
    },
    reducers: {
      setShowCardDel: (state, action) => {
        state.showCardDel = action.payload;
      }
    },
  }
)

export const { setShowCardDel } = modalCardDelState.actions

export default modalCardDelState.reducer
