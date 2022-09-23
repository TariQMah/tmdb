import { AnyAction, combineReducers, configureStore } from "@reduxjs/toolkit";

import authModal from "./auth";
import moviesModal from "./movies";

const reducer = combineReducers({
  authModal,
  moviesModal,
});

// reset state on logout
const rootReducer = (state: any, action: AnyAction) => {
  if (action.type === "auth_modal/setLogout") {
    state = undefined;
  }
  return reducer(state, action);
};

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStateType = ReturnType<typeof reducer>;

export default store;
