import { useQuery } from "@tanstack/react-query";
import { getRoomList } from "@/api/getRoomList";
// import { useSocket } from "@/components/socket-provider";
// const { socket, isConnected } = useSocket();

export const useRoomListQuery = (socketid: any) => {
  const { data } = useQuery({
    queryKey: ["RoomList"],
    queryFn: () => getRoomList(socketid),
    refetchInterval: 5000,
    // enabled: !!socket.id,
  });

  return { roomList: data };
};
