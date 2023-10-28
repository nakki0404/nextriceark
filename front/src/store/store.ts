import { configureStore } from "@reduxjs/toolkit";
import marketitemsreducer from "./slices/marketitems";
import contentvaluesreducer from "./slices/ContentLists";
import loginreducer from "./slices/isLogin";
import tradedatareducer from "./slices/tradedata";
import { useSelector, useDispatch, TypedUseSelectorHook } from "react-redux";

export const store = configureStore({
  reducer: {
    marketitemsreducer,
    contentvaluesreducer,
    loginreducer,
    tradedatareducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();
