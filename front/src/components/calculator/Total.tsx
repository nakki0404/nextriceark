"use client";
import React, { useState } from "react";
import { useAppSelector } from "@/store/store";

export default function Total() {
  const contentvalues = useAppSelector(
    (state: any) => state.contentvaluesreducer
  ); // 이 부분은 해당 상태의 유형을 명시적으로 지정해야합니다.

  const [sortType, setSortType] = useState<string | null>(null);
  const [sortDescending, setSortDescending] = useState<boolean>(true);

  const handleSortChange = (newSortType: string) => {
    if (newSortType === sortType) {
      setSortDescending(!sortDescending);
    } else {
      setSortType(newSortType);
      setSortDescending(true);
    }
  };

  let sortedList = [...contentvalues];

  if (sortType === "Value") {
    sortedList = sortedList.sort((a, b) => {
      const aValue = a.totalprice3;
      const bValue = b.totalprice3;
      return sortDescending ? bValue - aValue : aValue - bValue;
    });
  }

  return (
    <div>
      <div className="flex flex-row">
        <div className="text-xl m-1"> 전체보기</div>
      </div>
      <table>
        <thead>
          <tr>
            <th>이름</th>
            <th>부분합(교환가능,기본)</th>
            <th>부분합(귀속, 더보기)</th>
            <th>
              총합
              <span
                onClick={() => handleSortChange("Value")}
                style={{ cursor: "pointer" }}
              >
                {sortType === "Value" && sortDescending ? "▼" : "▲"}
              </span>
            </th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {sortedList.map((item: any, index: number) => (
            <tr key={index}>
              <td>{item.Title}</td>
              <td className="text-right">
                {item.totalprice.toFixed(0).toLocaleString()} G
              </td>
              <td className="text-right">
                {item.totalprice2.toFixed(0).toLocaleString()} G
              </td>
              <td className="text-right">
                {item.totalprice3.toFixed(0).toLocaleString()} G
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
