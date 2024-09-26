import { configureStore, combineReducers } from '@reduxjs/toolkit'
import learnerReducer from '@/features/learner/learnerSlice'
import creatorReducer from '@/features/creator/creatorSlice'
import persistReducer from 'redux-persist/es/persistReducer'
import storage from 'redux-persist/lib/storage'
import persistStore from 'redux-persist/es/persistStore'

const rootReducer = combineReducers({
  learner: learnerReducer,
  creator: creatorReducer,
})

const persistConfig = {
  key: 'root',
  storage,
  version: 1,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefautlMiddleware) => getDefautlMiddleware({ serializableCheck: false }), // this will prevent error
})

export const persistor = persistStore(store)