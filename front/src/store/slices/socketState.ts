//socketState.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { SocketState } from "@/types/SocketState";

const initialState: SocketState = {
  socketID: null,
  isConnected: false,
};

export const socketState = createSlice({
  name: "socketState",
  initialState,
  reducers: {
    connectSocket: (state, action: PayloadAction<any>) => {
      state.socketID = action.payload;
      state.isConnected = true;
    },
    disConnectSocket: (state, action: PayloadAction<any>) => {
      state.socketID = null;
      state.isConnected = false;
    },
  },
});
export const { connectSocket, disConnectSocket } = socketState.actions;
export default socketState.reducer;
