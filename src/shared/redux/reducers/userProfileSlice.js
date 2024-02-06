import { createSlice } from "@reduxjs/toolkit";

const initState = {
  collection: [],
  drops: [],
  favoruite: [],
};

export const userProfileSlice = createSlice({
  name: "user",
  initialState: initState,
  reducers: {
    setUserProfileSlice: (state, action) => {
      let tempObj = { ...state, ...action.payload };
      return tempObj;
    },
    resetUserProfileSlice: () => initState,
  },
});

export const { setUserProfileSlice, resetUserProfileSlice } =
  userProfileSlice.actions;

export default userProfileSlice.reducer;
