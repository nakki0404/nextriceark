//./components/loadTrading_data.js
import type { TradeAllData } from "@/types/TradeAllData";
function getTradeData(): Promise<TradeAllData[]> {
  return fetch(process.env.REACT_APP_BACKEND_URL + "/trade")
    .then((response: Response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json() as Promise<TradeAllData[]>;
    })
    .catch((error: Error) => {
      throw error;
    });
}

export default getTradeData;
