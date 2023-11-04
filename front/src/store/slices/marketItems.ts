import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { MarketItems } from "@/types/MarketItems";
const initialState: MarketItems[] = [];
export const marketItems = createSlice({
  name: "marketItems",
  initialState,
  reducers: {
    addmarketItems: (state, action: PayloadAction<MarketItems>) => {
      state.push(action.payload);
    },
  },
});
export const { addmarketItems } = marketItems.actions;
export default marketItems.reducer;
