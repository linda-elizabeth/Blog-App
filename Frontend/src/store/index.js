import { combineReducers, configureStore } from "@reduxjs/toolkit";
import postsReducer from "../features/posts/postsSlice";
import usersReducer from "../features/users/usersSlice";
import hardSet from "redux-persist/lib/stateReconciler/hardSet";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

import { apiStorage } from "./apiStorage";

const rootReducer = combineReducers({
  posts: postsReducer,
  users: usersReducer,
});
const persistConfig = {
  key: "root",
  version: 1,
  storage: apiStorage,
  stateReconciler: hardSet,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PURGE, PERSIST, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
