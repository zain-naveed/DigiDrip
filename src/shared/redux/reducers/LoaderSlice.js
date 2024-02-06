import { createSlice } from "@reduxjs/toolkit";

const initState = {
  Loader: false,
};

export const LoaderSlice = createSlice({
  name: "Loader",
  initialState: initState,
  reducers: {
    setLoaderSlice: (state, action) => {
      return action.payload;
    },
    resetLoaderSlice: () => initState,
  },
});

export const { setLoaderSlice, resetLoaderSlice } = LoaderSlice.actions;

export default LoaderSlice.reducer;
