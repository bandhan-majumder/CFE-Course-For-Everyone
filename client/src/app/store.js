import { configureStore } from '@reduxjs/toolkit'
import learnerReducer from '@/features/learner/learnerSlice'
import creatorReducer from '@/features/creator/creatorSlice'

export const store = configureStore({
  reducer: {
    learner: learnerReducer, 
    creator: creatorReducer,
  },
})