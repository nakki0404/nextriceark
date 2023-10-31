//./components/UpStore.js
"use client";
import React, { useEffect } from "react";

import getMarketItems from "@/api/getMarketItems";
import getContentLists from "@/api/getContentLists";
import getTradeData from "@/api/getTradeData";

import { addmarketallitems } from "@/store/slices/marketallitems";
import { addtradealldata } from "@/store/slices/tradealldata";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { addcontentlists } from "@/store/slices/ContentLists";

import type { ContentLists } from "@/types/ContentLists";
import type { marketAllItems } from "@/types/marketAllItems";
import type { TradeAllData } from "@/types/TradeAllData";

export default function UpStore() {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    getMarketItems()
      .then((response: marketAllItems[]) => {
        response.map((item: marketAllItems) =>
          dispatch(addmarketallitems(item))
        );
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    getContentLists()
      .then((response: ContentLists[]) => {
        response.map((item: ContentLists) => dispatch(addcontentlists(item)));
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    getTradeData()
      .then((response: TradeAllData[]) => {
        response.map((item: TradeAllData) => dispatch(addtradealldata(item)));
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);
  return <div></div>;
}
