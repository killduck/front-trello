import { createSlice } from '@reduxjs/toolkit'

export const userState = createSlice(
  {
    name: 'user_state', 
    initialState: {
        authorized_user: {},
    },
    reducers: {
        setAuthorizedUser: (state, action) => {
        state.authorized_user = action.payload;
      }
    },
  }
)

export const { setAuthorizedUser } = userState.actions

export default userState.reducer
