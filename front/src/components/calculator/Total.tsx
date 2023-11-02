"use client";
import React, { useState, useEffect } from "react";
import { useAppSelector } from "@/store/store";
import Select from "react-select";
import Link from "next/link";
export default function Total() {
  let contentvalues = useAppSelector(
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

  let newarray = [];
  for (let i = 0; i < contentvalues.length; i++) {
    let e = contentvalues[i];
    let totalprice = e
      ? e.List.reduce(
          (a: any, i: any) => a + (i.Quantity * i.YDayAvgPrice) / i.BundleCount,
          0
        )
      : 0;
    let totalprice2 = e
      ? e.List.reduce(
          (a: any, i: any) =>
            a + (i.Quantity2 * i.YDayAvgPrice) / i.BundleCount,
          0
        )
      : 0;
    let obj = {
      Title: e.Title,
      totalprice: totalprice,
      totalprice2: totalprice2,
      totalprice3: totalprice + totalprice2,
      Category: e.Category,
    };
    newarray.push(obj);
  }
  let sortedList = [...newarray];

  if (sortType === "Value") {
    sortedList = sortedList.sort((a, b) => {
      const aValue = a.totalprice3;
      const bValue = b.totalprice3;
      return sortDescending ? bValue - aValue : aValue - bValue;
    });
  }
  const handleChange2 = (selected: any = {}) => {
    setSelectedOption2(selected);
  };
  const [category, setCategory] = useState("");
  const categorylist = [
    {
      label: "레이드 보상",
      value: "레이드 보상",
    },
    {
      label: "상자",
      value: "상자",
    },
    {
      label: "전체",
      value: "",
    },
  ];
  type selectedOption =
    | {
        label: string;
        value: string;
      }
    | undefined;
  const [selectedOption2, setSelectedOption2] =
    useState<selectedOption>(undefined);

  useEffect(() => {
    if (selectedOption2) {
      const newData2 = selectedOption2.value;
      setCategory(newData2);
    }
  }, [selectedOption2]);

  return (
    <div>
      <div className="flex flex-row"></div>
      <table>
        <thead>
          <tr>
            <th>
              <Select
                options={Array.isArray(categorylist) ? categorylist : []}
                value={selectedOption2}
                onChange={handleChange2}
                isSearchable={true} // 검색 가능한 드롭다운으로 설정
                placeholder="분류"
              />
            </th>

            <th>{category === "레이드" ? "기본보상" : "교환가능"}</th>
            <th>{category === "레이드" ? "기본보상" : "교환가능"}</th>
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
          {sortedList
            .filter((i) => i.Category.includes(category))
            .map((item: any, index: number) => (
              <tr key={index}>
                <td>{item.Title} </td>
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
