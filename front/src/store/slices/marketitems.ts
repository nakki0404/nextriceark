import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { MarketItems } from "@/types/MarketItems";
const initialState: MarketItems[] = [];
export const marketitems = createSlice({
  name: "marketitems",
  initialState,
  reducers: {
    addmarketitems: (state, action: PayloadAction<MarketItems>) => {
      state.push(action.payload);
    },
  },
});
export const { addmarketitems } = marketitems.actions;
export default marketitems.reducer;
