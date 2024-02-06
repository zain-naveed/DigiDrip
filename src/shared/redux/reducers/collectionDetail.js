import { createSlice } from "@reduxjs/toolkit";

const initState = {
  artworks: [],
  coverImage: null,
  name: null,
  owner: null,
  profileImage: null,
};

export const collectionDetailSlice = createSlice({
  name: "collectionDetail",
  initialState: initState,
  reducers: {
    setCollectionDetail: (state, action) => {
      let tempObj = { ...state, ...action.payload };
      return tempObj;
    },
    resetCollectionDetail: () => initState,
  },
});

export const { setCollectionDetail, resetCollectionDetail } =
  collectionDetailSlice.actions;

export default collectionDetailSlice.reducer;
