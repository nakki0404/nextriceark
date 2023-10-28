//@\store\slices\ContentLists.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { ContentLists } from "@/types/ContentLists";
const initialState: ContentLists[] = [];
export const contentlists = createSlice({
  name: "contentlists",
  initialState,
  reducers: {
    addcontentlists: (state, action: PayloadAction<ContentLists>) => {
      state.push(action.payload);
    },
  },
});
export const { addcontentlists } = contentlists.actions;
export default contentlists.reducer;
