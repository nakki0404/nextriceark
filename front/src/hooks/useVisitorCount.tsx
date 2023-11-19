"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export const useVisitorCount = () => {
  const [total, setTotal] = useState(0);
  const [today, setToday] = useState(0);

  const fetchData = async () => {
    try {
      if (document.cookie.includes("Visitor")) {
        const savedData: any = localStorage.getItem("lastVisitDate");
        if (savedData) {
          let lastVisitDateData = JSON.parse(savedData);
          setToday(lastVisitDateData.Today);
          setTotal(lastVisitDateData.Total);
        }
      } else {
        const response = await axios.get(
          process.env.NEXT_PUBLIC_REACT_APP_BACKEND_URL + "/VisitorCount",
          { withCredentials: true }
        );
        localStorage.setItem("lastVisitDate", JSON.stringify(response.data));
        setToday(response.data.Today);
        setTotal(response.data.Total);
      }
    } catch (error: any) {
      console.error("오류 발생:", error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { total, today };
};
