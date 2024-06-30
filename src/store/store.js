import { configureStore, createSlice } from "@reduxjs/toolkit";

let user = createSlice({
  name: "user",
  initialState: "kim",
  reducers: {
    changeName(state) {
      return "changed name";
    },
  },
});

export let { changeName } = user.actions;

let stock = createSlice({
  name: "user",
  initialState: "kim",
});

export default configureStore({
  reducer: {
    user: user.reducer,
    stock: stock.reducer,
  },
});
