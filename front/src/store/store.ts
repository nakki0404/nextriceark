import { configureStore } from "@reduxjs/toolkit";
import itemreducer from "./slices/marketitems";
import listreducer from "./slices/contentvalues";
import loginreducer from "./slices/login-slice";
import { useSelector, useDispatch, TypedUseSelectorHook } from "react-redux";

export const store = configureStore({
  reducer: {
    itemreducer,
    listreducer,
    loginreducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();
