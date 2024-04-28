import { configureStore } from '@reduxjs/toolkit'
import premiumReducer from '../redux/premium/premiumSlice.js'

export const store = configureStore({
  reducer: {premium: premiumReducer},
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
      serializableCheck: false,
  }),
})