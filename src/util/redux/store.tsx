import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './slices/counterSlice';
import tokenReducer from './slices/tokenSlice';

const store = configureStore({
  reducer: {
    counter: counterReducer,
    token: tokenReducer
  }
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store;
