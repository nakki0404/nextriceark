import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { LoginState } from "@/types/LoginState";
const initialState: LoginState = { isLogin: false, ID: "" };
export const loginstate = createSlice({
  name: "loginstate",
  initialState,
  reducers: {
    setloginstate: (state, action: PayloadAction<LoginState>) => {
      return action.payload;
    },
  },
});
export const { setloginstate } = loginstate.actions;
export default loginstate.reducer;
