import { configureStore } from "@reduxjs/toolkit";
import { useSelector, useDispatch, TypedUseSelectorHook } from "react-redux";

import marketItemsreducer from "./slices/marketItems";
import contentlistsreducer from "./slices/contentlists";
import loginstatereducer from "./slices/loginstate";
import tradeDatareducer from "./slices/tradeData";

export const store = configureStore({
  reducer: {
    marketItemsreducer,
    contentlistsreducer,
    loginstatereducer,
    tradeDatareducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();
