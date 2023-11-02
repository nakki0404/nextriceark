import { configureStore } from "@reduxjs/toolkit";
import { useSelector, useDispatch, TypedUseSelectorHook } from "react-redux";

import marketItemsreducer from "./slices/marketItems";
import contentvaluesreducer from "./slices/contentLists";
import loginreducer from "./slices/isLogin";
import tradedatareducer from "./slices/tradeData";

export const store = configureStore({
  reducer: {
    marketItemsreducer,
    contentvaluesreducer,
    loginreducer,
    tradedatareducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();
