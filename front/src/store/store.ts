import { configureStore } from "@reduxjs/toolkit";
import { useSelector, useDispatch, TypedUseSelectorHook } from "react-redux";

import marketItemsreducer from "./slices/marketItems";
import contentListsreducer from "./slices/contentLists";
import loginStatereducer from "./slices/loginState";
import tradeDatareducer from "./slices/tradeData";

export const store = configureStore({
  reducer: {
    marketItemsreducer,
    contentListsreducer,
    loginStatereducer,
    tradeDatareducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();
