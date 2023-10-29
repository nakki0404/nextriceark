"use client";
import React, { useState } from "react";
import { useAppSelector } from "@/store/store";
import bravecoin from "@/asset/data/bravecoin.json";
export default function Bravecoin() {
  const data = bravecoin;
  const list = useAppSelector((state) => state.marketitemsreducer);
  let newarray = data.map((e) => {
    const Name = e.이름;
    const Quntaty = e.개수;
    const Coin = e["용기의 주화"];
    const matchingItem = list.find((item) => item.Name === e.이름);
    let Price = 0;
    if (matchingItem) {
      Price = (e.개수 * matchingItem.YDayAvgPrice) / matchingItem.BundleCount;
    }
    const Rate = Price / Coin;
    return {
      Name: Name,
      Quntaty: Quntaty,
      Coin: Coin,
      Price: Price,
      Rate: Rate,
    };
  });

  const [sortOrder, setSortOrder] = useState<string>("desc");
  if (sortOrder === "asc") {
    newarray.sort((a, b) => a.Rate - b.Rate);
  } else if (sortOrder === "desc") {
    newarray.sort((a, b) => b.Rate - a.Rate);
  }
  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };
  return (
    <div>
      <h1>용기의 주화</h1>
      <div style={{ maxHeight: "800px", overflowY: "auto" }}>
        <table>
          <thead>
            <tr>
              <th>이름</th>
              <th>개수</th>
              <th>골드가치</th>
              <th>주화개수</th>
              <th>
                골드/주화
                <span
                  onClick={() => toggleSortOrder()}
                  style={{ cursor: "pointer" }}
                >
                  {sortOrder === "asc" ? "▲" : "▼"}
                </span>
              </th>
            </tr>
          </thead>
          <tbody>
            {newarray.map((item, index) => (
              <tr key={index}>
                <td>{item.Name}</td>
                <td>{item.Quntaty}</td>
                <td>{item.Price.toFixed(0)}</td>
                <td>{item.Coin}</td>
                <td>{item.Rate.toFixed(4)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      *주의
      <br />
      골드/주화는 주화 1개당 골드 가치를 말한다.
      <br />
      제작자는 PVP 초극이라 더 윗단계의 구매목록은 고려하지 않았다.
    </div>
  );
}
