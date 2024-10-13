import { createSlice } from '@reduxjs/toolkit'

export const cardUsersState = createSlice(
  {
    name: 'card_users_state',
    initialState: {
        cardUsers: [],
        authUser: Number,
        matchSearch: '',
        searchNewCardUser: [],

    },
    reducers: {
      setCardUsers: (state, action) => {
        state.cardUsers = action.payload;
        // console.log('state =>', state.showUserCard, 'action =>', action.payload);
      },
      setAuthUser: (state, action) => {
        state.authUser = action.payload;
        // console.log('state =>', state.showUserCard, 'action =>', action.payload);
      },
      setMatchSearch: (state, action) => {
        state.matchSearch = action.payload;
        // console.log('state =>', state.showUserCard, 'action =>', action.payload);
      },
      setSearchNewCardUser: (state, action) => {
        state.searchNewCardUser = action.payload;
        // console.log('state =>', state.showUserCard, 'action =>', action.payload);
      },

    },
  }
)

// Action creators are generated for each case reducer function
export const { 
  setCardUsers,
  setAuthUser,
  setMatchSearch,
  setSearchNewCardUser,

} = cardUsersState.actions

export default cardUsersState.reducer