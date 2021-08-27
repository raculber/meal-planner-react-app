import { createSlice } from "@reduxjs/toolkit";

const notifcationSlice = createSlice({
  name: "notification",
  initialState: {
    message: "",
    optional: "",
  },
  reducers: {
    sendNotification(state, action) {
      state.message = action.payload.message;
      state.optional = action.payload.optional;
    },
  },
});

export const notificationActions = notifcationSlice.actions;
export default notifcationSlice;
