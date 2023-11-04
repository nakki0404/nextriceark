import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { LoginState } from "@/types/LoginState";
const initialState: LoginState = { isLogin: false, ID: "" };
export const loginState = createSlice({
  name: "loginState",
  initialState,
  reducers: {
    setloginState: (state, action: PayloadAction<LoginState>) => {
      return action.payload;
    },
  },
});
export const { setloginState } = loginState.actions;
export default loginState.reducer;
