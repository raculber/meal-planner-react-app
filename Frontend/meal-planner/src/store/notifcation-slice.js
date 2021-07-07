import { createSlice } from "@reduxjs/toolkit";

const notifcationSlice = createSlice({
  name: "notification",
  initialState: {
    message: "",
  },
  reducers: {
    sendNotification(state, action) {
      state.message = action.payload.message;
    },
  },
});

export const notificationActions = notifcationSlice.actions;
export default notifcationSlice;
