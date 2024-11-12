import { createSlice } from '@reduxjs/toolkit'

export const userState = createSlice(
  {
    name: 'user_state', 
    initialState: {
        authorized_user: {},
        authorized_user_id: '',
        usersOfCards: [],
    },
    reducers: {
      setAuthorizedUser: (state, action) => {
        state.authorized_user = action.payload;
      },
      setAuthorizedUserId: (state, action) => {
        state.authorized_user_id = action.payload;
      },
      setUsersOfCards: (state, action) => {
        state.usersOfCards = action.payload;
      }
    },
  }
)

export const { 
  setAuthorizedUser,
  setAuthorizedUserId,
  setUsersOfCards,
} = userState.actions

export default userState.reducer
