import { createSlice } from '@reduxjs/toolkit'

export const userState = createSlice(
  {
    name: 'user_state', 
    initialState: {
        authorized_user: {},
        authorized_user_id: '',
    },
    reducers: {
      setAuthorizedUser: (state, action) => {
        state.authorized_user = action.payload;
      },
      setAuthorizedUserId: (state, action) => {
        state.authorized_user_id = action.payload;
      }
    },
  }
)

export const { 
  setAuthorizedUser,
  setAuthorizedUserId,
} = userState.actions

export default userState.reducer
