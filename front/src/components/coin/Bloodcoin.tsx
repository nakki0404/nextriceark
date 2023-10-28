"use client";
import React, { useState } from "react";
import { useAppSelector } from "@/store/store";
import bloodcoin from "@/asset/data/bloodcoin.json";
import cube from "@/asset/data/cube.json";
export default function Bloodcoin() {
  const list = useAppSelector((state) => state.marketitemsreducer);
  let subboxprice = 0;
  const matchingItem3 = list.find((item) => item.Name === "태양의 축복");
  const matchingItem4 = list.find((item) => item.Name === "태양의 가호");
  const matchingItem5 = list.find((item) => item.Name === "태양의 은총");
  if (matchingItem3 && matchingItem4 && matchingItem5) {
    subboxprice +=
      0.247 * matchingItem3.YDayAvgPrice +
      0.03 * matchingItem4.YDayAvgPrice +
      0.723 * matchingItem5.YDayAvgPrice;
  }
  const subbox = [
    {
      Name: "태양의 보조재 상자",
      YDayAvgPrice: subboxprice,
      _id: "a",
      Id: 0,
      Grade: "a",
      Icon: "a",
      BundleCount: 1,
      TradeRemainCount: 0,
      RecentPrice: 0,
      CurrentMinPrice: 0,
      __v: 0,
    },
  ];

  const cubedata = cube;
  let fixedcubedata = cubedata.map((e) => {
    let Price = 0;
    for (let i = 0; i < e.목록.length; i++) {
      const matchingItem2 = list.find((item) => item.Name === e.목록[i].이름);
      if (matchingItem2) {
        Price +=
          (e.목록[i].개수 * matchingItem2.YDayAvgPrice) /
          matchingItem2.BundleCount;
      }
    }
    return {
      Name: e.상자,
      YDayAvgPrice: Price * 0.2,
      _id: "a",
      Id: 0,
      Grade: "a",
      Icon: "a",
      BundleCount: 1,
      TradeRemainCount: 0,
      RecentPrice: 0,
      CurrentMinPrice: 0,
      __v: 0,
    };
  });

  const newlist = [...list, ...fixedcubedata, ...subbox];

  const data = bloodcoin.filter(
    (item) => !item.이름.includes("점령전 실링 상자")
  );
  let newarray = data.map((e) => {
    const Name = e.이름;
    const Quntaty = e.개수;
    const Coin = e["실마엘 혈석"];
    const matchingItem = newlist.find(
      (item) => item.Name === e.이름.replace(/\d/g, "")
    );
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
      <h1>실마엘 혈석</h1>
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
    </div>
  );
}
