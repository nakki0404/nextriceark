import { useEffect, useState } from "react";
import { useRoomListQuery } from "@/hooks/api/useRoomListQuery";
export const useRoomList = (socketid: any) => {
  const { roomList } = useRoomListQuery(socketid);
  // const [today, setToday] = useState(0);
  // useEffect(() => {
  //   if (data) {
  //     setTotal(SocketID.Total);
  //   }
  // }, [data]);

  return { roomList };
};
