//./components/UpStore.js
"use client";
import React, { useEffect } from "react";

import getMarketItems from "@/api/getMarketItems";
import getContentLists from "@/api/getContentLists";
import getTradeData from "@/api/getTradeData";

import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";

import { addmarketItems } from "@/store/slices/marketItems";
import { addtradeData } from "@/store/slices/tradeData";
import { addcontentlists } from "@/store/slices/contentlists";

import type { ContentLists } from "@/types/ContentLists";
import type { MarketItems } from "@/types/MarketItems";
import type { TradeData } from "@/types/TradeData";

export default function UpStore() {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    getMarketItems()
      .then((response: MarketItems[]) => {
        response.map((item: MarketItems) => dispatch(addmarketItems(item)));
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
      .then((response: TradeData[]) => {
        response.map((item: TradeData) => dispatch(addtradeData(item)));
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);
  return <div></div>;
}
