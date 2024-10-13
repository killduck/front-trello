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
        // console.log('state =>', state.showUserCard, 'action =>', action.payload);
      },
      setMembersWindow: (state, action) => {
        state.membersWindow = action.payload;
        // console.log('state =>', state.showUserCard, 'action =>', action.payload);
      },
      setShowPreloderAddMember: (state, action) => {
        state.showPreloderAddMember = action.payload;
        // console.log('state =>', state.showPreloderAddMember, 'action =>', action.payload);
      },
      setShowPreloderDelMember: (state, action) => {
        state.showPreloderDelMember = action.payload;
        // console.log('state =>', state.showPreloderDelMember, 'action =>', action.payload);
      },
    },
  }
)

// Action creators are generated for each case reducer function
export const { 
  setShowUserCard,
  setMembersWindow,
  setShowPreloderAddMember,
  setShowPreloderDelMember,

} = modalCardMemberState.actions

export default modalCardMemberState.reducer