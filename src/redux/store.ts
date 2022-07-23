import { AnyAction, configureStore, Reducer } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "reduxjs-toolkit-persist";
import storage from "reduxjs-toolkit-persist/lib/storage";
import sortingReducer from "./sortingSlice/sortingSlice";
import cartReducer, { ICardState } from "./cartSlice/cartSlice";
import fetchReducer from "./fetchSlice/fetchSlice";
import modaleReducer from "./modaleSlice/modaleSlice";
import { useDispatch } from "react-redux";

// Persist
const persistConfig = {
  key: "cart",
  storage,
};

// Persist
const persistedReducer: Reducer<ICardState, AnyAction> = persistReducer(
  persistConfig,
  cartReducer
);

export const store = configureStore({
  reducer: {
    sorting: sortingReducer,
    cart: persistedReducer,
    fetch: fetchReducer,
    modale: modaleReducer,
  },

  // Persist
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export type RootState = ReturnType<typeof store.getState>;
