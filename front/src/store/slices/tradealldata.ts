import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { TradeAllData } from "@/types/TradeAllData";
const initialState: TradeAllData[] = [];
export const tradealldata = createSlice({
  name: "tradedata",
  initialState,
  reducers: {
    addtradealldata: (state, action: PayloadAction<TradeAllData>) => {
      state.push(action.payload);
    },
  },
});
export const { addtradealldata } = tradealldata.actions;
export default tradealldata.reducer;
