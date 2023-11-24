import { useQuery } from "@tanstack/react-query";
import { getTradeData } from "@/api/getTradeData2";
export const useTradeDataQuery = () => {
  const { data } = useQuery({
    queryKey: ["visitorCount"],
    queryFn: getTradeData,
  });
  return { visitData: data };
};
