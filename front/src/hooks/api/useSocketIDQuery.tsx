import { useQuery } from "@tanstack/react-query";
import { getSocketID } from "@/api/getSocketID";
// import { useSocket } from "@/components/socket-provider";
// const { socket, isConnected } = useSocket();

export const useSocketIDQuery = () => {
  const { data } = useQuery({
    queryKey: ["SocketID"],
    queryFn: getSocketID,
    refetchInterval: 5000,
    // enabled: !!socket.id,
  });

  return { socketIDList: data };
};
