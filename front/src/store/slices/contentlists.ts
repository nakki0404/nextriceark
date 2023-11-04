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
    delcontentlists: (state, action: PayloadAction<{ _id: string }>) => {
      // 특정 _id와 일치하는 항목 제거
      return state.filter((item) => item._id !== action.payload._id);
    },
    updateContentByKey: (
      state,
      action: PayloadAction<{
        _id: string;
        Title: string;
        Category: any;
        List: any;
        ID?: any;
      }>
    ) => {
      const { Category, List, Title } = action.payload;
      const index = state.findIndex((item) => item.Title === Title);

      if (index !== -1) {
        // If the key is found, update its value 나와 같다면~
        state[index].List = [...List];
        state[index].Category = Category;
      }
    },
  },
});
export const { addcontentlists, updateContentByKey, delcontentlists } =
  contentlists.actions;
export default contentlists.reducer;
