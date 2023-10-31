import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { marketAllItems } from "@/types/marketAllItems";
const initialState: marketAllItems[] = [];
export const marketallitems = createSlice({
  name: "marketitems",
  initialState,
  reducers: {
    addmarketallitems: (state, action: PayloadAction<marketAllItems>) => {
      state.push(action.payload);
    },
  },
});
export const { addmarketallitems } = marketallitems.actions;
export default marketallitems.reducer;
