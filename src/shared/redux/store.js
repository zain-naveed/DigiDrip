import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import user from "./reducers/userSlice";
import userProfileDetail from "./reducers/userProfileSlice";
import Loader from "./reducers/LoaderSlice";
import collectionDetail from "./reducers/collectionDetail";
const rootReducer = combineReducers({
  user: user,
  userProfile: userProfileDetail,
  loader: Loader,
  collectDetail: collectionDetail,
});
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user"],
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = configureStore({
  reducer: {
    root: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["register"],
        ignoredActionPaths: ["rehydrate", "register"],
        ignoredPaths: ["register"],
      },
    }),

  //  composeWithDevTools()
});

const persistor = persistStore(store);
export { store, persistor };
