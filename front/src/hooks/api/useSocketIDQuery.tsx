//useSocketIDQuery

import { useQuery } from "@tanstack/react-query";
import { getSocketID } from "@/api/getSocketID";
import useSocketStore from "@/store/socketStore";

export const useSocketIDQuery = () => {
  const { socket, isConnected, onBot } = useSocketStore();

  const { data } = useQuery<string[]>({
    queryKey: ["SocketID"],
    queryFn: getSocketID,
    refetchInterval: 5000,
    enabled: !!socket,
  });

  return data ? data : [];
};
