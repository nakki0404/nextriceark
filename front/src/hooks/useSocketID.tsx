import { useEffect, useState } from "react";
import { useSocketIDQuery } from "@/hooks/api/useSocketIDQuery";
export const useSocketID = () => {
  const { socketIDList } = useSocketIDQuery();
  // const [today, setToday] = useState(0);
  // useEffect(() => {
  //   if (data) {
  //     setTotal(SocketID.Total);
  //   }
  // }, [data]);

  return { socketIDList };
};
