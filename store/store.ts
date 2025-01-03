import { configureStore } from '@reduxjs/toolkit'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  PersistConfig
} from 'redux-persist'
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'
import storage from 'redux-persist/lib/storage'

import { RootState } from '@/helpers/store'

import { store } from './rootReducer'


const persistConfig: PersistConfig<RootState> = {
  key: 'root',
  storage,
  version: 1,
  stateReconciler: autoMergeLevel2
}

const persistedReducer = persistReducer(persistConfig, store)

export const rootReducer = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [ FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER ]
      }
      // thunk,
    })
})

export const persistor = persistStore(rootReducer)
