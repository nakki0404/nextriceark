"use client";

//Valuelistviewer.js
import React, { useState, useEffect } from "react";
import Select from "react-select";
import { useAppSelector } from "@/store/store";
//타이블에서 아이디 기반으로 변경
//드롭다운 목록은 스토어 스테이트 기반
//일단 중복이름 막는쪽으로
export default function Valuelistviewer() {
  const contentvalues = useAppSelector((state) => state.contentvaluesreducer);
  // const marketitems = useAppSelector((state) => state.marketitemsreducer);
  const [selectedTitle, setSelectedTitle] = useState(null);
  const [selectedListItem, setSelectedListItem] = useState(null);
  const [localStorageKey2] = useState("tableDataKey2"); // 로컬 저장소 키
  useEffect(() => {
    // 로컬 저장소에서 데이터 불러오기
    const savedData = localStorage.getItem(localStorageKey2);
    if (savedData) {
      setSelectedListItem(JSON.parse(savedData));
    }
  }, [localStorageKey2]);
  //의존성에 키넣는거 명쾌하게 해결안됨

  // const totalprice = selectedListItem&&selectedListItem.List.reduce(
  //   (total, item) => total + item.YDayAvgPrice * item.Quantity / item.BundleCount,
  //   0
  // ).toFixed(0);
  //selectedListItem.List 으로 items 참조
  useEffect(() => {
    if (selectedTitle !== null) {
      //setSelectedListItem(/(lists.lists.find(item => item.Title === selectedTitle)));

      setSelectedListItem(() => {
        localStorage.setItem(
          localStorageKey2,
          JSON.stringify(
            contentvalues.find((item) => item.Title === selectedTitle)
          )
        );
        return contentvalues.find((item) => item.Title === selectedTitle);
      });
    }
  }, [selectedTitle]);

  const [data, setData] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const list = contentvalues.map((e) => ({ label: e.Title, value: e.Title }));
  const handleChange = (selected) => {
    setSelectedOption(selected);
  };
  useEffect(() => {
    if (selectedOption) {
      const newData = selectedOption.value;
      setData(newData);
      handleDropdownSelect(newData, () => {
        setData(""); // 또는 필요한 다른 작업 수행
      });
    }
  }, [selectedOption]);

  const handleDropdownSelect = (title) => {
    if (title !== selectedTitle) {
      setSelectedTitle(title);
    }
  };

  return (
    <div>
      <div className="text-xl m-1">컨텐츠, 상자를 상세보기</div>

      <div className="w-5/6 m-1">
        <Select
          options={list}
          value={selectedOption}
          onChange={handleChange}
          isSearchable={true} // 검색 가능한 드롭다운으로 설정
          placeholder="컨텐츠, 상자를 선택하세요"
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
                  <img
                    title={listItem.Name}
                    src={listItem.Icon} // 이미지 파일의 URL을 여기에 입력
                  />
                </td>
                <td className="text-right">{listItem.Quantity}</td>
                <td className="text-right">{listItem.Quantity2}</td>
              </tr>
            ))}
          <tr>
            <td></td>
            <td className="text-right">
              {`부분합계 ${
                selectedListItem && selectedListItem.totalprice.toFixed(0)
              } G`}
            </td>
            <td className="text-right">
              {`부분합계 ${
                selectedListItem && selectedListItem.totalprice2.toFixed(0)
              } G`}
            </td>
          </tr>
          <tr>
            <td></td>
            <td></td>

            <td className="text-right">
              {`전체 합 ${
                selectedListItem && selectedListItem.totalprice3.toFixed(0)
              } G`}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
