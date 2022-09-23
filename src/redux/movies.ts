import { createSlice } from "@reduxjs/toolkit";

interface initialStateInterface {
  loading: boolean;
  movies_list: any;
  movie_details: any;
}

const initialState: initialStateInterface = {
  loading: true,
  movies_list: null,
  movie_details: null,
};

const movies_model = createSlice({
  name: "movies_model",
  initialState,
  reducers: {
    setMovieList: (
      state: { movies_list: any; loading: boolean },
      action: { payload: any }
    ) => {
      state.movies_list = action.payload;
      state.loading = false;
    },
    setMovieDetails: (
      state: { movie_details: any; loading: boolean },
      action: { payload: any }
    ) => {
      state.movie_details = action.payload;
      state.loading = false;
    },
  },
});

export default movies_model.reducer;

export const { setMovieList, setMovieDetails } = movies_model.actions;
