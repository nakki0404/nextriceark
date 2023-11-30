import { useEffect, useState } from "react";
import { useVisitorCountQuery } from "@/hooks/api/useVisitorCountQuery";
export const useVisitorCount = () => {
  const { visitData } = useVisitorCountQuery();
  const [total, setTotal] = useState(0);
  const [today, setToday] = useState(0);
  useEffect(() => {
    if (visitData) {
      setToday(visitData.Today);
      setTotal(visitData.Total);
    }
  }, [visitData]);

  return { total, today };
};
