import { useEffect, useState } from "react";
import { useSocketIDQuery } from "@/hooks/api/useSocketIDQuery";
export const useSocketID = () => {
  const data = useSocketIDQuery();

  return data;
};
