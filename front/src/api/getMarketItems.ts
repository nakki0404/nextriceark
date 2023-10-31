//./components/reqServer.js
import { marketAllItems } from "@/types/marketAllItems";
function getMarketItems(): Promise<marketAllItems[]> {
  return fetch(process.env.REACT_APP_BACKEND_URL + "/data")
    .then((response: Response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json() as Promise<marketAllItems[]>;
    })
    .catch((error: Error) => {
      throw error;
    });
}

export default getMarketItems;
