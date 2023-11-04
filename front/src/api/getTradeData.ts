//./components/loadTrading_data.js
import type { TradeData } from "@/types/TradeData";
function getTradeData(): Promise<TradeData[]> {
  return fetch(process.env.NEXT_PUBLIC_REACT_APP_BACKEND_URL + "/trade")
    .then((response: Response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json() as Promise<TradeData[]>;
    })
    .catch((error: Error) => {
      throw error;
    });
}

export default getTradeData;
