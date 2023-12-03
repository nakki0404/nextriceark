//@\store\slices\ContentLists.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Text } from "@/types/Text";
const initialState: Text[] = [];
export const textList = createSlice({
  name: "textList",
  initialState,
  reducers: {
    setTextList: (state, action: PayloadAction<Text[]>) => {
      action.payload.forEach((elem) => {
        state.push(elem);
      });
    },
    addTextList: (state, action: PayloadAction<Text>) => {
      state.push(action.payload);
    },
    deleteTextListReducer: (state, action: PayloadAction<{ _id: string }>) => {
      return state.filter((item) => item._id !== action.payload._id);
    },
    updateTextList: (state, action: PayloadAction<Text>) => {
      const { Category, TextBody, TextTitle, _id } = action.payload;
      const index = state.findIndex((item) => item._id === _id);
      if (index !== -1) {
        // If the key is found, update its value 나와 같다면~
        state[index].TextTitle = TextTitle;
        state[index].TextBody = TextBody;
        state[index].Category = Category;
      }
    },
  },
});
export const {
  addTextList,
  updateTextList,
  setTextList,
  deleteTextListReducer,
} = textList.actions;
export default textList.reducer;
