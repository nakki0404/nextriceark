//./components/UpStore.js
"use client";
import React, { useEffect } from "react";
import fetchData from "./ReqServer";
import loadServer from "./LoadServer";
import loadTradingData from "./loadTrading_data";
import { addmarketitems } from "@/store/slices/marketitems";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";

export default function UpStore() {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    fetchData()
      .then((marketListData) => {
        dispatch(addmarketitems(marketListData));
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    // loadServer()
    //   .then((response) => {
    //     response.map((item) => addList(item));
    //   })
    //   .catch((error) => {
    //     console.error("Error:", error);
    //   });
    // loadTradingData()
    //   .then((response) => {
    //     response.map((item) => addTrade_data(item));
    //   })
    //   .catch((error) => {
    //     console.error("Error:", error);
    //   });
  }, []);
  return <div></div>;
}
