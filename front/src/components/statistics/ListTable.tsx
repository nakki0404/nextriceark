"use client";
import React, { useState, useEffect } from "react";
import { useAppSelector } from "@/store/store";
import Select from "react-select";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
export default function ListTable() {
  const router = useRouter();

  const [selectedOption2, setSelectedOption2] = useState<any>("재련");
  const list = useAppSelector((state) => state.tradeDatareducer);
  const lists = useAppSelector((state) => state.marketItemsreducer);

  const list2 = list.filter((i) => i.Category === selectedOption2);
  const list3 = list2.filter(
    (i) => i.Stats[0].TradeCount != 0 && i.Stats[1].TradeCount != 0
  );
  let exArray = list3.map((e: any) => ({
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

  const [sortOrder, setSortOrder] = useState<string>("pricedesc");

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
  } else if (sortOrder === "priceasc") {
    sortedArray.sort((a, b) => a.Price - b.Price);
  } else if (sortOrder === "pricedesc") {
    sortedArray.sort((a, b) => b.Price - a.Price);
  }

  const toggleSortOrder = () => {
    if (sortOrder === "asc") {
      setSortOrder("desc");
    } else if (sortOrder === "desc") {
      setSortOrder("asc");
    } else if (sortOrder === "priceasc") {
      setSortOrder("pricedesc");
    } else if (sortOrder === "pricedesc") {
      setSortOrder("priceasc");
    }
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
      label: "배템",
      value: "배템",
    },
  ];

  const handleChange2 = (selected: any = {}) => {
    setSelectedOption2(selected.value);
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

              <th
                className={
                  sortOrder === "pricedesc" || sortOrder === "priceasc"
                    ? "bg-yellow-100"
                    : ""
                }
              >
                <span
                  onClick={() => {
                    if (sortOrder === "priceasc") {
                      toggleSortOrder();
                    } else {
                      setSortOrder("priceasc");
                    }
                  }}
                  style={{ cursor: "pointer" }}
                >
                  TodayPrice
                  {sortOrder === "priceasc" ? "▲" : "▼"}
                </span>
              </th>
              <th
                className={
                  sortOrder === "desc" || sortOrder === "asc"
                    ? "bg-yellow-100"
                    : ""
                }
              >
                <span
                  onClick={() => {
                    if (sortOrder === "asc") {
                      toggleSortOrder();
                    } else {
                      setSortOrder("asc");
                    }
                  }}
                  style={{ cursor: "pointer" }}
                >
                  Change
                  {sortOrder === "asc" ? "▲" : "▼"}{" "}
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
                <button
                  type="button"
                  onClick={() =>
                    router.push(`/Statistics/Search?search=${item.Name}`)
                  }
                >
                  <td>{item.Name}</td>
                </button>

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
