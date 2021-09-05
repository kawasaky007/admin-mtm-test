import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { reducers } from "./redux";
import storage from 'redux-persist/lib/storage'
import { persistStore, persistReducer } from 'redux-persist'
import { PersistConfig } from "redux-persist/es/types";
const config = combineReducers({
    auth: reducers.authReducers,
    user: reducers.userReducer,
    form: reducers.formReducer,
    category: reducers.categoryReducer,
    product: reducers.productReducer,
    banner: reducers.bannerReducer
})
const persistConfig: PersistConfig<any> = {
    key: 'root',
    storage,
    whitelist: ['auth'],
    version: 1,
    // blacklist:[]
}
const persisReducerConfig = persistReducer(persistConfig, config)
const store = configureStore({
    reducer: persisReducerConfig
})
export type RootState = ReturnType<typeof config>
export type AppDispatch = typeof store.dispatch
export const persistor = persistStore(store);
export default store;