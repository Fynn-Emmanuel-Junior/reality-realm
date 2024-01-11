import { configureStore,combineReducers } from '@reduxjs/toolkit'
import userReducer from '../features/users/usersSlice'
import listingsReducer from '../features/listings/listingsSlice'
import {persistReducer,persistStore} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const rootReducer = combineReducers({
    users: userReducer,
    listings: listingsReducer
})

const persistConfig =  {
    key:'root',
    storage,
    version: 1
}

const persistedReducer = persistReducer(persistConfig,rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware({
            serializableCheck: false
        })

})

export  const persistor = persistStore(store)
