"use client";

import React, { useState, useEffect, ChangeEvent } from "react";
import Select from "react-select";
import { useAppSelector } from "@/store/store";
import type { Item } from "@/types/ContentLists";
import type { ContentLists } from "@/types/ContentLists";
export default function Info() {
  const marketallitems = useAppSelector((state) => state.marketItemsreducer);
  const contentvalues = useAppSelector((state) => state.contentvaluesreducer);
  const [selectedTitle, setSelectedTitle] = useState<string | null>(null);
  const [selectedListItem, setSelectedListItem] = useState<ContentLists | null>(
    null
  );
  const [localStorageKey2] = useState<string>("tableDataKey2"); // 로컬 저장소 키

  useEffect(() => {
    const savedData = localStorage.getItem(localStorageKey2);
    if (savedData) {
      setSelectedListItem(JSON.parse(savedData));
    }
  }, [localStorageKey2]);

  useEffect(() => {
    if (selectedTitle !== null) {
      const selectedItem = contentvalues.find(
        (item) => item.Title === selectedTitle
      );
      if (selectedItem) {
        localStorage.setItem(localStorageKey2, JSON.stringify(selectedItem));
        setSelectedListItem(selectedItem);
        let totalprice = selectedItem.List.reduce(
          (a, i) => a + (i.Quantity * i.YDayAvgPrice) / i.BundleCount,
          0
        );
        let totalprice2 = selectedItem.List.reduce(
          (a, i) => a + (i.Quantity * i.YDayAvgPrice) / i.BundleCount,
          0
        );
        let totalprice3 = totalprice + totalprice2;
      }
    }
  }, [selectedTitle, contentvalues, localStorageKey2]);

  const [data, setData] = useState<string>("");
  const [selectedOption, setSelectedOption] = useState<any>(null);
  const list = contentvalues.map((e) => ({ label: e.Title, value: e.Title }));

  const handleChange = (selected: any) => {
    setSelectedOption(selected);
  };

  useEffect(() => {
    if (selectedOption) {
      const newData = selectedOption.value;
      setData(newData);
      handleDropdownSelect(newData);
    }
  }, [selectedOption]);

  const handleDropdownSelect = (title: string) => {
    if (title !== selectedTitle) {
      setSelectedTitle(title);
    }
  };

  // ...newlist
  // .find((e) => e.ItemList.find((i) => i.Name === data))
  // ?.ItemList.find((i) => i.Name === data)
  const totalprice = selectedListItem
    ? selectedListItem.List.reduce(
        (a, i) => a + (i.Quantity * i.YDayAvgPrice) / i.BundleCount,
        0
      )
    : 0;
  const totalprice2 = selectedListItem
    ? selectedListItem.List.reduce(
        (a, i) => a + (i.Quantity2 * i.YDayAvgPrice) / i.BundleCount,
        0
      )
    : 0;
  const totalprice3 = totalprice + totalprice2;
  return (
    <div>
      <div className="w-5/6 m-1">
        <Select
          options={list}
          value={selectedOption}
          onChange={handleChange}
          isSearchable={true}
          placeholder="컨텐츠 이름을 선택하세요"
        />
      </div>
      <table>
        <thead>
          <tr>
            <th>그림</th>
            <th>개수(교환가능,기본 보상)</th>
            <th>개수(귀속, 더보기 보상)</th>
          </tr>
        </thead>
        <tbody>
          {selectedListItem &&
            selectedListItem.List.map((listItem, index) => (
              <tr key={index}>
                <td>
                  <img title={listItem.Name} src={listItem.Icon} />
                </td>
                <td className="text-right">{listItem.Quantity}</td>
                <td className="text-right">{listItem.Quantity2}</td>
              </tr>
            ))}
          <tr>
            <td></td>
            <td className="text-right">{`부분합계 ${
              totalprice.toFixed(0) || 0
            } G`}</td>
            <td className="text-right">{`부분합계 ${
              totalprice2.toFixed(0) || 0
            } G`}</td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td className="text-right">{`전체 합 ${
              totalprice3.toFixed(0) || 0
            } G`}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
