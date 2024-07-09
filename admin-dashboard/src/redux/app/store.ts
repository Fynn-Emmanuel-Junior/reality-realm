// store.ts

import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';

import authReducer from '../features/auth/superAdminSlice';
import roleReducer from '../features/role/roleSlice';
import managersReducer from '../features/superAdmins/managersSlice';
import editManagerReducer from '../features/editManager/editManagerSlice';
import loanProductReducer from '../features/loanProducts/loanProductSlice';
import customersReducer from '../features/customers/customerSlice';
import profileReducer from '../features/profile/profileSlice';
import approvalsReducer from '../features/approvals/approvalsSlice';

const rootReducer = combineReducers({
  auth: authReducer,
    role: roleReducer,
    managers: managersReducer,
    editManagerState: editManagerReducer,
    loanProduct: loanProductReducer,
    customers: customersReducer,
    profile: profileReducer,
    approvals: approvalsReducer
});

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({
        serializableCheck: false
    })
});

const persistor = persistStore(store);

export { store, persistor };

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
