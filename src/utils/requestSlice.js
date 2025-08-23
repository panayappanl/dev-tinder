import { createSlice } from "@reduxjs/toolkit";

const requestslice = createSlice({
  name: "request",
  initialState: null,
  reducers: {
    addRequest: (state, action) => {
      return action.payload;
    },
    removeRequest: (state, action) => {
      return null;
    },
  },
});

export const { addRequest, removeRequest } = requestslice.actions;
export default requestslice.reducer;
