import { configureStore,combineReducers } from '@reduxjs/toolkit'
import userReducer from '../features/users/usersSlice'
import menuReducer from '../features/menu/menuSlice'
import listingsReducer from '../features/listings/listingsSlice'
import listingReducer from '../features/listings/listingSlice'
import ImageReducer from '../features/listings/CarouselSlice'
import bookingDateReducer from '../features/listings/bookingDate'
import {persistReducer,persistStore} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const rootReducer = combineReducers({
    users: userReducer,
    listings: listingsReducer,
    menu: menuReducer,
    images: ImageReducer,
    listing: listingReducer,
    bookingDate: bookingDateReducer,
 
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
