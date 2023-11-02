import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { TradeData } from "@/types/TradeData";
const initialState: TradeData[] = [];
export const tradedata = createSlice({
  name: "tradedata",
  initialState,
  reducers: {
    addtradedata: (state, action: PayloadAction<TradeData>) => {
      state.push(action.payload);
    },
  },
});
export const { addtradedata } = tradedata.actions;
export default tradedata.reducer;
