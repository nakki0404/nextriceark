//./components/reqServer.js
import { MarketItems } from "@/types/MarketItems";
function getMarketItems(): Promise<MarketItems[]> {
  return fetch(process.env.REACT_APP_BACKEND_URL + "/data")
    .then((response: Response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json() as Promise<MarketItems[]>;
    })
    .catch((error: Error) => {
      throw error;
    });
}

export default getMarketItems;
