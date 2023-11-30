import { useQuery } from "@tanstack/react-query";
import { getVisitorCountCookie } from "@/api/getVisitorCountCookie";
export const useVisitorCountQuery = () => {
  const { data } = useQuery({
    queryKey: ["visitorCount"],
    queryFn: getVisitorCountCookie,
    gcTime: 24 * 60 * 60 * 1000,
  });

  return { visitData: data };
};
