"use client";
import React, { useEffect, useState } from "react";
export default function Footer() {
  const [total, setTotal] = useState(0);
  const [today, setToday] = useState(0);
  const createCookie = () => {
    if (document.cookie.includes("user")) {
    } else {
      fetch(process.env.REACT_APP_BACKEND_URL + "/total")
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          const cookieName = `user`;
          const cookieValue = data;
          const expirationDate = new Date();
          expirationDate.setDate(expirationDate.getDate() + 1);
          // 쿠키 생성
          document.cookie = `${cookieName}=${cookieValue}; expires=${expirationDate.toUTCString()}; path=/;`;
          const config = {
            headers: {
              coo: document.cookie,
            },
          };
          fetch(process.env.REACT_APP_BACKEND_URL + "/count", {
            method: "POST",
            headers: config.headers,
            body: null,
          });
        });
    }
  };

  useEffect(() => {
    createCookie();
  }, []);

  useEffect(() => {
    // API 호출을 useEffect 내부로 이동
    fetch(process.env.REACT_APP_BACKEND_URL + "/total")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => setTotal(data))
      .catch((error) => console.error("Error fetching total data:", error));

    fetch(process.env.REACT_APP_BACKEND_URL + "/howmany")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => setToday(data[0].todayTotal))
      .catch((error) => console.error("Error fetching today data:", error));
  }, []); // 빈 배열을 전달하여 컴포넌트가 처음 렌더링될 때만 실행

  return (
    <div className="bg-yellow-50 flex flex-row justify-between">
      <div className="text-xl">전체{total}</div>
      <div className="text-xl">매일 오전 1시 업데이트</div>
      <div className="text-xl">오늘{today}</div>
    </div>
  );
}
