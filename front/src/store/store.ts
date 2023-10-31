import { configureStore } from "@reduxjs/toolkit";
import { useSelector, useDispatch, TypedUseSelectorHook } from "react-redux";

import marketallitemsreducer from "./slices/marketallitems";
import contentvaluesreducer from "./slices/ContentLists";
import loginreducer from "./slices/isLogin";
import tradealldatareducer from "./slices/tradealldata";

export const store = configureStore({
  reducer: {
    marketallitemsreducer,
    contentvaluesreducer,
    loginreducer,
    tradealldatareducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();
