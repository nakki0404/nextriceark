//./components/loadTrading_data.js
import axios from "axios";

import type { TradeData } from "@/types/TradeData";

export const getTradeData = async (): Promise<TradeData[]> => {
  try {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_REACT_APP_BACKEND_URL}/trade`,
      { withCredentials: true }
    );
    return data;
  } catch (error: any) {
    console.error("오류 발생:", error.message);
    throw error;
  }
};
