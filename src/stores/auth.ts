import { createSlice } from '@reduxjs/toolkit'

type AppState = {
  login: boolean
  userId: string
}

const initialState: AppState = {
  login: false,
  userId: ''
}

const slice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    login: (state: any, action) => {
      const { userId } = action.payload
      state.login = true
      state.userId = userId
    },
    logout: (state: any) => {
      state.login = false
      state.userId = ''
    }
  }
});

export default slice.reducer;
export const { login, logout } = slice.actions