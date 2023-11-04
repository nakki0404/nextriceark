import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { TradeData } from "@/types/TradeData";
const initialState: TradeData[] = [];
export const tradeData = createSlice({
  name: "tradeData",
  initialState,
  reducers: {
    addtradeData: (state, action: PayloadAction<TradeData>) => {
      state.push(action.payload);
    },
  },
});
export const { addtradeData } = tradeData.actions;
export default tradeData.reducer;
