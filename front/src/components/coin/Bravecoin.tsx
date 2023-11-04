"use client";
import React, { useState } from "react";
import { useAppSelector } from "@/store/store";
import bravecoin from "@/asset/data/bravecoin.json";
export default function Bravecoin() {
  const data = bravecoin;
  const list = useAppSelector((state) => state.marketItemsreducer);
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
      <div style={{ maxHeight: "800px", overflowY: "auto" }}>
        <table>
          <thead>
            <tr>
              <th>이름</th>
              <th className="hidden md:table-cell">개수</th>
              <th className="hidden md:table-cell">골드가치</th>
              <th className="hidden md:table-cell">주화개수</th>
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
                <td className="hidden md:table-cell">{item.Quntaty}</td>
                <td className="hidden md:table-cell">
                  {item.Price.toFixed(0)}
                </td>
                <td className="hidden md:table-cell">{item.Coin}</td>
                <td>{item.Rate.toFixed(4)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      *주의
      <br />
      골드/주화는 주화 1개당 골드 가치
      <br />
      제작자는 PVP 초극
      <br />
      보조재 쓸일없으면 안사는게 낫다
    </div>
  );
}
