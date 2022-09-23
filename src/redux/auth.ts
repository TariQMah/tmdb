import { createSlice } from "@reduxjs/toolkit";
import MovieApi from "../services/movie";

// interfaces

interface initialStateInterface {
  isLoggedIn: undefined | null | boolean;
  loading: boolean;
  globalLoading: boolean;
  user: any;
  userToken: any;
  guestID: string;
}

const initialState: initialStateInterface = {
  isLoggedIn: undefined,
  loading: false,
  globalLoading: false,
  user: null,
  userToken: null,
  guestID: "",
};

const auth_modal = createSlice({
  name: "auth_modal",
  initialState,
  reducers: {
    setIsLoggedIn: (
      state: { isLoggedIn: any; userToken: any },
      action: { payload: any }
    ) => {
      state.isLoggedIn = action.payload.isLoggedIn;
      state.userToken = action.payload.userToken;
    },
    setLodding: (state: { loading: any }, action: { payload: any }) => {
      state.loading = action.payload;
    },
    setGuestID: (state: { guestID: any }, action: { payload: any }) => {
      state.guestID = action.payload;
    },
  },
});

export default auth_modal.reducer;

export const { setIsLoggedIn, setLodding, setGuestID } = auth_modal.actions;

export function login() {
  return async (dispatch: (arg0: any) => void) => {
    try {
      dispatch(setLodding(true));
      let { data } = await MovieApi.get("/authentication/token/new");
      let session = await MovieApi.set("/authentication/guest_session/new", {
        request_token: data?.request_token,
      });
      dispatch(setGuestID(session?.data?.guest_session_id));
      dispatch(
        setIsLoggedIn({
          isLoggedIn: true,
          userToken: data,
        })
      );
      dispatch(setLodding(false));
    } catch (error) {
      dispatch(setLodding(false));
    }
  };
}
