"use client";
import React, { useState, useEffect } from "react";
import { useAppSelector } from "@/store/store";
import Select from "react-select";
export default function ListTable() {
  const list = useAppSelector((state) => state.tradeDatareducer);
  const lists = useAppSelector((state) => state.marketItemsreducer);

  let exArray = list.map((e: any) => ({
    Name: e.Name,
    Today: e.Stats[0],
    Yes: e.Stats[1],
  }));

  let newArray = exArray.map((e: any) => {
    const Name: string = e.Name;
    const TodayAvgPrice: number = e.Today ? e.Today.AvgPrice : 1;
    const YesAvgPrice: number = e.Yes ? e.Yes.AvgPrice : 1;
    const Change: number = TodayAvgPrice / YesAvgPrice - 1;
    return {
      Name: Name,
      Price: TodayAvgPrice,
      Change: Change,
    };
  });

  // const removeDuplicates = (arr: any[]) => {
  //   const seen = new Set();
  //   return arr.filter((item) => {
  //     const objectString = JSON.stringify(item);
  //     if (!seen.has(objectString)) {
  //       seen.add(objectString);
  //       return true;
  //     }
  //     return false;
  //   });
  // };

  const uniqueArray = newArray;
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
  const categorylist = [
    {
      label: "재련",
      value: "재련",
    },
    {
      label: "생활",
      value: "생활",
    },
    {
      label: "모험",
      value: "모험",
    },
    {
      label: "음식",
      value: "음식",
    },
    {
      label: "각인",
      value: "각인",
    },
    {
      label: "베템",
      value: "베템",
    },
  ];
  const [selectedOption2, setSelectedOption2] = useState<any>(undefined);

  useEffect(() => {
    if (selectedOption2) {
      const newData2 = selectedOption2.value;
      newData2;
    }
  }, [selectedOption2]);
  const handleChange2 = (selected: any = {}) => {
    setSelectedOption2(selected);
  };
  return (
    <div>
      <Select
        options={Array.isArray(categorylist) ? categorylist : []}
        value={selectedOption2}
        onChange={handleChange2}
        isSearchable={true} // 검색 가능한 드롭다운으로 설정
        placeholder="분류"
      />
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
