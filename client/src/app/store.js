import { configureStore } from '@reduxjs/toolkit'
import learnerReducer from '@/features/learner/learnerSlice'

export const store = configureStore({
  reducer: {
    learner: learnerReducer, 
  },
})