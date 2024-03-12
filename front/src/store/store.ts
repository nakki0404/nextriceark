import { configureStore } from "@reduxjs/toolkit";
import { useSelector, useDispatch, TypedUseSelectorHook } from "react-redux";

import marketItemsreducer from "@/store/slices/marketItems";
import contentlistsreducer from "@/store/slices/contentlists";
import loginstatereducer from "@/store/slices/loginstate";
import tradeDatareducer from "@/store/slices/tradeData";
import textListreducer from "@/store/slices/textlist";
import socketStatereducer from "@/store/slices/socketState";

export const store = configureStore({
  reducer: {
    marketItemsreducer,
    contentlistsreducer,
    loginstatereducer,
    tradeDatareducer,
    textListreducer,
    socketStatereducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();
