import { createSlice, PayloadAction } from "@reduxjs/toolkit";
type isLogin = boolean;
const initialState: isLogin = false;
export const isLogin = createSlice({
  name: "isLogin",
  initialState,
  reducers: {
    setLogin: (state, action: PayloadAction<isLogin>) => {
      return action.payload;
    },
  },
});
export const { setLogin } = isLogin.actions;
export default isLogin.reducer;
