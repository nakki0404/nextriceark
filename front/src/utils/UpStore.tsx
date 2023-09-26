//./components/UpStore.js
"use client";
import React, { useEffect } from "react";
import getMarketItems from "../api/getMarketItems";
import getContentValues from "../api/getContentValues";
import getTradeData from "../api/getTradeData";
import { addmarketitems } from "@/store/slices/marketitems";
import { addtradedata } from "@/store/slices/tradedata";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { addcontentvalues } from "@/store/slices/contentvalues";

export default function UpStore() {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    getMarketItems()
      .then((response) => {
        dispatch(addmarketitems(response));
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    getContentValues()
      .then((response) => {
        response.map((item) => dispatch(addcontentvalues(item)));
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    getTradeData()
      .then((response) => {
        response.map((item) => dispatch(addtradedata(item)));
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);
  return <div></div>;
}
