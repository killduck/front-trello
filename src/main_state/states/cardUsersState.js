import { createSlice } from '@reduxjs/toolkit'

export const cardUsersState = createSlice(
  {
    name: 'card_users_state',
    initialState: {
        cardUsers: [],
        authUser: Number(null),
        authUserData: Number(null),
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
      },
      setAuthUserData: (state, action) => {
        state.authUserData = action.payload;
      },
      setMatchSearch: (state, action) => {
        state.matchSearch = action.payload;
      },
      setSearchNewCardUser: (state, action) => {
        state.searchNewCardUser = action.payload;
      },

    },
  }
)

export const { 
  setCardUsers,
  setAuthUser,
  setAuthUserData,
  setMatchSearch,
  setSearchNewCardUser,

} = cardUsersState.actions

export default cardUsersState.reducer