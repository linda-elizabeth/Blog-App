import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  { id: "0", name: "Rachel Joy" },
  { id: "1", name: "Dave Gray" },
  { id: "2", name: "Neil Young" },
];
const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
});

export const selectAllUsers = (state) => state.users;
export default usersSlice.reducer;
