import {createSlice} from '@reduxjs/toolkit'

const initialState = {
  access: '',
  userInfo: {
    username: '',
    id: '',
    email: '',
    is_superuser: false,
  }
}

export const tokenSlice = createSlice({
  name: 'token',
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.access = action.payload
    },
    setLoginInfo: (state: any, action: any) => {
      state.access = action.payload.access,
      state.userInfo = action.payload.userInfo
    },
    removeLoginInfo: (state: any) => {
      state.access = initialState.access,
      state.userInfo = initialState.userInfo
    }
  }
})

export const { setToken, setLoginInfo, removeLoginInfo } = tokenSlice.actions

export default tokenSlice.reducer;