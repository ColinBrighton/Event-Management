import AsyncStorage from "@react-native-async-storage/async-storage";
import ThemeSlice from "./slices/ThemeSlice";
import { persistReducer, persistStore } from "redux-persist";
import AuthSlice from "./slices/AuthSlice";

const { configureStore, combineReducers } = require("@reduxjs/toolkit");

const RootReducer = combineReducers({
    theme: ThemeSlice,
    user:AuthSlice
})

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['theme','user'],
};

const persistedReducer = persistReducer(persistConfig, RootReducer)

const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({ serializableCheck: false }),
})

const persistor = persistStore(store);

export { store ,persistor}