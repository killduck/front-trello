import { createSlice } from '@reduxjs/toolkit'

export const modalCardMemberState = createSlice(
  {
    name: 'modal_card_member_state',
    initialState: {
        showUserCard: null,
        membersWindow: false,
        showPreloderAddMember: false,
        showPreloderDelMember: false,
    },
    reducers: {
      setShowUserCard: (state, action) => {
        state.showUserCard = action.payload;
      },
      setMembersWindow: (state, action) => {
        state.membersWindow = action.payload;
      },
      setShowPreloderAddMember: (state, action) => {
        state.showPreloderAddMember = action.payload;
      },
      setShowPreloderDelMember: (state, action) => {
        state.showPreloderDelMember = action.payload;
      },
    },
  }
)

export const { 
  setShowUserCard,
  setMembersWindow,
  setShowPreloderAddMember,
  setShowPreloderDelMember,
} = modalCardMemberState.actions

export default modalCardMemberState.reducer
