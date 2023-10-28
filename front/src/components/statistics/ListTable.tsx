"use client";
import React, { useState } from "react";
import { useAppSelector } from "@/store/store";

export default function ListTable() {
  const list = useAppSelector((state) => state.tradedatareducer);
  const lists = useAppSelector((state) => state.marketitemsreducer);
  console.log(lists);
  let exArray = list.map((e: any) => ({
    Name: e.Name,
    Today: e.Stats[0],
    Yes: e.Stats[1],
  }));

  let newArray = exArray.map((e: any) => {
    const Name: string = e.Name;
    const TodayAvgPrice: number = e.Today ? e.Today.AvgPrice : 0;
    const YesAvgPrice: number = e.Yes ? e.Yes.AvgPrice : 0;
    const Change: number = TodayAvgPrice / YesAvgPrice - 1;
    return {
      Name: Name,
      Price: TodayAvgPrice,
      Change: Change,
    };
  });

  const removeDuplicates = (arr: any[]) => {
    const seen = new Set();
    return arr.filter((item) => {
      const objectString = JSON.stringify(item);
      if (!seen.has(objectString)) {
        seen.add(objectString);
        return true;
      }
      return false;
    });
  };

  const uniqueArray = removeDuplicates(newArray);
  const filteredArray = uniqueArray.filter((item) => !isNaN(item.Change));
  const [sortOrder, setSortOrder] = useState<string>("desc");
  const sortedArray = newArray.map((e: any) => {
    const matchingItem = lists.find((i: any) => i.Name === e.Name);
    return {
      Name: e.Name,
      Price: e.Price,
      Change: e.Change,
      Icon: matchingItem ? matchingItem.Icon : "기본아이콘",
    };
  });

  if (sortOrder === "asc") {
    sortedArray.sort((a, b) => a.Change - b.Change);
  } else if (sortOrder === "desc") {
    sortedArray.sort((a, b) => b.Change - a.Change);
  }

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  return (
    <div>
      <h1>전날 비교 </h1>
      <div style={{ maxHeight: "800px", overflowY: "auto" }}>
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>TodayPrice</th>
              <th>
                Change
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
            {sortedArray.map((item: any, index: number) => (
              <tr key={index}>
                <td>
                  <img src={item.Icon} title={item.Name} />
                </td>
                <td>{item.Name}</td>
                <td>{item.Price.toLocaleString() + " G"}</td>
                <td>{(item.Change * 100).toFixed(2) + " %"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
